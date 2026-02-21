/**
 * Example: Using API Client in a React Component
 * This file demonstrates how to use the API service with React hooks
 */

"use client";

import { useState } from "react";
import { useApi, useFormWithApi } from "@/hooks/useApi";
import api from "@/services/api";
import { Loader, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Interview Component Example
 * Shows how to integrate interview API with React form
 */
export function InterviewExample() {
  const { call, loading, error } = useApi();
  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleStartInterview = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await call(api.interviews.start, {
      jobTitle: formData.get("jobTitle"),
      interviewType: formData.get("interviewType"),
      difficulty: formData.get("difficulty"),
      duration: parseInt(formData.get("duration")) || 45,
    });

    if (result.success) {
      setInterview(result.data);
      // Get first question
      const questionResult = await call(api.interviews.getQuestion, {
        interviewId: result.data.id,
      });
      if (questionResult.success) {
        setCurrentQuestion(questionResult.data);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Loader className="w-5 h-5 animate-spin" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <span>{error}</span>
      </div>
    );
  }

  if (!interview) {
    return (
      <form onSubmit={handleStartInterview} className="space-y-4">
        <input
          name="jobTitle"
          placeholder="Job Title"
          className="w-full px-4 py-2 border border-gray-200 rounded"
          required
        />
        <select
          name="interviewType"
          className="w-full px-4 py-2 border border-gray-200 rounded"
          required
        >
          <option value="technical">Technical</option>
          <option value="hr">HR</option>
          <option value="behavioral">Behavioral</option>
        </select>
        <select
          name="difficulty"
          className="w-full px-4 py-2 border border-gray-200 rounded"
          required
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition"
        >
          Start Interview
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        <span>Interview started successfully</span>
      </div>
      {currentQuestion && (
        <div className="p-4 border border-gray-200 rounded bg-white">
          <h3 className="font-semibold mb-4">{currentQuestion.question}</h3>
          <textarea
            placeholder="Your answer..."
            className="w-full px-4 py-2 border border-gray-200 rounded min-h-32"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Test Generation Component Example
 */
export function TestGeneratorExample() {
  const { call, loading, error } = useApi();
  const [test, setTest] = useState(null);

  const handleGenerateTest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await call(api.tests.generate, {
      subject: formData.get("subject"),
      topic: formData.get("topic"),
      difficulty: formData.get("difficulty"),
      numberOfQuestions: parseInt(formData.get("numberOfQuestions")),
    });

    if (result.success) {
      setTest(result.data);
    }
  };

  if (!test) {
    return (
      <form onSubmit={handleGenerateTest} className="space-y-4">
        <input
          name="subject"
          placeholder="Subject"
          className="w-full px-4 py-2 border border-gray-200 rounded"
          required
        />
        <input
          name="topic"
          placeholder="Topic"
          className="w-full px-4 py-2 border border-gray-200 rounded"
          required
        />
        <select name="difficulty" className="w-full px-4 py-2 border border-gray-200 rounded">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select name="numberOfQuestions" className="w-full px-4 py-2 border border-gray-200 rounded">
          <option value="5">5 Questions</option>
          <option value="10">10 Questions</option>
          <option value="20">20 Questions</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Test"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <p>Test generated with {test.questions.length} questions</p>
    </div>
  );
}

/**
 * Analytics Dashboard Example
 */
export function AnalyticsDashboardExample() {
  const { call, loading, error } = useApi();
  const [analytics, setAnalytics] = useState(null);

  const handleLoadAnalytics = async () => {
    const result = await call(api.analytics.getUserProgress);
    if (result.success) {
      setAnalytics(result.data);
    }
  };

  if (!analytics) {
    return (
      <button
        onClick={handleLoadAnalytics}
        disabled={loading}
        className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load Analytics"}
      </button>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border border-gray-200 rounded bg-white">
        <p className="text-gray-600">Total Interviews</p>
        <p className="text-3xl font-bold">{analytics.summary.totalInterviews}</p>
      </div>
      <div className="p-4 border border-gray-200 rounded bg-white">
        <p className="text-gray-600">Average Score</p>
        <p className="text-3xl font-bold">{analytics.summary.averageScore}%</p>
      </div>
      <div className="p-4 border border-gray-200 rounded bg-white">
        <p className="text-gray-600">Total Tests</p>
        <p className="text-3xl font-bold">{analytics.summary.totalTests}</p>
      </div>
      <div className="p-4 border border-gray-200 rounded bg-white">
        <p className="text-gray-600">Current Streak</p>
        <p className="text-3xl font-bold">{analytics.summary.streak} days</p>
      </div>
    </div>
  );
}

export default {
  InterviewExample,
  TestGeneratorExample,
  AnalyticsDashboardExample,
};
