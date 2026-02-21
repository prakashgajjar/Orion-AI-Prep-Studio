"use client";

import { CardInfo } from "./CardInfo";
import { 
  Bot, 
  Code2, 
  FileText, 
  Coins, 
  Puzzle, 
  LayoutList, 
  Gift, 
  User 
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Mock Interviews",
    description:
      "Practice technical & HR interviews with a smart AI that asks real questions and gives instant feedback.",
  },
  {
    icon: Code2,
    title: "Live Coding Round",
    description:
      "Face real-world coding challenges in a timed environment with AI feedback and detailed explanations.",
  },
  {
    icon: FileText,
    title: "PDF-Based Smart Q&A",
    description:
      "Upload your notes or syllabus and OrionAI will generate custom questions to test your knowledge.",
  },
  {
    icon: Coins,
    title: "Earn Coins & Rewards",
    description:
      "Complete interviews, pass tests, and earn OrionAI Coins — redeem them for real goodies and premium unlocks!",
  },
  {
    icon: Puzzle,
    title: "Dynamic Test Generation",
    description:
      "Create unlimited tests tailored to your topic and skill level with AI-powered smart question banks.",
  },
  {
    icon: LayoutList,
    title: "Personal AI Coach",
    description:
      "Get personalized prep suggestions, weak topic analysis, and daily goals to stay on track.",
  },
  {
    icon: Gift,
    title: "Goodies & Real Perks",
    description:
      "Use your earned coins to get branded merch, gift cards, or extra premium features — stay motivated!",
  },
  {
    icon: User,
    title: "AI Code Reviewer",
    description:
      "Paste your code, get explanations, and learn how to optimize your solutions like a pro.",
  },
];

export const MockInterviewSection = () => {
  return (
<section className="bg-white border border-gray-200 py-16 px-6 sm:px-12 md:px-20 lg:px-32 rounded-3xl shadow-sm">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-extrabold text-zinc-900 drop-shadow-lg">
      Why Choose OrionAI?
    </h2>
    <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
      Your ultimate AI companion for cracking interviews, practicing tests,
      and earning real rewards — all in one powerful learning platform.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {features.map((item, idx) => {
      const IconComponent = item.icon;
      return (
      <div
        key={idx}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition duration-300"
      >
        <div className="mb-4 flex justify-center">
          <IconComponent className="w-10 h-10 text-zinc-800" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 mb-2 text-center">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
      );
    })}
  </div>
</section>

  );
};
