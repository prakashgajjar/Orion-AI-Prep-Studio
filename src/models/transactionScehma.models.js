import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: Number,
    currency: {
      type: String,
      default: "INR",
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    method: {
      type: String, // e.g. "stripe", "razorpay", "wallet"
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    details: mongoose.Schema.Types.Mixed, // store raw gateway data
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
