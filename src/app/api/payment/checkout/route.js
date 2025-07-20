// pages/api/checkout_sessions.js
import { getCurrentUserId } from "@/lib/getUserId";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const userId = await getCurrentUserId();
  console.log(userId);
  const { amount } = await req.json();
  if (req.method !== "POST") {
    Response.status(405).end("Method Not Allowed");
    return;
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"], // Google Pay works through card rails
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: "Orion AI Subscription" },
          unit_amount: amount, // INR in paisa
        },
        quantity: 1,
      },
    ],
    // ✅ Add these two:
    metadata: {
      plan: "pro", // 👈 pass your actual plan here
      userId: userId, // 👈 pass logged in user’s ID!
    },
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
  });

  return Response.json({ url: session.url });
}
