/**
 * POST /api/tests/generate
 * Generate AI-powered test/assessment
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
    const { subject, topic, difficulty, numberOfQuestions } = body;

    // Validation
    const errors = {};
    if (!subject?.trim()) errors.subject = "Subject is required";
    if (!topic?.trim()) errors.topic = "Topic is required";
    if (!["easy", "medium", "hard"].includes(difficulty)) {
      errors.difficulty = "Invalid difficulty level";
    }
    if (!numberOfQuestions || numberOfQuestions < 1 || numberOfQuestions > 50) {
      errors.numberOfQuestions = "Number of questions must be between 1 and 50";
    }

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Generate test
    const test = {
      id: `test_${Date.now()}`,
      userId: session.user.id,
      subject,
      topic,
      difficulty,
      numberOfQuestions: parseInt(numberOfQuestions),
      createdAt: new Date(),
      status: "active",
      questions: Array.from({ length: numberOfQuestions }, (_, i) => ({
        id: `q${i + 1}`,
        question: `${subject} - ${topic} Question ${i + 1}`,
        type: ["mcq", "shortAnswer", "essay"][Math.floor(Math.random() * 3)],
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        difficulty,
      })),
      timeLimit: numberOfQuestions * 2, // 2 minutes per question
      passingScore: 60,
    };

    // TODO: Save to MongoDB

    return successResponse(test, "Test generated successfully", 201);
  } catch (error) {
    console.error("Test generation error:", error);
    return errorResponse("Failed to generate test", 500, error);
  }
}
