"use client";

import { generateChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Chat() {
  const [text, setText] = useState("");
  const [message, setMesage] = useState([]);

  const { mutate: createMessage } = useMutation({
    mutationFn: (message: string) => generateChatResponse(message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage(text);
  };

  return (
    <div className="min-h-[calc(100dvh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl"></h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            required
            type="text"
            placeholder="message..."
            value={text}
            className="input input-bordered join-item w-full"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item ">
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
