/**
 * POST /api/assessments/technical-round
 * Full technical round assessment
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
    const { companyName, position, duration } = body;

    // Validation
    const errors = {};
    if (!companyName?.trim()) errors.companyName = "Company name is required";
    if (!position?.trim()) errors.position = "Position is required";

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Create technical round
    const technicalRound = {
      id: `tech_${Date.now()}`,
      userId: session.user.id,
      companyName,
      position,
      duration: duration || 90,
      startTime: new Date(),
      status: "active",
      sections: [
        {
          name: "Coding Challenge",
          duration: 45,
          problems: 2,
          difficulty: "medium",
        },
        {
          name: "System Design",
          duration: 30,
          topics: ["API Design", "Database Design", "Scalability"],
        },
        {
          name: "Problem Solving",
          duration: 15,
          questions: ["Optimization", "Edge Cases"],
        },
      ],
      createdAt: new Date(),
    };

    // TODO: Save to MongoDB

    return successResponse(
      technicalRound,
      "Technical round created successfully",
      201
    );
  } catch (error) {
    console.error("Technical round error:", error);
    return errorResponse("Failed to create technical round", 500, error);
  }
}
