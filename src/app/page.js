"use client";

import React, { useContext, useState } from "react";
import Navbar from "@/components/Navbar";
import { MockInterviewSection } from "@/components/MockInterviewSection";
import Footer from "@/components/Footer";
import Subscription from "./subsciption/Subscription";
import ReviewSlider from "@/components/Review";
import GenerateInterviewModal from "@/components/InterviewPopup";
import UploadPDFModal from "@/components/PDFInterviewPopup";
import { AppContext } from "@/hooks/AppContext";
import SpeechGuard from "@/context/cancelSpeck";
import { Brain, Sparkles, Globe } from "lucide-react";

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
      <main className="bg-white text-zinc-900 min-h-screen pt-16">
        <section className="text-center py-28 px-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-600 mb-2">
            Practice job interview with AI
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Get instant feedback
          </h1>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Simply generate an interview and get instant feedback on your answers and expressions.
          </p>
          <button
            onClick={() => setShowInterviewPopup(true)}
            className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Generate Interview
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
  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <Brain className="w-12 h-12 text-zinc-800" strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-semibold text-center text-zinc-900">
      Smart Recommendations
    </h3>
    <p className="text-gray-600 text-center mt-2">
      Get AI-powered feedback and track your improvements.
    </p>
    <p className="text-sm text-zinc-700 mt-4 text-center underline cursor-pointer hover:text-zinc-900">
      Learn more
    </p>
  </div>

  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <Sparkles className="w-12 h-12 text-zinc-800" strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-semibold text-center text-zinc-900">
      Expression Analysis
    </h3>
    <p className="text-gray-600 text-center mt-2">
      Analyze your voice and facial expressions for improvement.
    </p>
    <p className="text-sm text-zinc-700 mt-4 text-center underline cursor-pointer hover:text-zinc-900">
      Learn more
    </p>
  </div>

  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <Globe className="w-12 h-12 text-zinc-800" strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-semibold text-center text-zinc-900">
      Multi-Language
    </h3>
    <p className="text-gray-600 text-center mt-2">
      Practice in 5 languages to test your interview skills.
    </p>
    <p className="text-sm text-zinc-700 mt-4 text-center underline cursor-pointer hover:text-zinc-900">
      Learn more
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
