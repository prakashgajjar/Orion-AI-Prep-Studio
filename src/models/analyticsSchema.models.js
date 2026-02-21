/**
 * Analytics Model Schema
 * Stores user performance metrics and reports
 */

import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    period: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quarterly"],
      default: "monthly",
    },
    metrics: {
      totalInterviews: {
        type: Number,
        default: 0,
      },
      totalTests: {
        type: Number,
        default: 0,
      },
      totalAssessments: {
        type: Number,
        default: 0,
      },
      averageInterviewScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      averageTestScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      improvementPercentage: Number,
      streakDays: {
        type: Number,
        default: 0,
      },
    },
    topicsProgress: [
      {
        topic: String,
        level: {
          type: Number,
          min: 0,
          max: 100,
        },
        lastPracticed: Date,
        practiceCount: {
          type: Number,
          default: 0,
        },
      },
    ],
    weakAreas: [
      {
        topic: String,
        score: Number,
        recommendation: String,
      },
    ],
    achievements: [
      {
        title: String,
        unlockedAt: Date,
        badge: String,
      },
    ],
    monthlyBreakdown: [
      {
        month: String,
        interviews: Number,
        tests: Number,
        avgScore: Number,
      },
    ],
    report: {
      generatedAt: Date,
      format: {
        type: String,
        enum: ["pdf", "json", "web"],
      },
      url: String,
      expiresAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default analyticsSchema;
