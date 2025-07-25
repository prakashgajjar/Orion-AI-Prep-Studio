"use client";

import oneOneChatAction from "@/actions/ai-chat/one-one";
import { AppContext } from "@/hooks/AppContext";
import { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function STTConvertion() {
  const [isListening, setIsListening] = useState(false);
  const {
    userSTT,
    setUserSTT,
    setAiTextAnswer,
    chatHistory,
    stopSpeechRecognition,
  } = useContext(AppContext);

  const recognitionRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);
  const router = useRouter();

  // 👉 Speak helper: always finds girl voice properly
  const speak = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    // 🩷 Find girl voice properly (voices may load async!)
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const girlVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("google us english"))
      );
      if (girlVoice) utterance.voice = girlVoice;
    };

    if (window.speechSynthesis.getVoices().length) {
      setVoice();
    } else {
      // voices might not be ready — wait for them
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.onend = () => {
      console.log("AI finished speaking ✅");
      startListening();
    };

    window.speechSynthesis.speak(utterance);
  };

  // 👉 Call AI when user speaks
  const aiChat = async () => {
    try {
      const response = await oneOneChatAction({ chatHistory });
      if (response.error) {
        console.error("AI Error:", response.error);
        return;
      }
      console.log("AI Response:", response);
      setAiTextAnswer(response);
      speak(response);
    } catch (error) {
      console.error("AI Chat Error:", error);
    }
  };

  // 🔥 Auto run AI when userSTT updates
  useEffect(() => {
    if (userSTT) aiChat();
  }, [userSTT]);

  // Run AI for first system message if needed
  useEffect(() => {
    if (stopSpeechRecognition) {
      recognitionRef.current?.stop();
    }
    aiChat();
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Mic started");
      setIsListening(true);

      // Clear inactivity nudge
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      console.log("User said:", speechToText);
      setUserSTT(speechToText);
    };

    recognition.onend = () => {
      console.log("Mic stopped");
      setIsListening(false);

      // If user stays silent for 12 sec, nudge them
      // inactivityTimeoutRef.current = setTimeout(() => {
      //   console.log("No answer, nudging...");
      //   speak("Hey Prakash, are you there? Please answer the question.");
      // }, 12000);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Cleanup: stop mic & voice if you leave page or route
  useEffect(() => {
    const stopAll = () => {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      console.log("Mic & voice stopped (route change or unmount)");
    };

    // Next.js route change
    router.events?.on?.("routeChangeStart", stopAll);

    return () => {
      stopAll();
      router.events?.off?.("routeChangeStart", stopAll);
    };
  }, [router]);

  return (
    <div className="">
     
    </div>
  );
}
