/**
 * Assessment Model Schema
 * Stores code reviews and technical assessments
 */

import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["code-review", "technical-round", "aptitude"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    code: String, // For code reviews
    language: String,
    scores: {
      readability: Number,
      efficiency: Number,
      bestPractices: Number,
      testCoverage: Number,
      overall: {
        type: Number,
        min: 0,
        max: 10,
      },
    },
    issues: [
      {
        severity: {
          type: String,
          enum: ["low", "medium", "high", "critical"],
        },
        line: Number,
        issue: String,
        suggestion: String,
      },
    ],
    improvements: [String],
    status: {
      type: String,
      enum: ["pending", "completed", "in-progress"],
      default: "pending",
    },
    duration: Number, // in minutes
    completedAt: Date,
    companyName: String,
    position: String,
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
  },
  {
    timestamps: true,
  }
);

export default assessmentSchema;
