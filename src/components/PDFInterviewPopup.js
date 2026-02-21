"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2, Loader } from "lucide-react";

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
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-zinc-900 rounded-2xl w-full max-w-md mx-4 p-8 relative shadow-lg border border-gray-200"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-zinc-900 transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-zinc-900">Upload PDF</h2>
        <p className="text-gray-600 mb-6 text-sm">Upload your PDF to generate an AI-powered interview</p>

        {/* PDF Upload */}
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600"
          />
          {pdfFile && (
            <p className="mt-2 text-sm text-zinc-700 flex items-center gap-2">
              <CheckCircle2 size={16} /> {pdfFile.name}
            </p>
          )}
        </div>

        {/* Process Button */}
        <button
          onClick={handleProcess}
          disabled={!pdfFile || isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-semibold py-3 px-6 rounded-xl transition hover:bg-zinc-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader size={20} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ArrowRight size={20} />
              Generate Answer
            </>
          )}
        </button>

        {/* AI Answer Preview */}
        {aiAnswer && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700">
            {aiAnswer}
          </div>
        )}
      </div>
    </div>
  );
}
