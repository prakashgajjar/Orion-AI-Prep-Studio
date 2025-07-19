"use client";

import React, { useState } from "react";

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <section className="bg-[#f8f9fc] py-20 px-6 text-center">
<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
  Pick the Perfect Plan for Your AI Journey
</h2>
<p className="text-gray-500 max-w-xl mx-auto mb-8">
  Orion AI offers flexible plans for students, professionals and teams
  to supercharge learning, prepare for interviews, and level up your skills.
</p>


      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-12 gap-4">
        <span
          className={`cursor-pointer ${
            billingCycle === "monthly"
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </span>
        <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
          <div
            className={`w-6 h-6 bg-indigo-600 rounded-full absolute top-0 transition-all ${
              billingCycle === "monthly" ? "left-0" : "left-6 -translate-x-full"
            }`}
            onClick={() =>
              setBillingCycle(
                billingCycle === "monthly" ? "yearly" : "monthly"
              )
            }
          ></div>
        </div>
        <span
          className={`cursor-pointer ${
            billingCycle === "yearly"
              ? "text-indigo-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly <span className="text-indigo-600">-Up To 50% OFF</span>
        </span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border hover:scale-105 transition">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4">
            Basic Plan
          </h3>
          <p className="text-4xl font-bold mb-2">
            ₹{billingCycle === "monthly" ? "19" : "9"}
            <span className="text-lg font-medium text-gray-500">/month</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            For startups and small businesses
          </p>
          <ul className="text-left mb-8 space-y-3">
            <li>✔ Resume screening</li>
            <li>✔ Automated interview scheduling</li>
            <li>✔ Virtual interviews</li>
            <li>✔ AI Video Score Analytics</li>
          </ul>
          <button className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-full font-semibold hover:bg-indigo-100">
            Choose Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white border hover:scale-105 transition">
          <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
          <p className="text-4xl font-bold mb-2">
            ₹{billingCycle === "monthly" ? "29" : "18"}
            <span className="text-lg font-medium text-gray-200">/month</span>
          </p>
          <p className="text-sm mb-6">For growing companies</p>
          <ul className="text-left mb-8 space-y-3">
            <li>✔ All Basic Plan Features</li>
            <li>✔ Customizable assessments</li>
            <li>✔ Comprehensive analytics</li>
            <li>✔ Interview Report Analytics</li>
          </ul>
          <button className="w-full bg-white text-indigo-600 py-3 rounded-full font-semibold hover:bg-gray-100">
            Choose and Get 38% OFF
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border hover:scale-105 transition">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4">
            Enterprise Plan
          </h3>
          <p className="text-4xl font-bold mb-2">
            ₹{billingCycle === "monthly" ? "36" : "22"}
            <span className="text-lg font-medium text-gray-500">/month</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">For large organizations</p>
          <ul className="text-left mb-8 space-y-3">
            <li>✔ All Pro Plan Features</li>
            <li>✔ Advanced customizations</li>
            <li>✔ Dedicated support</li>
            <li>✔ Advanced integrations</li>
          </ul>
          <button className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-full font-semibold hover:bg-indigo-100">
            Choose Plan
          </button>
        </div>
      </div>
    </section>
  );
}
