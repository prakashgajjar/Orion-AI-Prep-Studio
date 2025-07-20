"use client";

import React, { useState } from "react";
import BuyButton from "@/components/BuyButton";

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const prices = {
    basic: {
      monthly: 19,
      yearly: 45,
    },
    pro: {
      monthly: 29,
      yearly: 60,
    },
    enterprise: {
      monthly: 36,
      yearly: 66,
    },
  };

  const getPrice = (plan) =>
    billingCycle === "monthly" ? prices[plan].monthly : prices[plan].yearly;

  const getDisplayPrice = (plan) =>
    billingCycle === "monthly"
      ? `${prices[plan].monthly}/month`
      : `${prices[plan].yearly} /year (₹${Math.round(
          prices[plan].yearly / 12
        )}/month)`;

  return (
    <section className="bg-black/80 backdrop-blur-md py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4 drop-shadow">
        Pick the Perfect Plan for Your AI Journey
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto mb-8">
        greetAI offers flexible plans for students, professionals and teams to
        supercharge learning, prepare for interviews, and level up your skills.
      </p>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-12 gap-4">
        <span
          className={`cursor-pointer ${
            billingCycle === "monthly"
              ? "text-green-400 font-semibold"
              : "text-gray-400"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </span>
        <div
          className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer"
          onClick={() =>
            setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
          }
        >
          <div
            className={`w-6 h-6 bg-green-500 rounded-full absolute top-0 transition-all ${
              billingCycle === "monthly" ? "left-0" : "left-6 -translate-x-full"
            }`}
          ></div>
        </div>
        <span
          className={`cursor-pointer ${
            billingCycle === "yearly"
              ? "text-green-400 font-semibold"
              : "text-gray-400"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly <span className="text-green-400">- Up To 50% OFF</span>
        </span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-white/5 border border-gray-700 backdrop-blur-lg rounded-2xl shadow-lg p-8 hover:scale-105 hover:shadow-green-500/20 hover:border-green-400 transition">
          <h3 className="text-2xl font-semibold text-green-300 mb-4">
            Basic Plan
          </h3>
          <p className="text-4xl font-bold text-white mb-2">
            ₹{getDisplayPrice("basic")}
          </p>
          <p className="text-sm text-gray-400 mb-6">
            For startups and small businesses
          </p>
          <ul className="text-left text-gray-300 mb-8 space-y-3">
            <li>✔ Resume screening</li>
            <li>✔ Automated interview scheduling</li>
            <li>✔ Virtual interviews</li>
            <li>✔ AI Video Score Analytics</li>
          </ul>
          <BuyButton
            text="Buy Now"
            amount={getPrice("basic") * 100}
            plan="basic"
          />
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white border hover:scale-105 hover:shadow-green-500/20 transition">
          <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
          <p className="text-4xl font-bold mb-2">
            ₹{getDisplayPrice("pro")}
          </p>
          <p className="text-sm mb-6">For growing companies</p>
          <ul className="text-left mb-8 space-y-3">
            <li>✔ All Basic Plan Features</li>
            <li>✔ Customizable assessments</li>
            <li>✔ Comprehensive analytics</li>
            <li>✔ Interview Report Analytics</li>
          </ul>
          <BuyButton
            text="Choose and Get 38% OFF"
            amount={getPrice("pro") * 100}
            plan="pro"
          />
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white/5 border border-gray-700 backdrop-blur-lg rounded-2xl shadow-lg p-8 hover:scale-105 hover:shadow-green-500/20 hover:border-green-400 transition">
          <h3 className="text-2xl font-semibold text-green-300 mb-4">
            Enterprise Plan
          </h3>
          <p className="text-4xl font-bold text-white mb-2">
            ₹{getDisplayPrice("enterprise")}
          </p>
          <p className="text-sm text-gray-400 mb-6">
            For large organizations
          </p>
          <ul className="text-left text-gray-300 mb-8 space-y-3">
            <li>✔ All Pro Plan Features</li>
            <li>✔ Advanced customizations</li>
            <li>✔ Dedicated support</li>
            <li>✔ Advanced integrations</li>
          </ul>
          <BuyButton
            text="Choose Plan"
            amount={getPrice("enterprise") * 100}
            plan="enterprise"
          />
        </div>
      </div>
    </section>
  );
}
