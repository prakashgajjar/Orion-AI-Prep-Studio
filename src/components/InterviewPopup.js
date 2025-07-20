"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

// --- Icons ---
const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);

const GenerateInterviewModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is not valid.";
    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Submitted:", formData);
        setIsSubmitting(false);
        onClose();
        router.push("/interview-single");
      }, 1500);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", jobTitle: "", email: "" });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[6px] flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black text-white rounded-2xl w-full max-w-md mx-4 p-8 relative shadow-2xl border border-green-500/20"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-green-400 transition"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-400">Generate Interview</h2>
          <p className="text-gray-400 mt-1">
            Enter your details to generate your mock interview session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "jobTitle", "email"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm mb-2 capitalize">
                {field === "jobTitle" ? "Job title" : field}
              </label>
              <input
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field === "name"
                    ? "Your name"
                    : field === "jobTitle"
                    ? "e.g., Frontend Developer"
                    : "you@example.com"
                }
                className={`w-full bg-transparent border rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-green-400"
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-green-400 text-black font-semibold py-3 px-6 rounded-xl transition hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <ArrowRightIcon />
                <span>Generate Interview</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-green-400">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-green-400">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default GenerateInterviewModal;
