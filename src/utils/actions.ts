"use server";

import OpenAI from "openai";
import prisma from "./utils";
import { revalidatePath } from "next/cache";

interface ChatMessage {
  role: "user" | "assistant" | "system" | "function";
  content: string | null;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessage: ChatMessage[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...chatMessage,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 200,
    });
    console.log(response.choices[0].message);
    console.log(response);
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

interface QueryTourProps {
  city: string;
  country: string;
}

export const generateTourResponse = async ({
  city,
  country,
}: QueryTourProps) => {
  if (typeof process.env.NEXT_PUBLIC_PROMPT === "undefined") {
    throw new Error("NEXT_PUBLIC_PROMPT environment variable is undefined.");
  }
  const prompt = process.env.NEXT_PUBLIC_PROMPT.replace(
    /{{city}}/g,
    city,
  ).replace(/{{country}}/g, country);

  console.log("prompt", prompt);
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide" },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    console.log("response", response.choices[0].message.content);

    if (response.choices[0].message.content === null) {
      return null;
    }

    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    console.log("tourDataaaaaaaaa", tourData);
    return {tour: tourData.tour, tokens: response.usage.total_tokens}
    
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }: QueryTourProps) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export interface TourProps {
  city: string;
  country: string;
  title: string;
  description: string;
  stops: string[];
}

export const createNewTour = async (tour: TourProps) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm: string) => {
  if (!searchTerm) {
    const allTours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });
    return allTours;
  }
  const allTours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });
  return allTours;
};

export const getSingleTour = async (id: string) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

export const generateTourImage = async ({ city, country }: QueryTourProps) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `A scenic image of ${city}, ${country}`,
      n: 1,
      size: "512x512",
    });
    return tourImage?.data[0]?.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchUserTokensbyId = async (
  userId: string,
): Promise<{ tokens: number } | null> => {
  const result = await prisma.token.findUnique({
    where: {
      userId,
    },
  });
  console.log("result fetch", result);

  if (!result) {
    return null;
  }

  return { tokens: result.tokens };
};

export const generateUserTokensForId = async (
  userId: string,
): Promise<{ tokens: number }> => {
  const result = await prisma.token.create({
    data: {
      userId,
    },
  });
  console.log("result generate", result);
  return { tokens: result.tokens ?? 0 };
};

export const fetchOrGenerateTokensForUser = async (userId: string) => {
  const result = await fetchUserTokensbyId(userId);
  if (result) {
    return result.tokens;
  } else {
    return await generateUserTokensForId(userId);
  }
};

export const subtractedTokens = async (userId: string, tokens: number) => {
  const result = await prisma.token.update({
    where: {
      userId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath('/profile')
  return result.tokens;
};
