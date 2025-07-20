import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic auth/profile
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String, // profile picture URL
    },

    authProvider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Coins and earnings
    coins: {
      type: Number,
      default: 0,
    },

    earnedCoins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "EarnedCoin"
    }], // full log of earned coins

    // Subscription / billing
    subscription: {
      plan: {
        type: String,
        enum: ["free", "basic", "pro", "enterprise"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "canceled"],
        default: "inactive",
      },
      expiresAt: {
        type: Date,
      },
    },

    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],

    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],

    // Friends list (social graph)
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Account status
    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },

    // Settings
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      language: {
        type: String,
        default: "en",
      },
    },
  },
  { timestamps: true }
);

// Virtual relationship: Interviews
userSchema.virtual("interviews", {
  ref: "Interview",
  localField: "_id",
  foreignField: "user",
});

// Virtual relationship: Tests
userSchema.virtual("tests", {
  ref: "Test",
  localField: "_id",
  foreignField: "user",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);