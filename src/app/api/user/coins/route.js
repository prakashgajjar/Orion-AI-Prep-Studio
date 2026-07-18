import { STATUS } from "@/lib/status";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/configs/db.config";
import User from "@/models/userSchema.models";
import EarnedCoin from "@/models/earnedCoinSchema.models";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: STATUS.UNAUTHORIZED });
    }

    await connectDB();

    const user = await User.findById(session.user.id).populate({
      path: "earnedCoins",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: STATUS.NOT_FOUND });
    }

    return Response.json(
      { coins: user.coins, history: user.earnedCoins },
      { status: STATUS.OK }
    );
  } catch (error) {
    console.error("GET /api/user/coins Error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: STATUS.UNAUTHORIZED });
    }

    const { amount, reason, source } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return Response.json(
        { error: "Invalid amount. Must be a positive number." },
        { status: STATUS.BAD_REQUEST }
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: STATUS.NOT_FOUND });
    }

    // Create a new EarnedCoin record
    const earnedCoin = await EarnedCoin.create({
      user: user._id,
      amount,
      reason: reason || "Reward",
      source: source || "System",
    });

    // Update user balance and history
    user.coins += amount;
    user.earnedCoins.push(earnedCoin._id);
    await user.save();

    return Response.json(
      {
        message: "Coins awarded successfully",
        coins: user.coins,
        awarded: amount,
      },
      { status: STATUS.OK }
    );
  } catch (error) {
    console.error("POST /api/user/coins Error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
