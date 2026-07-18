import mongoose from "mongoose";

const earnedCoinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
  { timestamps: true }
);

export default mongoose.models.EarnedCoin ||
  mongoose.model("EarnedCoin", earnedCoinSchema);