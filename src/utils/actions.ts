"use server";

import OpenAI from "openai";
import prisma from "./utils";

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
    return tourData.tour;
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

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};
