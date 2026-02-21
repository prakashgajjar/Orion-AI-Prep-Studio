/**
 * MongoDB Models Configuration
 * Centralized place to define and export all Mongoose models
 */

import mongoose from "mongoose";
import userSchema from "./userSchema.models.js";
import interviewSchema from "./interviewSchema.models.js";
import testSchema from "./quetionSchema.models.js"; // Note: existing file has typo "quetionSchema"
import assessmentSchema from "./assessmentSchema.models.js";
import analyticsSchema from "./analyticsSchema.models.js";
import { resourceSchema, bookmarkSchema } from "./resourceSchema.models.js";
import {
  conceptExplanationSchema,
  answerAnalysisSchema,
  questionGeneratorSchema,
} from "./aiServiceSchema.models.js";
import earnedCoinSchema from "./earnedCoinSchema.models.js";
import feedbackSchema from "./feedbackSchema.models.js";
import notificationSchema from "./notificationSchema.models.js";
import transactionScehma from "./transactionScehma.models.js";

// Define models if not already defined
const models = {};

const defineModel = (modelName, schema) => {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  return mongoose.model(modelName, schema);
};

// Initialize all models
const User = defineModel("User", userSchema);
const Interview = defineModel("Interview", interviewSchema);
const Test = defineModel("Test", testSchema);
const Assessment = defineModel("Assessment", assessmentSchema);
const Analytics = defineModel("Analytics", analyticsSchema);
const Resource = defineModel("Resource", resourceSchema);
const Bookmark = defineModel("Bookmark", bookmarkSchema);
const ConceptExplanation = defineModel(
  "ConceptExplanation",
  conceptExplanationSchema
);
const AnswerAnalysis = defineModel("AnswerAnalysis", answerAnalysisSchema);
const QuestionGenerator = defineModel(
  "QuestionGenerator",
  questionGeneratorSchema
);
const EarnedCoin = defineModel("EarnedCoin", earnedCoinSchema);
const Feedback = defineModel("Feedback", feedbackSchema);
const Notification = defineModel("Notification", notificationSchema);
const Transaction = defineModel("Transaction", transactionScehma);

export {
  User,
  Interview,
  Test,
  Assessment,
  Analytics,
  Resource,
  Bookmark,
  ConceptExplanation,
  AnswerAnalysis,
  QuestionGenerator,
  EarnedCoin,
  Feedback,
  Notification,
  Transaction,
};

export default {
  User,
  Interview,
  Test,
  Assessment,
  Analytics,
  Resource,
  Bookmark,
  ConceptExplanation,
  AnswerAnalysis,
  QuestionGenerator,
  EarnedCoin,
  Feedback,
  Notification,
  Transaction,
};
