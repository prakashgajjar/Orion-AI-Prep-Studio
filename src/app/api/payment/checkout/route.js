// pages/api/checkout_sessions.js
import { getCurrentUserId } from "@/lib/getUserId";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const userId = await getCurrentUserId();
  console.log("Stripe Checkout Request for User ID:", userId);
  
  const { amount, plan } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"], // Google Pay works through card rails
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: `Orion AI ${plan ? plan.toUpperCase() : "Pro"} Plan Subscription` },
          unit_amount: amount, // INR in paisa
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: plan || "pro",
      userId: userId,
    },
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
  });

  return Response.json({ url: session.url });
}
