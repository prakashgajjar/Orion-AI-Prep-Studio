"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
  const router = useRouter();

  const handleGoHome = () => {
    const audioEl = document.getElementById("success-audio");
    if (audioEl) {
      audioEl.play().catch((err) => console.log(err));
    }
    router.push("/");
  };

  // Remove auto play
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000); // 10 sec fallback auto redirect

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-50">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-green-500 rounded-full p-6 mb-6 shadow-lg"
      >
        <svg
          className="w-16 h-16 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <audio id="success-audio" src="/audio/success.mp3"></audio>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-green-800 mb-2"
      >
        Payment Successful!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 mb-6"
      >
        Thank you for your payment ✨
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={handleGoHome}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition"
      >
        Go to Home →
      </motion.button>
    </div>
  );
}
