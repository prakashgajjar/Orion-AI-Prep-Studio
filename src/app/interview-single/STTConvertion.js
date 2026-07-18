"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

export default function STTConvertion({ onUserSTT = () => {}, lastAiMessage = "" }) {
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);

  // Pre-load voices on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Text-to-Speech Function
  const speak = useCallback((text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any existing speech
    window.speechSynthesis.cancel();
    
    // Chrome stuck queue fix
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Set voice from preloaded voices
    const femaleVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("victoria") ||
          v.name.toLowerCase().includes("google us english") ||
          v.name.toLowerCase().includes("natural"))
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Handle speech events
    utterance.onstart = () => {
      console.log("🔊 AI speaking...");
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      console.log("✅ AI finished speaking");
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.error("❌ Speech error:", e);
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    
    // Short delay to avoid Chrome cancel race condition
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  }, [voices]);

  // Auto-speak when AI message is received
  useEffect(() => {
    if (lastAiMessage && lastAiMessage.trim()) {
      // Small delay to ensure UI is updated
      setTimeout(() => {
        speak(lastAiMessage);
      }, 300);
    }
  }, [lastAiMessage, speak]);

  // Start listening
  const startListening = () => {
    // Don't start if AI is speaking
    if (isSpeaking) {
      console.log("⏸️ Waiting for AI to finish speaking...");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support voice input. Please use Chrome, Edge, or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    recognition.onstart = () => {
      console.log("🎤 Listening started...");
      setIsListening(true);
      setLiveTranscript("");
    };

    recognition.onresult = (event) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }
      console.log("📝 You said:", finalText);
      setLiveTranscript(finalText);
    };

    recognition.onend = () => {
      if (isListening) recognition.start(); // Auto restart if still ON
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech Recognition Error:", event.error);
      if (event.error === "no-speech" && isListening) {
        recognition.start();
      } else {
        setIsListening(false);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();

    // Send transcript when mic stops
    if (liveTranscript.trim()) {
      console.log("📤 Sending to AI...");
      onUserSTT(liveTranscript);
      setLiveTranscript("");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      console.log("🛑 Mic & voice stopped");
    };
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-t from-black/80 to-transparent px-6 py-6 flex flex-col items-center gap-4">
      {/* Status Indicator */}
      {(isListening || isSpeaking) && (
        <div className={`w-full max-w-xl px-4 py-3 rounded-lg shadow-lg border flex items-center gap-2 ${
          isSpeaking 
            ? "bg-blue-50 border-blue-300 text-blue-900" 
            : "bg-green-50 border-green-300 text-green-900"
        }`}>
          <span className={`animate-bounce text-lg ${isSpeaking ? "text-blue-600" : "text-green-600"}`}>
            {isSpeaking ? "🔊" : "🎤"}
          </span>
          <span className="text-sm font-medium">
            {isSpeaking ? "AI is speaking..." : "Listening..."}
          </span>
        </div>
      )}

      {/* Live Transcript Display */}
      {isListening && liveTranscript && (
        <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium mb-1 text-gray-600">You&apos;re saying:</p>
          <p className="text-base leading-relaxed">{liveTranscript}</p>
        </div>
      )}

      {/* Main Mic Button */}
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={isSpeaking}
        className={`relative px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 ${
          isListening 
            ? "bg-red-500 hover:bg-red-600 animate-pulse" 
            : isSpeaking
            ? "bg-gray-500 cursor-not-allowed opacity-70"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isListening ? (
          <>
            <MicOff size={22} />
            <span>Stop Recording</span>
          </>
        ) : isSpeaking ? (
          <>
            <Volume2 size={22} className="animate-bounce" />
            <span>AI Speaking...</span>
          </>
        ) : (
          <>
            <Mic size={22} />
            <span>Start Speaking</span>
          </>
        )}
      </button>

      {/* Replay AI Voice button if there is a last AI message */}
      {lastAiMessage && (
        <button
          onClick={() => speak(lastAiMessage)}
          disabled={isListening || isSpeaking}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold border transition ${
            isListening || isSpeaking
              ? "bg-white/10 text-white/40 border-white/10 cursor-not-allowed"
              : "bg-white/20 text-white border-white/30 hover:bg-white/30 cursor-pointer"
          }`}
        >
          <Volume2 size={14} />
          <span>Replay AI Question</span>
        </button>
      )}

      {/* Subtitle Info */}
      {isListening && !liveTranscript && (
        <p className="text-white/80 text-sm flex items-center gap-2">
          <span className="animate-pulse">●</span>
          <span>Listening for your response...</span>
        </p>
      )}
    </div>
  );
}
