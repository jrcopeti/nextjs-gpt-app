"use client";

import { generateChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";

interface QueryProps {
  role: string;
  content: string | null;
}

function Chat() {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<QueryProps[]>([]);

  const { mutate: createQuery, isPending } = useMutation({
    mutationFn: (query: QueryProps) =>
      generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Failed to generate response");
        return;
      }
      console.log(data);
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = { role: "user", content: inputText };

    createQuery(query);
    setMessages((prev) => [...prev, query]);
    setInputText("");
  };

  return (
    <div className="grid min-h-[calc(100dvh-6rem)] grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? <IoPerson /> : <RiRobot2Line />;
          const background = role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={`${background} -mx-8 flex border-b border-base-300 px-8 py-6 text-lg leading-loose`}
            >
              <span className="mr-4 text-xl text-primary">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending && <span className="loading loading-ring loading-lg"></span>}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
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
            className="btn btn-primary join-item text-xl "
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span>
                <FaArrowUpFromBracket />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
