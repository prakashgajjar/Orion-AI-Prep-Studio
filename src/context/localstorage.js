import { useState, useEffect } from "react";

export function useChatHistory() {
  const [chatHistory, setChatHistory] = useState();

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addMessage = (role, message) => {
    const newChatHistory = [...chatHistory, { role, message }];
    localStorage.setItem("chatHistory", JSON.stringify(newChatHistory));
    setChatHistory(newChatHistory);
  };

  const clearChatHistory = () => {
    localStorage.removeItem("chatHistory");
    setChatHistory([]);
  }

  return { chatHistory, addMessage , clearChatHistory};
}
