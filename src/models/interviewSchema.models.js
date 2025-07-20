import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["one-to-one", "multi-to-one"],
      default: "one-to-one",
    },
    aiModel: {
      type: String,
      default: "Gemini 2.5 Pro",
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "canceled"],
      default: "in-progress",
    },
    score: {
      type: Number,
    },
    coinsUsed: {
      type: Number,
      default: 0,
    },
    durationMinutes: {
      type: Number,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    }],
    aiSummary: {
      type: String, // Overall AI summary/feedback for the session
    },
    transcript: {
      type: [String], // Optional: Full transcript log if it's voice/text chat
    },
    videoRecordingUrl: {
      type: String, // Optional: store link to a recorded session
    },
  },
  { timestamps: true }
);

export default mongoose.models.Interview ||
  mongoose.model("Interview", interviewSchema);