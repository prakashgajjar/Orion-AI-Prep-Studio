/**
 * GET /api/resources/featured
 * Get featured learning resources
 */

import { successResponse, errorResponse } from "@/utils/api/responseHandler";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return errorResponse("Unauthorized", 401);
    }

    const resources = {
      userId: session.user.id,
      fetchedAt: new Date(),
      featured: [
        {
          id: "res_1",
          title: "System Design Interview Guide",
          description: "Master system design patterns and best practices",
          category: "System Design",
          difficulty: "advanced",
          duration: "4 hours",
          rating: 4.8,
          views: 5420,
          type: "course",
          tags: ["system-design", "interview-prep"],
          thumbnail: "/resources/system-design.jpg",
        },
        {
          id: "res_2",
          title: "Data Structures Deep Dive",
          description: "Complete guide to data structures in interviews",
          category: "Data Structures",
          difficulty: "intermediate",
          duration: "3 hours",
          rating: 4.9,
          views: 8320,
          type: "course",
          tags: ["data-structures", "algorithms"],
          thumbnail: "/resources/data-structures.jpg",
        },
        {
          id: "res_3",
          title: "Behavioral Interview Mastery",
          description: "Ace your behavioral interviews with confidence",
          category: "HR Interviews",
          difficulty: "beginner",
          duration: "2 hours",
          rating: 4.7,
          views: 3210,
          type: "course",
          tags: ["behavioral", "hr-interview"],
          thumbnail: "/resources/behavioral.jpg",
        },
      ],
      byCategory: [
        {
          category: "JavaScript",
          count: 32,
          resources: [
            {
              id: "res_4",
              title: "Advanced JS Patterns",
              type: "article",
              difficulty: "advanced",
            },
          ],
        },
        {
          category: "React",
          count: 28,
          resources: [
            {
              id: "res_5",
              title: "React Hooks Deep Dive",
              type: "video",
              difficulty: "intermediate",
            },
          ],
        },
      ],
      trending: [
        { id: "res_6", title: "AI/ML Interview Prep", views: 1200 },
        { id: "res_7", title: "Web Performance Optimization", views: 980 },
      ],
    };

    return successResponse(resources, "Resources fetched successfully");
  } catch (error) {
    console.error("Resources fetch error:", error);
    return errorResponse("Failed to fetch resources", 500, error);
  }
}
