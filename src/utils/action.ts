"use server";

export const generateChatResponse = async (chatMessage: string) => {
  console.log(chatMessage);
  return {
    message: "Hello, how can I help you?",
  };
};
