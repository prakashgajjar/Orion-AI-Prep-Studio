/**
 * Authentication Middleware
 */

import { getServerSession } from "next-auth/next";
import { unauthorizedResponse } from "@/utils/api/responseHandler";

export async function withAuth(handler) {
  return async (req, ...args) => {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    // Attach user to request
    req.user = session.user;
    
    return handler(req, ...args);
  };
}

export async function getAuthSession() {
  return await getServerSession();
}
