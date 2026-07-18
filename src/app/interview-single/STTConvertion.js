"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

export default function STTConvertion({
  onUserSTT = () => {},
  lastAiMessage = "",
  isInputDisabled = false,
}) {
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false); // ref so onend closure sees live value
  const utteranceRef = useRef(null);

  // Pre-load voices on mount
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  // ── Text-to-Speech ───────────────────────────────────────────────
  const speak = useCallback(
    (text) => {
      if (typeof window === "undefined" || !window.speechSynthesis || !text) return;

      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Pick a good English voice
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("google us english") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("victoria") ||
            v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("natural"))
      );
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        if (e.error !== "interrupted") console.error("Speech error:", e.error);
        setIsSpeaking(false);
      };

      utteranceRef.current = utterance;

      // Delay avoids Chrome cancel-race bug
      setTimeout(() => window.speechSynthesis.speak(utterance), 150);
    },
    [voices]
  );

  // Auto-speak new AI messages
  useEffect(() => {
    if (lastAiMessage?.trim()) {
      const t = setTimeout(() => speak(lastAiMessage), 400);
      return () => clearTimeout(t);
    }
  }, [lastAiMessage, speak]);

  // ── Speech Recognition ───────────────────────────────────────────
  const startListening = () => {
    if (isSpeaking) return; // wait for AI to finish

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      isListeningRef.current = true;
      setLiveTranscript("");
    };

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setLiveTranscript(text);
    };

    recognition.onend = () => {
      // Auto-restart only if user hasn't stopped intentionally
      if (isListeningRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech" && isListeningRef.current) {
        try { recognition.start(); } catch {}
      } else if (event.error !== "aborted") {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
        isListeningRef.current = false;
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    isListeningRef.current = false;
    setIsListening(false);
    recognitionRef.current?.stop();

    if (liveTranscript.trim()) {
      onUserSTT(liveTranscript.trim());
      setLiveTranscript("");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const micDisabled = isSpeaking || isInputDisabled;

  return (
    <div className="relative w-full bg-gradient-to-t from-black/80 to-transparent px-6 py-5 flex flex-col items-center gap-4">
      {/* Speaking / Listening status pill */}
      {(isListening || isSpeaking) && (
        <div
          className={`w-full max-w-xl px-4 py-2.5 rounded-lg border flex items-center gap-2 shadow ${
            isSpeaking
              ? "bg-blue-900/60 border-blue-500/40 text-blue-200"
              : "bg-green-900/60 border-green-500/40 text-green-200"
          }`}
        >
          <span className="animate-bounce text-base">
            {isSpeaking ? "🔊" : "🎤"}
          </span>
          <span className="text-sm font-medium">
            {isSpeaking ? "AI is speaking..." : "Listening for your response..."}
          </span>
        </div>
      )}

      {/* Live transcript */}
      {isListening && liveTranscript && (
        <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-lg shadow border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">You&apos;re saying</p>
          <p className="text-sm leading-relaxed">{liveTranscript}</p>
        </div>
      )}

      {/* Mic button */}
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={micDisabled}
        className={`relative px-8 py-3.5 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : micDisabled
            ? "bg-gray-600 cursor-not-allowed opacity-60"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isListening ? (
          <>
            <MicOff size={20} />
            <span>Stop &amp; Send Answer</span>
          </>
        ) : isSpeaking ? (
          <>
            <Volume2 size={20} className="animate-bounce" />
            <span>AI Speaking...</span>
          </>
        ) : (
          <>
            <Mic size={20} />
            <span>Start Speaking</span>
          </>
        )}
      </button>

      {/* Replay AI voice */}
      {lastAiMessage && (
        <button
          onClick={() => speak(lastAiMessage)}
          disabled={isListening || isSpeaking}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition ${
            isListening || isSpeaking
              ? "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
              : "bg-white/15 text-white/80 border-white/25 hover:bg-white/25 cursor-pointer"
          }`}
        >
          <Volume2 size={13} />
          <span>Replay AI Question</span>
        </button>
      )}

      {/* Idle hint */}
      {!isListening && !isSpeaking && !isInputDisabled && (
        <p className="text-white/50 text-xs">
          Press &ldquo;Start Speaking&rdquo; or type your answer in the chat panel →
        </p>
      )}
    </div>
  );
}
