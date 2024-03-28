"use server";

import OpenAI from "openai";
import prisma from "./utils";
import { revalidatePath } from "next/cache";
import { QueryTourTypes, TourProps} from "@/utils/types";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessage: OpenAI.Chat.ChatCompletionMessageParam[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system" ,
          content: "You are a helpful assistant.",
        },
        ...chatMessage,

      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 200,
    });
    console.log(chatMessage)


    return {

      message: response.choices[0].message,
      tokens: response.usage?.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateTourResponse = async ({
  city,
  country,
}: QueryTourTypes) => {
  if (typeof process.env.NEXT_PUBLIC_PROMPT === "undefined") {
    throw new Error("Prompt is undefined");
  }

  const prompt = process.env.NEXT_PUBLIC_PROMPT.replace(
    /{{city}}/g,
    city,
  ).replace(/{{country}}/g, country);

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide" },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    if (!response.choices[0].message.content) {
      throw new Error("Failed to generate tour response. Please try again.");
    }

    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      throw new Error("Failed to generate tour response. Please try again.");
    }

    return { tour: tourData.tour, tokens: response.usage?.total_tokens };
  } catch (error) {
    return null;
  }
};

export const getExistingTour = async ({
  userId,
  city,
  country,
}: QueryTourTypes) => {

console.log(userId, city, country)
  return prisma.tour.findUnique({
    where: {
      userId_city_country: {
        userId,
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour: TourProps) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (userId: string, searchTerm: string) => {
  const whereClause = {
    userId,
    ...(searchTerm && {
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
    }),
  };

  const allTours = await prisma.tour.findMany({
    where: whereClause,
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

// Image actions
export const generateTourImage = async ({ city, country }: QueryTourTypes) => {
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

// Tokens actions
export const fetchUserTokensbyId = async (
  userId: string,
): Promise<{ tokens: number } | null> => {
  const result = await prisma.token.findUnique({
    where: {
      userId,
    },
  });

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
  revalidatePath("/profile");
  return result.tokens;
};
