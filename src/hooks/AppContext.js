"use client";

import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showPdfIntervewPopup, setShowPdfIntervewPopup] = useState(false);
  const [userSTT, setUserSTT] = useState("");
  const [AiTextAnswer, setAiTextAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [stopSpeechRecognition, setStopSpeechRecognition] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      parts: [
        {
          text: `You are a friendly, supportive AI interviewer.
You are conducting a mock interview for the role of a **Frontend Developer**.
The candidate’s name is **Prakash**.
Speak in a professional, polite tone.
Keep your messages short and clear.
You should ONLY ask questions — do NOT explain any answers.
Focus on asking short, precise, technical questions related to frontend development.
Do not answer the questions for the candidate.
Start now by asking the first question: ask Prakash to introduce himself.`,
        },
      ],
    },
  ]);
  return (
    <AppContext.Provider
      value={{
        showPdfIntervewPopup,
        setShowPdfIntervewPopup,
        setUserSTT,
        userSTT,
        AiTextAnswer,
        setAiTextAnswer,
        setIsListening,
        isListening,
        setChatHistory,
        chatHistory,
        setStopSpeechRecognition,
        stopSpeechRecognition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
