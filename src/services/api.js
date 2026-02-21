/**
 * Frontend API Service
 * Centralized API client for all backend endpoints
 * Usage: import { api } from '@/services/api'
 */

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
);

export const api = {
  // ============ INTERVIEWS ============
  interviews: {
    start: (data) => apiClient.post("/api/interviews/start", data),
    getQuestion: (data) => apiClient.post("/api/interviews/get-question", data),
    submitAnswer: (data) => apiClient.post("/api/interviews/submit-answer", data),
    end: (data) => apiClient.post("/api/interviews/end", data),
  },

  // ============ TESTS ============
  tests: {
    generate: (data) => apiClient.post("/api/tests/generate", data),
    submit: (data) => apiClient.post("/api/tests/submit", data),
  },

  // ============ ASSESSMENTS ============
  assessments: {
    codeReview: (data) => apiClient.post("/api/assessments/code-review", data),
    technicalRound: (data) =>
      apiClient.post("/api/assessments/technical-round", data),
  },

  // ============ AI SERVICES ============
  aiServices: {
    conceptExplainer: (data) =>
      apiClient.post("/api/ai-services/concept-explainer", data),
    answerAnalysis: (data) =>
      apiClient.post("/api/ai-services/answer-analysis", data),
    questionGenerator: (data) =>
      apiClient.post("/api/ai-services/question-generator", data),
  },

  // ============ ANALYTICS ============
  analytics: {
    getUserProgress: () => apiClient.get("/api/analytics/user-progress"),
    generateReport: (data) =>
      apiClient.post("/api/analytics/report-generator", data),
  },

  // ============ RESOURCES ============
  resources: {
    getFeatured: () => apiClient.get("/api/resources/featured"),
    getBookmarks: () => apiClient.get("/api/resources/bookmarks"),
    bookmark: (data) => apiClient.post("/api/resources/bookmark", data),
  },

  // ============ UTILITY FUNCTIONS ============
  // Wrap API calls with loading and error handling
  withLoading: async (fn, setLoading) => {
    try {
      setLoading(true);
      const result = await fn();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  },

  // Batch multiple requests
  batch: (requests) => Promise.all(requests),
};

export default api;
