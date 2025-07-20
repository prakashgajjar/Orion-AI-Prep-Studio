import mongoose from "mongoose";

const earnedCoinSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
    },
    source: {
      type: String, // e.g., "referral", "completed interview", "bonus"
    },
    earnedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

export default mongoose.models.EarnedCoin ||
  mongoose.model("EarnedCoin", earnedCoinSchema);