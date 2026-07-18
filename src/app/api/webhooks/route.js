import Stripe from "stripe";
import connectDB from "@/configs/db.config";
import User from "@/models/userSchema.models";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let body;
  try {
    body = await req.text();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to read request body" }), { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Stripe Checkout Completed:", session);

    await connectDB();

    // Find your user by email from customer details or fallback session email
    const email = session.customer_details?.email || session.customer_email;
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        user.subscription = user.subscription || {};
        user.subscription.plan = session.metadata?.plan || "pro";
        user.subscription.status = "active";
        await user.save();
        console.log(`User ${email} subscription updated successfully.`);
      } else {
        console.warn(`User with email ${email} not found.`);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

