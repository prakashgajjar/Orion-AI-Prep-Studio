/**
 * POST /api/interviews/submit-answer
 * Submit interview answer and get AI feedback
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
    const { sessionId, questionNumber, answer, audioDuration } = body;

    // Validation
    const errors = {};
    if (!sessionId?.trim()) errors.sessionId = "Session ID is required";
    if (!answer?.trim()) errors.answer = "Answer cannot be empty";
    if (questionNumber === undefined) errors.questionNumber = "Question number is required";

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Generate AI Feedback
    const feedback = {
      contentScore: 7.5, // 0-10
      clarityScore: 8.0, // 0-10
      confidenceScore: 7.8, // 0-10
      overallScore: 7.8, // 0-10
      strengths: [
        "Clear explanation of concepts",
        "Good use of examples",
        "Demonstrates practical knowledge",
      ],
      improvements: [
        "Could provide more detailed technical specifics",
        "Consider mentioning edge cases",
      ],
      aiComments: "Good response with clear communication. Focus on technical depth.",
      emotionalFeedback: {
        confidence: "high",
        clarity: "clear",
        engagement: "good",
      },
    };

    // Save to database
    const submission = {
      sessionId,
      questionNumber,
      answer,
      audioDuration: audioDuration || 0,
      feedback,
      submittedAt: new Date(),
      userId: session.user.id,
    };

    // TODO: Save to MongoDB

    return successResponse(
      submission,
      "Answer submitted and analyzed successfully",
      201
    );
  } catch (error) {
    console.error("Submit answer error:", error);
    return errorResponse("Failed to submit answer", 500, error);
  }
}
