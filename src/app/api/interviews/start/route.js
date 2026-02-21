/**
 * POST /api/interviews/start
 * Start a new interview session
 */

import { successResponse, errorResponse, validationError } from "@/utils/api/responseHandler";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await req.json();
    const { jobTitle, interviewType, difficulty, duration } = body;

    // Validation
    const errors = {};
    if (!jobTitle?.trim()) errors.jobTitle = "Job title is required";
    if (!interviewType?.trim()) errors.interviewType = "Interview type is required";
    if (!["technical", "hr", "behavioral"].includes(interviewType)) {
      errors.interviewType = "Invalid interview type";
    }
    if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
      errors.difficulty = "Invalid difficulty level";
    }

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Generate interview session
    const interviewSession = {
      id: `interview_${Date.now()}`,
      userId: session.user.id,
      jobTitle,
      interviewType,
      difficulty,
      duration: duration || 30, // minutes
      startTime: new Date(),
      status: "active",
      questions: [],
      score: 0,
    };

    // TODO: Save to MongoDB

    return successResponse(
      interviewSession,
      "Interview session started successfully",
      201
    );
  } catch (error) {
    console.error("Interview start error:", error);
    return errorResponse("Failed to start interview", 500, error);
  }
}
