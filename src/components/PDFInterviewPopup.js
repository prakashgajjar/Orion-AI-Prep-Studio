"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";


// Icons
const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  </svg>
);

export default function UploadPDFModal({ isOpen, onClose }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("");
  const router = useRouter();



  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleProcess = () => {
    if (!pdfFile) {
      alert("Please select a PDF first.");
      return;
    }
    setIsProcessing(true);
    router.push("/interview-single");
  };


  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f0f0f] text-white rounded-2xl w-full max-w-md mx-4 p-8 relative shadow-2xl border border-green-500/30"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-green-400 transition"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-green-400">Upload PDF</h2>
        <p className="text-gray-400 mb-6 text-sm">Upload your PDF to generate AI Interview</p>

        {/* PDF Upload */}
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-400"
          />
          {pdfFile && (
            <p className="mt-2 text-sm text-green-400">✅ {pdfFile.name}</p>
          )}
        </div>

        {/* Process Button */}
        <button
          onClick={handleProcess}
          disabled={!pdfFile || isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-green-400 text-black font-semibold py-3 px-6 rounded-xl transition hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <ArrowRightIcon />
              Generate Answer
            </>
          )}
        </button>

        {/* AI Answer Preview */}
        {aiAnswer && (
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded-xl border border-green-500/20 text-sm text-gray-300">
            {aiAnswer}
          </div>
        )}
      </div>
    </div>
  );
}
