/**
 * POST /api/resources/bookmark
 * Bookmark a learning resource
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
    const { resourceId, resourceTitle, category } = body;

    // Validation
    const errors = {};
    if (!resourceId?.trim()) errors.resourceId = "Resource ID is required";
    if (!resourceTitle?.trim()) errors.resourceTitle = "Resource title is required";

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Create bookmark
    const bookmark = {
      id: `bookmark_${Date.now()}`,
      userId: session.user.id,
      resourceId,
      resourceTitle,
      category: category || "Uncategorized",
      bookmarkedAt: new Date(),
      status: "active",
      notes: "",
      progress: 0,
    };

    // TODO: Save to MongoDB

    return successResponse(bookmark, "Resource bookmarked successfully", 201);
  } catch (error) {
    console.error("Bookmark error:", error);
    return errorResponse("Failed to bookmark resource", 500, error);
  }
}
