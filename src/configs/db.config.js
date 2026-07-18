import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  // Already fully connected
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  // If in a broken/disconnecting state, reset
  if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 3) {
    try { await mongoose.disconnect(); } catch {}
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not set in environment variables.");

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB:", uri.split("@").pop() || uri);
  } catch (error) {
    isConnected = false;
    console.error("❌ Error connecting to MongoDB:", error.message);
    throw error; // Let callers handle the failure
  }
};

export default connectDB;
