"use client";

import { CardInfo } from "./CardInfo";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Mock Interviews",
    description:
      "Practice technical & HR interviews with a smart AI that asks real questions and gives instant feedback.",
  },
  {
    icon: "💻",
    title: "Live Coding Round",
    description:
      "Face real-world coding challenges in a timed environment with AI feedback and detailed explanations.",
  },
  {
    icon: "📑",
    title: "PDF-Based Smart Q&A",
    description:
      "Upload your notes or syllabus and greetAI will generate custom questions to test your knowledge.",
  },
  {
    icon: "🪙",
    title: "Earn Coins & Rewards",
    description:
      "Complete interviews, pass tests, and earn greetAI Coins — redeem them for real goodies and premium unlocks!",
  },
  {
    icon: "🧩",
    title: "Dynamic Test Generation",
    description:
      "Create unlimited tests tailored to your topic and skill level with AI-powered smart question banks.",
  },
  {
    icon: "🗂️",
    title: "Personal AI Coach",
    description:
      "Get personalized prep suggestions, weak topic analysis, and daily goals to stay on track.",
  },
  {
    icon: "🎁",
    title: "Goodies & Real Perks",
    description:
      "Use your earned coins to get branded merch, gift cards, or extra premium features — stay motivated!",
  },
  {
    icon: "👨‍💻",
    title: "AI Code Reviewer",
    description:
      "Paste your code, get explanations, and learn how to optimize your solutions like a pro.",
  },
];

export const MockInterviewSection = () => {
  return (
<section className="bg-black/70 backdrop-blur-lg py-16 px-6 sm:px-12 md:px-20 lg:px-32 rounded-3xl shadow-2xl border border-gray-800">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-extrabold text-green-400 drop-shadow-lg">
      Why Choose greetAI?
    </h2>
    <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg">
      Your ultimate AI companion for cracking interviews, practicing tests,
      and earning real rewards — all in one powerful learning platform.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {features.map((item, idx) => (
      <div
        key={idx}
        className="bg-white/5 border border-gray-700 backdrop-blur-md rounded-xl p-6 shadow hover:scale-105 hover:border-green-400 hover:shadow-green-500/30 transition duration-300"
      >
        <div className="text-5xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold text-green-300 mb-2">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm">{item.description}</p>
      </div>
    ))}
  </div>
</section>

  );
};
