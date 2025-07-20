"use client";

import React, { useState, useEffect, useRef } from "react";

// Icons — same as yours...
const MicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
);

const MicOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="22" y1="2" y2="22"></line>
    <path d="M10 10v1a2 2 0 0 0 4 0v-1"></path>
    <path d="M12 15a4 4 0 0 0 4-4V5a4 4 0 0 0-8 0v1.5"></path>
    <path d="M19 10v1a7 7 0 0 1-11.2 5.9"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
);

const VideoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 8-6 4 6 4V8Z"></path>
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
  </svg>
);

const VideoOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 16v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path>
    <line x1="2" x2="22" y1="2" y2="22"></line>
    <path d="m22 8-6 4 6 4V8Z"></path>
  </svg>
);

const MessageSquarePlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    <line x1="12" y1="7" x2="12" y2="13"></line>
    <line x1="9" y1="10" x2="15" y2="10"></line>
  </svg>
);

// --- Main Components ---

// Left Panel: Video and Controls

const ExitIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V5m0 14h-1a2 2 0 01-2-2V7a2 2 0 012-2h1"
    />
  </svg>
);

// === Video Panel ===
const VideoPanel = ({
  timeLeft,
  videoRef,
  isMicOn,
  isCamOn,
  toggleMic,
  toggleCam,
  handleExit,
  toggleChatOnMobile,
  isChatOpen,
}) => {
  const formatTime = (seconds) => {
    if (seconds <= 0) return "Time's up!";
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} left`;
  };

  return (
    <div className="flex-grow bg-[#0e0e10] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="bg-black/50 text-white text-sm font-medium py-2 px-4 rounded-full">
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center gap-3">
          {/* Exit */}
          <button
            onClick={handleExit}
            className="w-12 h-12 text-white rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700"
            title="Exit Call"
          >
            <ExitIcon />
          </button>

          {/* Mic */}
          <button
            onClick={toggleMic}
            className={`w-12 h-12 text-white rounded-full flex items-center justify-center ${
              isMicOn ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
            }`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <MicIcon /> : <MicOffIcon />}
          </button>

          {/* Cam */}
          <button
            onClick={toggleCam}
            className={`w-12 h-12 text-white rounded-full flex items-center justify-center ${
              isCamOn ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
            }`}
            title={isCamOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isCamOn ? <VideoIcon /> : <VideoOffIcon />}
          </button>

          {/* Toggle Chat on Mobile */}
          <button
            onClick={toggleChatOnMobile}
            className="md:hidden w-12 h-12 text-white rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700"
            title={isChatOpen ? "Hide Chat" : "Show Chat"}
          >
            <MessageSquarePlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// === Chat Panel ===
const ChatPanel = ({
  messages,
  inputValue,
  onInputChange,
  onFormSubmit,
  isInputDisabled,
  isChatOpen,
  toggleChatOnMobile,
}) => {
  const chatLogRef = useRef(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`fixed md:static top-0 right-0 h-full md:h-auto w-full md:w-[380px] bg-[#1f1f23] flex flex-col transform transition-transform duration-300 ease-in-out ${
        isChatOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      }`}
    >
      <div
        ref={chatLogRef}
        className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2 rounded-2xl text-white ${
                msg.sender === "user"
                  ? "bg-blue-600 rounded-br-lg"
                  : "bg-[#3a3a3c] rounded-bl-lg"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Close Chat Button Mobile */}
      <button
        onClick={toggleChatOnMobile}
        className="md:hidden absolute top-4 left-4 text-white"
      >
        Close
      </button>

      <div className="p-4 bg-[#2c2c2f] border-t border-[#3a3a3c]">
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            disabled={isInputDisabled}
            placeholder={
              isInputDisabled ? "AI is responding..." : "Type your response..."
            }
            className="w-full bg-[#3a3a3c] text-gray-200 border border-[#4a4a4d] rounded-full py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

// === Main App ===
export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(9 * 60);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const script = [ /* same script */ ];
  const followUpQuestions = [ /* same follow-ups */ ];
  const followUpIndex = useRef(0);

  useEffect(() => {
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

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMicOn((prev) => !prev);
    }
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
    }
  };

  const toggleChatOnMobile = () => setIsChatOpen((prev) => !prev);

  return (
    <div className="bg-black flex items-center justify-center h-screen px-2">
      <main className="w-full max-w-[1400px] h-[90vh] flex flex-col md:flex-row bg-[#1a1a1d] rounded-xl overflow-hidden shadow-2xl">
        <VideoPanel
          timeLeft={timeLeft}
          videoRef={videoRef}
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          toggleMic={toggleMic}
          toggleCam={toggleCam}
          handleExit={handleExit}
          toggleChatOnMobile={toggleChatOnMobile}
          isChatOpen={isChatOpen}
        />
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
