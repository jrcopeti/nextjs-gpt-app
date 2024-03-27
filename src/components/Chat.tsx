"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import {
  fetchUserTokensbyId,
  generateChatResponse,
  subtractedTokens,
} from "@/utils/actions";

import TypewriterEffect from "./TypewriterEffect";
import { useAuth } from "@clerk/nextjs";
import { QueryProps } from "@/utils/types";
import toast from "react-hot-toast";

import { FaArrowUpFromBracket } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { BsChatRightDots, BsPerson } from "react-icons/bs";

function Chat() {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<QueryProps[]>([]);
  const { userId } = useAuth();

  const { mutate: createQuery, isPending } = useMutation({
    mutationFn: async (query: QueryProps) => {
      if (!userId) {
        return <div>Not signed in</div>;
      }

      const currentTokens = await fetchUserTokensbyId(userId);

      if (!currentTokens) {
        throw new Error("Could not retrieve token balance.");
      }

      if (currentTokens.tokens < 100) {
        throw new Error("Token balance is too low to generate a response.");
      }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        throw new Error("Failed to generate response. Please try again.");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const updatedTokens = await subtractedTokens(
        userId,
        response.tokens ?? 0,
      );
      toast.success(`${updatedTokens} tokens remaining...`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query: QueryProps = { role: "user", content: inputText };

    createQuery(query);
    setMessages((prev: QueryProps[]) => [...prev, query]);
    setInputText("");
  };

  return (
    <>
      <div className="-mx-8 flex border-b border-base-200 bg-primary-content px-8 py-6 text-lg leading-loose">
        <span className="mr-4 text-xl text-primary">
          <BsChatRightDots size={24} />
        </span>
        <div className="max-w-3xl">
          <span>
            <TypewriterEffect
              text="Hello! I am GPT-3.5. How can I help you today?"
              delay={20}
            />
          </span>
        </div>
      </div>

      <div className="relative grid min-h-[calc(100vh-8rem)]  grid-rows-[1fr,auto]">
        <div>
          {messages.map(({ role, content }, index) => {
            const avatar =
              role === "user" ? (
                <BsPerson size={24} />
              ) : (
                <BsChatRightDots size={24} />
              );
            const background =
              role === "user" ? "bg-base-100" : "bg-primary-content";
            const displayContent =
              role === "user" ? (
                content
              ) : (
                <TypewriterEffect text={content} delay={20} />
              );

            return (
              <div
                key={index}
                className={`${background} -mx-8 flex border-b border-base-200 px-8 py-6 text-lg leading-loose`}
              >
                <span className="mr-4 text-xl text-primary">{avatar}</span>
                <div className="max-w-3xl">
                  <span>{displayContent}</span>
                </div>
              </div>
            );
          })}
          {isPending && (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="fixed bottom-5 w-[90%] pt-12 lg:max-w-5xl "
        >
          <div className="join w-full ">
            <input
              required
              type="text"
              placeholder="Message GPT App..."
              value={inputText}
              className="input join-item input-bordered w-full"
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              disabled={isPending}
              className="btn btn-secondary join-item bg-gradient-to-r from-primary to-secondary text-xl hover:text-base-content"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-md text-base-content"></span>
              ) : (
                <span>
                  <FaArrowUpFromBracket />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Chat;
