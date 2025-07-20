// components/BuyButton.tsx
"use client";

import { loadStripe } from "@stripe/stripe-js";

export default function BuyButton({ text, amount , plan }) {
  const handleCheckout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const res = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        plan : plan
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-full font-semibold hover:bg-indigo-100"
    >
      {text}
    </button>
  );
}
