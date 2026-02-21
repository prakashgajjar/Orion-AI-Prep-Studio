"use client";

import { useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function ChatPanel({
  messages = [],
  inputValue = "",
  onInputChange = () => {},
  onFormSubmit = () => {},
  isInputDisabled = false,
  isChatOpen = false,
  interviewEnded = false,
}) {
  const chatLogRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col h-full w-full md:w-1/3 bg-white border-l border-gray-200 transition-all duration-300 ${
      isChatOpen ? "flex" : "hidden md:flex"
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-gray-800 text-white px-6 py-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">Interview Chat</h2>
        <p className="text-xs text-gray-300">{messages.length} messages</p>
      </div>

      {/* Messages Container */}
      <div
        ref={chatLogRef}
        className="flex-1 px-6 py-4 overflow-y-auto space-y-4 bg-gray-50"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-center">
            <p>Start your interview...</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl break-words ${
                  msg.sender === "user"
                    ? "bg-zinc-900 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }  shadow-sm`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.timestamp && (
                  <p className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      {!interviewEnded && (
        <form onSubmit={onFormSubmit} className="border-t border-gray-300 bg-white px-6 py-4 space-y-3">
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Type your response..."
            disabled={isInputDisabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-500 transition"
          />
          <button
            type="submit"
            disabled={isInputDisabled || !inputValue.trim()}
            className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Send Answer
          </button>
        </form>
      )}

      {/* Interview Ended Message */}
      {interviewEnded && (
        <div className="border-t border-gray-300 bg-green-50 px-6 py-4 text-center">
          <p className="text-green-700 font-semibold">✓ Interview Completed</p>
          <p className="text-sm text-green-600 mt-1">Thank you for your participation!</p>
        </div>
      )}
    </div>
  );
}
