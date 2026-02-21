/**
 * AI Service Responses Model Schema
 * Stores AI-generated content, explanations, and analysis
 */

import mongoose from "mongoose";

const conceptExplanationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    concept: {
      type: String,
      required: true,
    },
    depth: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    explanation: {
      definition: String,
      keyPoints: [String],
      example: {
        code: String,
        language: String,
        output: String,
      },
      commonMistakes: [String],
      realWorldApplications: [String],
    },
    relatedTopics: [String],
    resources: [
      {
        title: String,
        type: String,
        url: String,
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    notHelpful: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const answerAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: String,
      required: true,
    },
    userAnswer: String,
    expectedAnswer: String,
    questionType: {
      type: String,
      enum: ["mcq", "open-ended", "coding", "design"],
      default: "open-ended",
    },
    scores: {
      accuracy: {
        type: Number,
        min: 0,
        max: 10,
      },
      completeness: {
        type: Number,
        min: 0,
        max: 10,
      },
      clarity: {
        type: Number,
        min: 0,
        max: 10,
      },
      relevance: {
        type: Number,
        min: 0,
        max: 10,
      },
      overall: {
        type: Number,
        min: 0,
        max: 10,
      },
    },
    feedback: {
      correct: [String],
      improvements: [String],
      suggestions: [
        {
          area: String,
          suggestion: String,
          impact: String,
        },
      ],
    },
    comparisonResult: {
      similarity: Number,
      missedPoints: [String],
      extraPoints: [String],
    },
  },
  {
    timestamps: true,
  }
);

const questionGeneratorSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["technical", "behavioral", "hr"],
      required: true,
    },
    questions: [
      {
        id: String,
        question: String,
        type: {
          type: String,
          enum: ["open-ended", "mcq", "coding", "design"],
        },
        hints: [String],
        followUpQuestions: [String],
        estimatedTime: Number,
        codeTemplate: String,
      },
    ],
    metadata: {
      sourceQualityScore: Number,
      relevanceScore: Number,
      difficulty_distribution: Object,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export {
  conceptExplanationSchema,
  answerAnalysisSchema,
  questionGeneratorSchema,
};
