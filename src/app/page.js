"use client";

import React, { useContext, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { MockInterviewSection } from "@/components/MockInterviewSection";
import Footer from "@/components/Footer";
import Subscription from "./subsciption/Subscription";
import ReviewSlider from "@/components/Review";
import GenerateInterviewModal from "@/components/InterviewPopup";
import UploadPDFModal from "@/components/PDFInterviewPopup";
import { AppContext } from "@/hooks/AppContext";
import SpeechGuard from "@/context/cancelSpeck";

const App = () => {
  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const {showPdfIntervewPopup , setShowPdfIntervewPopup} = useContext(AppContext);


  return (
    <>
     <div className="fixed top-0 left-0 right-0 z-50">
      <SpeechGuard />
       <Navbar />
     </div>

      {/* --- Hero Section --- */}
      <main className="bg-black text-white min-h-screen pt-16">
        <section className="text-center py-28 px-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-400 mb-2">
            Practice job interview with AI
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Get instant feedback
          </h1>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Simply generate an interview and get instant feedback on your answers and expressions.
          </p>
          <button
            onClick={() => setShowInterviewPopup(true)}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black rounded-full text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Generate →
          </button>
        </section>

        {/* --- Modal --- */}
        <GenerateInterviewModal
          isOpen={showInterviewPopup}
          onClose={() => setShowInterviewPopup(false)}
        />
        <UploadPDFModal isOpen={showPdfIntervewPopup} onClose={() => setShowPdfIntervewPopup(false)} />

        {/* --- Hero Image or Graphic --- */}
        {/* <div className="flex justify-center my-8">
          <Image
            src="/images/2.svg"
            alt="Hero"
            width={400}
            height={400}
            className="w-full max-w-md"
          />
        </div> */}

        {/* --- Features Cards Section --- */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 py-12 ">
  <div className="bg-[#111] border border-green-400/10 p-6 rounded-2xl shadow hover:scale-105 hover:shadow-green-500/20 hover:border-green-400/30 hover:ring hover:ring-green-500/20 transition-all duration-300">
    <div className="text-6xl md:text-7xl text-center mb-4 hover:animate-bounce transition-all duration-300">🧠</div>
    <h3 className="text-xl font-semibold text-center text-green-400">
      Recommendations
    </h3>
    <p className="text-gray-400 text-center mt-2">
      Get feedback & track your improvements.
    </p>
    <p className="text-sm text-green-500 mt-4 text-center underline cursor-pointer hover:text-green-400">
      Learn more →
    </p>
  </div>

  <div className="bg-[#111] border border-purple-400/10 p-6 rounded-2xl shadow hover:scale-105 hover:shadow-purple-500/20 hover:border-purple-400/30 hover:ring hover:ring-purple-500/20 transition-all duration-300">
    <div className="text-6xl md:text-7xl text-center mb-4 hover:animate-bounce transition-all duration-300">🎭</div>
    <h3 className="text-xl font-semibold text-center text-purple-400">
      Expressions
    </h3>
    <p className="text-gray-400 text-center mt-2">
      See your voice & face data for improvement.
    </p>
    <p className="text-sm text-purple-400 mt-4 text-center underline cursor-pointer hover:text-purple-300">
      Learn more →
    </p>
  </div>

  <div className="bg-[#111] border border-blue-400/10 p-6 rounded-2xl shadow hover:scale-105 hover:shadow-blue-500/20 hover:border-blue-400/30 hover:ring hover:ring-blue-500/20 transition-all duration-300">
    <div className="text-6xl md:text-7xl text-center mb-4 hover:animate-bounce transition-all duration-300">🌐</div>
    <h3 className="text-xl font-semibold text-center text-blue-400">
      Multi Language
    </h3>
    <p className="text-gray-400 text-center mt-2">
      Practice in 5 languages to test your skills.
    </p>
    <p className="text-sm text-blue-400 mt-4 text-center underline cursor-pointer hover:text-blue-300">
      Learn more →
    </p>
  </div>
</section>


        {/* --- Mock Interview --- */}
        <section className="py-12">
          <MockInterviewSection />
        </section>

        {/* --- Reviews --- */}
        <section className="py-12">
          <ReviewSlider />
        </section>

        {/* --- Subscription --- */}
        <section className="py-12">
          <Subscription />
        </section>

        {/* --- Footer --- */}
        <Footer />
      </main>
    </>
  );
};

export default App;
