"use client";

import {ExitIcon} from "@/components/icons/ExitIcon"
import {VideoOffIcon} from "@/components/icons/VideoOffIcon.js";
import {MessageSquarePlusIcon} from "@/components/icons/MessageSquarePlusIcon.js";

import {VideoIcon} from "@/components/icons/VideoIcon.js";

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
    return `${minutes} minute${minutes !== 1 ? "s" : ""} left`;
  };

  return (
    <div className="flex-grow bg-[#0e0e10] flex flex-col justify-between p-6 relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"
      ></video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="bg-black/50 text-white text-sm font-medium py-2 px-4 rounded-full">
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExit}
            className="w-12 h-12 text-white rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700"
            title="Exit Call"
          >
            <ExitIcon />
          </button>

          <button
            onClick={toggleCam}
            className={`w-12 h-12 text-white rounded-full flex items-center justify-center ${
              isCamOn ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
            }`}
            title={isCamOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isCamOn ? <VideoIcon /> : <VideoOffIcon />}
          </button>

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
}
