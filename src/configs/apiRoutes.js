/**
 * API Routes Documentation
 * Complete list of all backend endpoints
 */

export const API_DOCUMENTATION = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  version: "v1",
  endpoints: {
    interviews: {
      name: "Interview Management",
      routes: [
        {
          method: "POST",
          path: "/api/interviews/start",
          description: "Start a new interview session",
          auth: true,
          body: {
            jobTitle: "string (required)",
            interviewType: "technical | hr | behavioral (required)",
            difficulty: "easy | medium | hard (required)",
            duration: "number (optional, default: 45)",
          },
          response: {
            id: "interview_id",
            userId: "user_id",
            jobTitle: "string",
            status: "active",
            startTime: "ISO8601",
          },
        },
        {
          method: "POST",
          path: "/api/interviews/get-question",
          description: "Get next interview question",
          auth: true,
          body: {
            interviewId: "string (required)",
            questionNumber: "number (optional)",
          },
          response: {
            question: "string",
            questionId: "string",
            type: "string",
            hints: "array",
          },
        },
        {
          method: "POST",
          path: "/api/interviews/submit-answer",
          description: "Submit interview answer with AI feedback",
          auth: true,
          body: {
            interviewId: "string (required)",
            questionId: "string (required)",
            answer: "string (required)",
          },
          response: {
            contentScore: "0-10",
            clarityScore: "0-10",
            confidenceScore: "0-10",
            feedback: "string",
          },
        },
        {
          method: "POST",
          path: "/api/interviews/end",
          description: "End interview and generate report",
          auth: true,
          body: {
            interviewId: "string (required)",
          },
          response: {
            overallScore: "0-100",
            report: "object",
            recommendations: "array",
          },
        },
      ],
    },

    tests: {
      name: "Test & Quiz Management",
      routes: [
        {
          method: "POST",
          path: "/api/tests/generate",
          description: "Generate a custom test",
          auth: true,
          body: {
            subject: "string (required)",
            topic: "string (required)",
            difficulty: "easy | medium | hard (required)",
            numberOfQuestions: "number (1-50, required)",
          },
          response: {
            testId: "string",
            questions: "array",
            duration: "number (minutes)",
          },
        },
        {
          method: "POST",
          path: "/api/tests/submit",
          description: "Submit test and get score",
          auth: true,
          body: {
            testId: "string (required)",
            answers: "array (required)",
          },
          response: {
            score: "number",
            percentage: "number",
            analysis: "object",
            recommendations: "array",
          },
        },
      ],
    },

    assessments: {
      name: "Code Review & Assessment",
      routes: [
        {
          method: "POST",
          path: "/api/assessments/code-review",
          description: "Get AI code review",
          auth: true,
          body: {
            code: "string (required)",
            language: "string (required)",
            description: "string (optional)",
          },
          response: {
            id: "string",
            codeQuality: "object",
            issues: "array",
            improvements: "array",
          },
        },
        {
          method: "POST",
          path: "/api/assessments/technical-round",
          description: "Create technical round assessment",
          auth: true,
          body: {
            companyName: "string (required)",
            position: "string (required)",
            duration: "number (optional)",
          },
          response: {
            id: "string",
            sections: "array",
            status: "active",
          },
        },
      ],
    },

    aiServices: {
      name: "AI-Powered Services",
      routes: [
        {
          method: "POST",
          path: "/api/ai-services/concept-explainer",
          description: "Get AI explanation for a concept",
          auth: true,
          body: {
            concept: "string (required)",
            context: "string (optional)",
            depth: "beginner | intermediate | advanced (optional)",
          },
          response: {
            explanation: "object",
            relatedTopics: "array",
            resources: "array",
          },
        },
        {
          method: "POST",
          path: "/api/ai-services/answer-analysis",
          description: "Get AI analysis of an answer",
          auth: true,
          body: {
            question: "string (required)",
            userAnswer: "string (required)",
            expectedAnswer: "string (optional)",
            questionType: "string (optional)",
          },
          response: {
            scores: "object",
            feedback: "object",
            suggestions: "array",
          },
        },
        {
          method: "POST",
          path: "/api/ai-services/question-generator",
          description: "Generate interview questions for a topic",
          auth: true,
          body: {
            topic: "string (required)",
            difficulty: "easy | medium | hard (required)",
            interviewType: "technical | behavioral | hr (required)",
            count: "number (1-10, optional)",
          },
          response: {
            questions: "array",
            metadata: "object",
          },
        },
      ],
    },

    analytics: {
      name: "Analytics & Reporting",
      routes: [
        {
          method: "GET",
          path: "/api/analytics/user-progress",
          description: "Get user progress and analytics",
          auth: true,
          response: {
            summary: "object",
            monthlyProgress: "array",
            topicsProgress: "array",
            achievements: "array",
          },
        },
        {
          method: "POST",
          path: "/api/analytics/report-generator",
          description: "Generate comprehensive report",
          auth: true,
          body: {
            period: "weekly | monthly | quarterly (required)",
            format: "pdf | json | web (optional)",
          },
          response: {
            id: "string",
            reportData: "object",
            downloadUrl: "string",
            expiresAt: "ISO8601",
          },
        },
      ],
    },

    resources: {
      name: "Learning Resources",
      routes: [
        {
          method: "GET",
          path: "/api/resources/featured",
          description: "Get featured learning resources",
          auth: true,
          response: {
            featured: "array",
            byCategory: "array",
            trending: "array",
          },
        },
        {
          method: "GET",
          path: "/api/resources/bookmarks",
          description: "Get user's bookmarked resources",
          auth: true,
          response: {
            bookmarks: "array",
            categories: "object",
            totalBookmarks: "number",
          },
        },
        {
          method: "POST",
          path: "/api/resources/bookmark",
          description: "Bookmark a resource",
          auth: true,
          body: {
            resourceId: "string (required)",
            resourceTitle: "string (required)",
            category: "string (optional)",
          },
          response: {
            id: "string",
            resourceId: "string",
            bookmarkedAt: "ISO8601",
          },
        },
      ],
    },
  },

  // Standard Response Format
  responseFormat: {
    success: {
      example: {
        success: true,
        statusCode: 200,
        message: "Operation successful",
        data: {},
        timestamp: "2024-03-15T10:30:00Z",
      },
    },
    error: {
      example: {
        success: false,
        statusCode: 400,
        message: "Error message",
        timestamp: "2024-03-15T10:30:00Z",
        errors: {
          fieldName: "Error description",
        },
      },
    },
  },

  // HTTP Status Codes Used
  statusCodes: {
    200: "OK - Request successful",
    201: "Created - Resource created",
    400: "Bad Request - Validation error",
    401: "Unauthorized - Auth required",
    404: "Not Found - Resource not found",
    500: "Server Error",
  },

  // Authentication
  authentication: {
    method: "NextAuth.js with Google OAuth",
    required: true,
    setupRequired: true,
    headers: {
      Authorization: "Bearer token (optional, handled by NextAuth session)",
    },
  },

  // Rate Limiting (TODO)
  rateLimiting: {
    status: "Not yet implemented",
    plan: "To be added in next phase",
    suggestion: "Consider using next-rate-limit middleware",
  },

  // Database
  database: {
    engine: "MongoDB",
    models: [
      "User",
      "Interview",
      "Test",
      "Assessment",
      "Analytics",
      "Resource",
      "Bookmark",
      "ConceptExplanation",
      "AnswerAnalysis",
      "QuestionGenerator",
      "EarnedCoin",
      "Feedback",
      "Notification",
      "Transaction",
    ],
    connectionString: "process.env.MONGODB_URI",
  },

  // Environment Variables Required
  requiredEnv: [
    "NEXT_PUBLIC_API_URL",
    "MONGODB_URI",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "STRIPE_PUBLIC_KEY",
    "STRIPE_SECRET_KEY",
    "GOOGLE_GENERATIVE_AI_KEY",
  ],

  // TODO Items
  todoItems: [
    "✅ Create API routes - COMPLETED",
    "✅ Response handler utilities - COMPLETED",
    "✅ Auth middleware - COMPLETED",
    "✅ Frontend API client service - COMPLETED",
    "✅ Custom React hooks - COMPLETED",
    "✅ MongoDB models - COMPLETED",
    "⏳ Connect API handlers to MongoDB",
    "⏳ Implement Google Generative AI integration",
    "⏳ Add rate limiting",
    "⏳ Add comprehensive error logging",
    "⏳ Create test suite",
    "⏳ API documentation (Swagger/OpenAPI)",
    "⏳ Email notifications",
    "⏳ File upload handling",
    "⏳ PDF report generation",
  ],
};
