"use client";

import { useState, useEffect, useRef } from "react";
import VideoPanel from "./VideoPanel.js";
import ChatPanel from "./ChatPanel.js";
import { useRouter } from "next/navigation.js";
import STTConvertion from "./STTConvertion.js";
import oneOneChatAction from "@/actions/ai-chat/one-one.js";
export default function App() {
  const [messages, setMessages] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(9 * 60);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const script = [/* your script */];
  // const followUpQuestions = [/* your follow-ups */];
  // const followUpIndex = useRef(0);

  useEffect(() => {
     window.speechSynthesis.cancel();
    const setup = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      mediaStreamRef.current = stream;

      for (let msg of script) {
        await new Promise((r) => setTimeout(r, 1200));
        setMessages((prev) => [...prev, msg]);
      }
      setIsInputDisabled(false);
    };
    setup();
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: inputValue }]);
    setInputValue("");
    setIsInputDisabled(true);

    setTimeout(() => {
      if (followUpIndex.current < followUpQuestions.length) {
        setMessages((prev) => [...prev, { sender: "ai", text: followUpQuestions[followUpIndex.current++] }]);
        setIsInputDisabled(false);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: "Thank you for your time. The interview is now complete." }]);
      }
    }, 1500);
  };

  const toggleCam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsCamOn((prev) => !prev);
    }
  };

  const handleExit = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      router.push("/"); // in feature we chnage it and make a report and summary page route 
    }
  };

  const toggleChatOnMobile = () => setIsChatOpen((prev) => !prev);
  const router = useRouter();

  return (
    <div className="bg-black flex items-center justify-center h-screen px-2">
      <main className="w-full max-w-[1400px] h-[90vh] flex flex-col md:flex-row bg-[#1a1a1d] rounded-xl overflow-hidden shadow-2xl">
        <VideoPanel
          timeLeft={timeLeft}
          videoRef={videoRef}
          isCamOn={isCamOn}
          toggleCam={toggleCam}
          handleExit={handleExit}
          toggleChatOnMobile={toggleChatOnMobile}
          isChatOpen={isChatOpen}
        />
        <STTConvertion/>
        <ChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
          isInputDisabled={isInputDisabled}
          isChatOpen={isChatOpen}
          toggleChatOnMobile={toggleChatOnMobile}
        />
      </main>
    </div>
  );
}
