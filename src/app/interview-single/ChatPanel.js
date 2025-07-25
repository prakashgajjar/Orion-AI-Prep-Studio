"use client";

import { useEffect, useRef, useContext, useState } from "react";
import { AppContext } from "@/hooks/AppContext";

export default function ChatPanel() {
  const chatLogRef = useRef(null);
  const { userSTT, AiTextAnswer, setChatHistory, chatHistory } =
    useContext(AppContext);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [userSTT, AiTextAnswer]);

  useEffect(() => {
    if (userSTT && userSTT.trim() !== "") {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "user",
          parts: [{ text: userSTT }],
        },
      ]);
    }
  }, [userSTT]);

  useEffect(() => {
    if (AiTextAnswer && AiTextAnswer.trim() !== "") {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          parts: [{ text: AiTextAnswer }],
        },
      ]);
    }
  }, [AiTextAnswer]);

  return (
    <div className="flex flex-col h-full w-full md:w-[400px] bg-[#1f1f23]">
      {/* Chat History */}
      <div
        ref={chatLogRef}
        className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : msg.role === "model"
                ? "justify-start"
                : ""
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-white ${
                msg.role === "user"
                  ? "bg-blue-600 rounded-br-lg"
                  : msg.role === "model"
                  ? "bg-[#3a3a3c] rounded-bl-lg"
                  : ""
              }`}
            >
              <p className="text-sm">{msg.parts[0].text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
