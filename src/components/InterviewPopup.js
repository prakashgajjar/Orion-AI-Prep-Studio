"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { X, ArrowRight, Loader } from "lucide-react";

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
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[6px] flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-zinc-900 rounded-2xl w-full max-w-md mx-4 p-8 relative shadow-lg border border-gray-200"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-zinc-900 transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900">Generate Interview</h2>
          <p className="text-gray-600 mt-1">
            Enter your details to generate your mock interview session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "jobTitle", "email"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm mb-2 capitalize text-gray-700">
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
                className={`w-full bg-white border rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-zinc-900"
                }`}
              />
              {errors[field] && (
                <p className="text-red-600 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-semibold py-3 px-6 rounded-xl transition hover:bg-zinc-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <ArrowRight size={20} />
                <span>Generate Interview</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-8">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-zinc-900">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-zinc-900">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default GenerateInterviewModal;
