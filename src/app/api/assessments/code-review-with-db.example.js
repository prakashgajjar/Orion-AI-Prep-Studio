/**
 * Example API Route with MongoDB Integration
 * This is a template showing how to properly integrate MongoDB into API routes
 */

import { successResponse, errorResponse, validationError } from "@/utils/api/responseHandler";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/db";
import { Assessment } from "@/models";

/**
 * POST /api/assessments/code-review
 * Create code review assessment with database persistence
 */
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Check authentication
    const session = await getServerSession();
    if (!session || !session.user) {
      return errorResponse("Unauthorized", 401);
    }

    // Parse request body
    const body = await req.json();
    const { code, language, description } = body;

    // Validation
    const errors = {};
    if (!code?.trim()) errors.code = "Code is required";
    if (!language?.trim()) errors.language = "Programming language is required";

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Create assessment document
    const assessment = new Assessment({
      userId: session.user.id,
      type: "code-review",
      title: `Code Review - ${language}`,
      description: description || "Code review assessment",
      code,
      language,
      scores: {
        readability: 7.5,
        efficiency: 7,
        bestPractices: 7,
        testCoverage: 6,
        overall: 7.1,
      },
      issues: [
        {
          severity: "medium",
          line: 5,
          issue: "Function name should be camelCase",
          suggestion: "Rename to `calculateSum`",
        },
      ],
      improvements: [
        "Add error handling for edge cases",
        "Consider using async/await",
      ],
      status: "completed",
      difficulty: "intermediate",
      completedAt: new Date(),
    });

    // Save to database
    const savedAssessment = await assessment.save();

    // Return success response
    return successResponse(
      savedAssessment,
      "Code review completed successfully",
      201
    );
  } catch (error) {
    console.error("Code review error:", error);
    return errorResponse("Failed to complete code review", 500, error);
  }
}
