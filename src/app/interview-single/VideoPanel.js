"use client";

import { ExitIcon } from "@/components/icons/ExitIcon";
import { VideoOffIcon } from "@/components/icons/VideoOffIcon.js";
import { MessageSquarePlusIcon } from "@/components/icons/MessageSquarePlusIcon.js";
import { VideoIcon } from "@/components/icons/VideoIcon.js";

export default function VideoPanel({
  timeLeft,
  videoRef,
  isCamOn,
  toggleCam,
  handleExit,
  toggleChatOnMobile,
  isChatOpen,
}) {
  const formatTime = (seconds) => {
    if (seconds <= 0) return "Time's up!";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-grow bg-[#0e0e10] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"
      ></video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

      {/* Header with Timer and Controls */}
      <div className="relative z-10 flex justify-between items-center w-full">
        {/* Timer */}
        <div className="bg-black/60 backdrop-blur-sm text-white text-sm font-bold py-3 px-6 rounded-full border border-white/20">
          ⏱️ {formatTime(timeLeft)}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3">
          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="w-14 h-14 text-white rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-all shadow-lg transform hover:scale-105"
            title="Exit Interview"
          >
            <ExitIcon width={24} height={24} />
          </button>

          {/* Camera Toggle */}
          <button
            onClick={toggleCam}
            className={`w-14 h-14 text-white rounded-full flex items-center justify-center transition-all shadow-lg transform hover:scale-105 ${
              isCamOn 
                ? "bg-gray-600 hover:bg-gray-700" 
                : "bg-red-600 hover:bg-red-700"
            }`}
            title={isCamOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isCamOn ? <VideoIcon width={24} height={24} /> : <VideoOffIcon width={24} height={24} />}
          </button>

          {/* Mobile Chat Toggle */}
          <button
            onClick={toggleChatOnMobile}
            className={`md:hidden w-14 h-14 text-white rounded-full flex items-center justify-center transition-all shadow-lg transform hover:scale-105 ${
              isChatOpen ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"
            }`}
            title={isChatOpen ? "Hide Chat" : "Show Chat"}
          >
            <MessageSquarePlusIcon width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-white text-sm opacity-80">
        <p>📹 Your video is being recorded for assessment</p>
      </div>
    </div>
  );
}
