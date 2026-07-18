"use client";

import { useState, useEffect, useRef } from "react";
import VideoPanel from "./VideoPanel.js";
import ChatPanel from "./ChatPanel.js";
import { useRouter } from "next/navigation.js";
import STTConvertion from "./STTConvertion.js";
import oneOneChatAction from "@/actions/ai-chat/one-one.js";

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

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
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
        
        // Read job title from URL immediately to greet correctly
        let title = "Software Developer";
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          const t = searchParams.get("jobTitle");
          if (t) {
            title = t;
            setJobTitle(t);
          }
        }

        // Add initial AI greeting after a short delay
        await new Promise((r) => setTimeout(r, 800));
        setMessages([
          {
            sender: "ai",
            text: `Hello! Welcome to your mock interview for the ${title} role. Let's start with a simple question: Can you tell me about your background and experience?`,
            timestamp: new Date()
          }
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

  // Unified submission logic (for text and voice inputs)
  const submitAnswer = async (text) => {
    if (!text.trim() || isInputDisabled) return;

    const userMsg = { sender: "user", text, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputValue("");
    setIsInputDisabled(true);

    try {
      // Format chat history for backend/Gemini
      const history = updatedMessages.map(msg => ({
        sender: msg.sender,
        text: msg.text
      }));

      // Call dynamic Gemini AI
      const aiResponse = await oneOneChatAction({
        chatHistory: history,
        jobTitle: jobTitle
      });

      if (aiResponse) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: aiResponse, timestamp: new Date() }
        ]);

        // Check if the conversation has concluded
        if (
          aiResponse.toLowerCase().includes("concludes our interview") ||
          aiResponse.toLowerCase().includes("conclude our interview") ||
          aiResponse.toLowerCase().includes("thank you for your time") ||
          followUpIndex.current >= 5
        ) {
          setInterviewEnded(true);
        } else {
          followUpIndex.current += 1;
          setIsInputDisabled(false);
        }
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (err) {
      console.error("Gemini AI failed, falling back to static questions:", err);

      // Fallback questions array
      const fallbackQuestions = [
        "What are your key strengths and how do they relate to this position?",
        "Can you describe a challenging project you've worked on and how you overcame the obstacles?",
        "Where do you see yourself in 5 years, and how does this role fit into your career goals?",
        "Why are you interested in this particular company and position?",
        "Do you have any questions for me about the role or company?"
      ];

      setTimeout(() => {
        if (followUpIndex.current < fallbackQuestions.length) {
          const nextQuestion = fallbackQuestions[followUpIndex.current++];
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: nextQuestion, timestamp: new Date() }
          ]);
          setIsInputDisabled(false);
        } else {
          const finalMessage = "Thank you for your time and thoughtful responses! That concludes our interview. We'll review your answers and get back to you soon.";
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: finalMessage, timestamp: new Date() }
          ]);
          setInterviewEnded(true);
        }
      }, 1000);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitAnswer(inputValue);
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
              submitAnswer(text);
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
