"use server";

import OpenAI from "openai";

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

export const getExistingTour = async ({ city, country }) => {
  return null;
};

interface queryTourProps {
  city: string;
  country: string;
}

export const generateTourResponse = async ({
  city,
  country,
}: queryTourProps) => {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}.
Once you have a list, create a one-day tour. Response should be in the following JSON format:
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1, 20 words maximum", "short paragraph on the stop 2, 20 words maximum", "short paragraph on the stop 3, 20 words maximum"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, provide a general guide that could apply to any small town in ${country}. If ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country}, return { "tour": null }, with no additional characters.
Be careful with typos inside the JSON structure like extra commas after arrays last item, this info will be parsed with a JSON.parse() method.`;
  console.log("query", query);
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide" },
        { role: "user", content: query },
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

export const createNewTour = async ({ tour }) => {
  return null;
};
