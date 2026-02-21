"use client";

import { useState, useEffect, useRef } from "react";
import VideoPanel from "./VideoPanel.js";
import ChatPanel from "./ChatPanel.js";
import { useRouter } from "next/navigation.js";
import STTConvertion from "./STTConvertion.js";

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

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Initial AI greeting and follow-up questions
  const initialGreeting = "Hello! Welcome to your interview. Let's start with a simple question: Can you tell me about your background and experience?";
  const followUpQuestions = [
    "What are your key strengths and how do they relate to this position?",
    "Can you describe a challenging project you've worked on and how you overcame the obstacles?",
    "Where do you see yourself in 5 years, and how does this role fit into your career goals?",
    "Why are you interested in this particular company and position?",
    "Do you have any questions for me about the role or company?"
  ];
  const followUpIndex = useRef(0);

  // Initialize camera and microphone
  useEffect(() => {
    window.speechSynthesis.cancel();
    const setup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
        setIsInterviewStarted(true);
        
        // Add initial AI greeting after a short delay
        await new Promise((r) => setTimeout(r, 800));
        setMessages([
          { sender: "ai", text: initialGreeting, timestamp: new Date() }
        ]);
        setIsInputDisabled(false);
      } catch (error) {
        console.error("Camera/Microphone error:", error);
        alert("Please allow camera and microphone access to continue with the interview.");
      }
    };
    
    setup();
    
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || interviewEnded) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, interviewEnded]);

  // Handle input change
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isInputDisabled) return;
    
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: inputValue, timestamp: new Date() }]);
    setInputValue("");
    setIsInputDisabled(true);

    // Simulate AI response with follow-up question
    setTimeout(() => {
      if (followUpIndex.current < followUpQuestions.length) {
        const nextQuestion = followUpQuestions[followUpIndex.current++];
        setMessages((prev) => [...prev, { sender: "ai", text: nextQuestion, timestamp: new Date() }]);
        setIsInputDisabled(false);
      } else {
        const finalMessage = "Thank you for your time and thoughtful responses! That concludes our interview. We'll review your answers and get back to you soon.";
        setMessages((prev) => [...prev, { sender: "ai", text: finalMessage, timestamp: new Date() }]);
        setInterviewEnded(true);
      }
    }, 1000);
  };

  // Toggle camera
  const toggleCam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCamOn((prev) => !prev);
    }
  };

  // Handle exit
  const handleExit = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    window.speechSynthesis.cancel();
    // TODO: Save interview summary before navigation
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  // Toggle chat on mobile
  const toggleChatOnMobile = () => setIsChatOpen((prev) => !prev);

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
            onUserSTT={(text) => {
              if (text.trim() && !isInputDisabled) {
                setMessages((prev) => [...prev, { sender: "user", text, timestamp: new Date() }]);
              }
            }}
            lastAiMessage={messages.length > 0 && messages[messages.length - 1].sender === "ai" ? messages[messages.length - 1].text : ""}
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
