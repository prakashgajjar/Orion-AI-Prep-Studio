"use client";

import { useState, useEffect, useRef } from "react";
import VideoPanel from "./VideoPanel.js";
import ChatPanel from "./ChatPanel.js";
import { useRouter } from "next/navigation.js";
import STTConvertion from "./STTConvertion.js";
import oneOneChatAction from "@/actions/ai-chat/one-one.js";
import { Mic, Video, Loader } from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(9 * 60); // 9 minutes
  const [isCamOn, setIsCamOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [jobTitle, setJobTitle] = useState("Software Developer");
  const [setupState, setSetupState] = useState("idle"); // idle | loading | error | ready

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const followUpIndex = useRef(0);

  // Read job title from URL on mount
  useEffect(() => {
    window.speechSynthesis?.cancel();
    if (typeof window !== "undefined") {
      const t = new URLSearchParams(window.location.search).get("jobTitle");
      if (t) setJobTitle(t);
    }
  }, []);

  // Camera + mic setup — called only when user clicks Start
  const startInterview = async () => {
    setSetupState("loading");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      mediaStreamRef.current = stream;

      setSetupState("ready");
      setIsInterviewStarted(true);

      // Initial AI greeting after a short delay
      await new Promise((r) => setTimeout(r, 800));
      setMessages([
        {
          sender: "ai",
          text: `Hello! Welcome to your mock interview for the ${jobTitle} role. I'm your AI interviewer today. Let's start — can you tell me a bit about your background and experience?`,
          timestamp: new Date(),
        },
      ]);
      setIsInputDisabled(false);
    } catch (error) {
      console.error("Camera/Mic error:", error);
      setSetupState("error");
    }
  };

  // Allow text-only start (no camera)
  const startWithoutCamera = async () => {
    setIsInterviewStarted(true);
    setSetupState("ready");
    await new Promise((r) => setTimeout(r, 600));
    setMessages([
      {
        sender: "ai",
        text: `Hello! Welcome to your mock interview for the ${jobTitle} role. I'm your AI interviewer today. Let's start — can you tell me a bit about your background and experience?`,
        timestamp: new Date(),
      },
    ]);
    setIsInputDisabled(false);
  };

  // Timer countdown — only starts after interview begins
  useEffect(() => {
    if (!isInterviewStarted || timeLeft <= 0 || interviewEnded) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [isInterviewStarted, timeLeft, interviewEnded]);

  // Auto-end when timer hits 0
  useEffect(() => {
    if (isInterviewStarted && timeLeft === 0 && !interviewEnded) {
      setInterviewEnded(true);
      setIsInputDisabled(true);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Time's up! Thank you for your time and thoughtful responses. That concludes our interview. We'll review your answers and get back to you soon.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [timeLeft, isInterviewStarted, interviewEnded]);

  // Handle input change
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Unified submission logic
  const submitAnswer = async (text) => {
    if (!text.trim() || isInputDisabled) return;

    const userMsg = { sender: "user", text, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputValue("");
    setIsInputDisabled(true);

    try {
      const history = updatedMessages.map((msg) => ({
        sender: msg.sender,
        text: msg.text,
      }));

      const aiResponse = await oneOneChatAction({ chatHistory: history, jobTitle });

      if (aiResponse) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: aiResponse, timestamp: new Date() },
        ]);

        const ended =
          aiResponse.toLowerCase().includes("concludes our interview") ||
          aiResponse.toLowerCase().includes("conclude our interview") ||
          aiResponse.toLowerCase().includes("thank you for your time") ||
          followUpIndex.current >= 5;

        if (ended) {
          setInterviewEnded(true);
        } else {
          followUpIndex.current += 1;
          setIsInputDisabled(false);
        }
      } else {
        throw new Error("Empty AI response");
      }
    } catch (err) {
      console.error("AI failed, using fallback:", err);
      const fallback = [
        "What are your key strengths and how do they relate to this role?",
        "Can you describe a challenging project you've worked on and how you handled it?",
        "Where do you see yourself in 5 years?",
        "Why are you interested in this particular role?",
        "Do you have any questions for me about the role or company?",
      ];

      setTimeout(() => {
        if (followUpIndex.current < fallback.length) {
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: fallback[followUpIndex.current++], timestamp: new Date() },
          ]);
          setIsInputDisabled(false);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text: "Thank you for your time! That concludes our interview. We'll review your answers and get back to you soon.",
              timestamp: new Date(),
            },
          ]);
          setInterviewEnded(true);
        }
      }, 1000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitAnswer(inputValue);
  };

  const toggleCam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((t) => {
        t.enabled = !t.enabled;
      });
      setIsCamOn((prev) => !prev);
    }
  };

  const handleExit = () => {
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    window.speechSynthesis?.cancel();
    setTimeout(() => router.push("/"), 500);
  };

  const toggleChatOnMobile = () => setIsChatOpen((prev) => !prev);

  // ── PRE-START LOBBY ──────────────────────────────────────────────
  if (!isInterviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4">
        {/* Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-lg text-center">
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-10 shadow-2xl">
            {/* Role badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              Mock Interview Session
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Ready to Start?</h1>
            <p className="text-slate-400 mb-2">
              Role: <span className="text-indigo-300 font-semibold">{jobTitle}</span>
            </p>
            <p className="text-slate-500 text-sm mb-8">
              This session is 9 minutes long. The AI interviewer will ask you questions and evaluate your responses in real-time.
            </p>

            {/* Checklist */}
            <ul className="text-left text-sm text-slate-400 space-y-2 mb-8 bg-slate-800/50 rounded-xl p-4">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Speak clearly and naturally</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Camera &amp; mic required for full experience</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> You can also type your answers in the chat</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">!</span> Allow browser camera &amp; mic permissions when prompted</li>
            </ul>

            {/* Error state */}
            {setupState === "error" && (
              <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                ⚠️ Camera/microphone access was denied. You can still continue with text-only mode.
              </div>
            )}

            {/* Primary CTA */}
            <button
              onClick={startInterview}
              disabled={setupState === "loading"}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 mb-3 text-lg"
            >
              {setupState === "loading" ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Setting up camera & mic...</span>
                </>
              ) : (
                <>
                  <Video size={20} />
                  <span>Start Interview with Camera</span>
                </>
              )}
            </button>

            {/* Text-only fallback */}
            <button
              onClick={startWithoutCamera}
              className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 py-3 px-6 rounded-xl transition-all text-sm font-medium"
            >
              <Mic size={16} />
              <span>Continue without camera (text only)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── INTERVIEW IN PROGRESS ─────────────────────────────────────────
  return (
    <div className="bg-black flex items-center justify-center min-h-screen px-2 py-4">
      <main className="w-full max-w-[1400px] h-[88vh] flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Video Section */}
        <div className="flex-grow bg-[#0e0e10] flex flex-col md:w-2/3">
          <VideoPanel
            timeLeft={timeLeft}
            videoRef={videoRef}
            isCamOn={isCamOn}
            toggleCam={toggleCam}
            handleExit={handleExit}
            toggleChatOnMobile={toggleChatOnMobile}
            isChatOpen={isChatOpen}
          />
          <STTConvertion
            onUserSTT={(text) => submitAnswer(text)}
            lastAiMessage={
              messages.length > 0 && messages[messages.length - 1].sender === "ai"
                ? messages[messages.length - 1].text
                : ""
            }
            isInputDisabled={isInputDisabled}
          />
        </div>

        {/* Chat Section */}
        <ChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
          isInputDisabled={isInputDisabled || interviewEnded}
          isChatOpen={isChatOpen}
          interviewEnded={interviewEnded}
        />
      </main>
    </div>
  );
}
