/**
 * Resource Model Schema
 * Stores learning resources and bookmarks
 */

import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: [
        "System Design",
        "Data Structures",
        "Algorithms",
        "JavaScript",
        "React",
        "Web Development",
        "HR Interview",
        "Behavioral",
        "Other",
      ],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    type: {
      type: String,
      enum: ["course", "article", "video", "book", "problem-set"],
      required: true,
    },
    duration: String, // "2 hours", "30 minutes"
    url: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    thumbnail: String,
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: String,
    isFreeContent: {
      type: Boolean,
      default: true,
    },
    content: String, // Markdown content for articles
  },
  {
    timestamps: true,
  }
);

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    resourceTitle: String,
    category: String,
    notes: String,
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "completed", "on-hold"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export { resourceSchema, bookmarkSchema };
