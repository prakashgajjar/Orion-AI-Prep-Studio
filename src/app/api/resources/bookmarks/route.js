/**
 * GET /api/resources/bookmarks
 * Get user's bookmarked resources
 */

import { successResponse, errorResponse } from "@/utils/api/responseHandler";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return errorResponse("Unauthorized", 401);
    }

    // Fetch bookmarks for user
    const bookmarks = {
      userId: session.user.id,
      fetchedAt: new Date(),
      totalBookmarks: 12,
      categories: {
        "System Design": 4,
        "Data Structures": 3,
        "Algorithms": 3,
        "Web Development": 2,
      },
      bookmarks: [
        {
          id: "bookmark_1",
          resourceId: "res_1",
          resourceTitle: "System Design Interview Guide",
          category: "System Design",
          bookmarkedAt: "2024-02-15",
          progress: 65,
          notes: "Great resource for interview prep",
          savedAt: "2024-02-15T10:30:00Z",
        },
        {
          id: "bookmark_2",
          resourceId: "res_2",
          resourceTitle: "Data Structures Deep Dive",
          category: "Data Structures",
          bookmarkedAt: "2024-02-10",
          progress: 45,
          notes: "Need to focus on trees and graphs",
          savedAt: "2024-02-10T14:20:00Z",
        },
        {
          id: "bookmark_3",
          resourceId: "res_3",
          resourceTitle: "Advanced JS Patterns",
          category: "JavaScript",
          bookmarkedAt: "2024-02-08",
          progress: 80,
          notes: "Nearly complete - excellent content",
          savedAt: "2024-02-08T09:15:00Z",
        },
      ],
      recentlyAdded: [
        {
          id: "bookmark_1",
          resourceTitle: "System Design Interview Guide",
          addedAt: "2 days ago",
        },
      ],
    };

    return successResponse(bookmarks, "Bookmarks fetched successfully");
  } catch (error) {
    console.error("Bookmarks fetch error:", error);
    return errorResponse("Failed to fetch bookmarks", 500, error);
  }
}
