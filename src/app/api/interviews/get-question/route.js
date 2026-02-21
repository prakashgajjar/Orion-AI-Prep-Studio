/**
 * POST /api/interviews/get-question
 * Get the next interview question with AI
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
    const { sessionId, jobTitle, interviewType, difficulty } = body;

    // Validation
    const errors = {};
    if (!sessionId?.trim()) errors.sessionId = "Session ID is required";
    if (!jobTitle?.trim()) errors.jobTitle = "Job title is required";

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    // Generate AI question based on category
    const questionTemplates = {
      technical: [
        `Explain how you would design a ${jobTitle.toLowerCase()} system?`,
        `What are the key challenges in ${jobTitle.toLowerCase()} development?`,
        `How would you optimize performance in a ${jobTitle.toLowerCase()} project?`,
        `Walk me through your approach to debugging in ${jobTitle.toLowerCase()}.`,
        `Describe your experience with testing in ${jobTitle.toLowerCase()}.`,
      ],
      hr: [
        "Tell me about yourself and your professional background.",
        "What are your strengths and weaknesses?",
        "Why are you interested in this position?",
        "Describe a time you overcame a challenge at work.",
        "How do you handle working in a team?",
      ],
      behavioral: [
        "Give an example of when you had to make a difficult decision quickly.",
        "Tell me about a time you failed and what you learned.",
        "Describe your approach to handling conflict with team members.",
        "Share an example where you went above and beyond.",
        "How do you prioritize tasks when everything seems urgent?",
      ],
    };

    const questions = questionTemplates[interviewType] || questionTemplates.technical;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    return successResponse(
      {
        sessionId,
        question: randomQuestion,
        questionNumber: 1,
        totalQuestions: 5,
        timeLimit: 120, // seconds
        followUpAllowed: true,
      },
      "Question retrieved successfully"
    );
  } catch (error) {
    console.error("Get question error:", error);
    return errorResponse("Failed to get question", 500, error);
  }
}
