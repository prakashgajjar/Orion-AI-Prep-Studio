import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    answerText: {
      type: String,
    },
    isCorrect: {
      type: Boolean,
      default: null,
    },
    feedback: {
      type: String,
    },
    askedAt: {
      type: Date,
      default: Date.now,
    },
    answeredAt: {
      type: Date,
    },
  },
  { _id: false }
);

export default mongoose.models.Question || mongoose.model("Question", questionSchema);