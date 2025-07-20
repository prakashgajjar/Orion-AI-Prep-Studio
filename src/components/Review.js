"use client";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    text: `"We've reduced our time-to-hire by 42% and improved the quality of our hires significantly. The AI matching has been spot on with finding candidates that fit our culture."`,
    name: "Emily Richardson",
    role: "HR Director, TechGrowth Inc.",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
  },
  {
    text: `"As a fast-growing startup, we needed to scale our team quickly without compromising quality. This platform has been a game-changer."`,
    name: "David Nguyen",
    role: "CEO, Innovate Lab",
    img: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    text: `"The bias-free evaluation has helped us build a more diverse team, contributing to our innovation and growth."`,
    name: "Sarah Johnson",
    role: "Talent Acquisition Manager, Global Corp",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function ReviewSlider() {
  return (
    <div className="overflow-hidden py-12 bg-black/80 backdrop-blur-lg">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-400 drop-shadow">
    See It In Action
  </h2>
  <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">
    Watch how our AI-powered platform transforms the hiring process from start to finish.
  </p>

  <div className="relative w-full">
    <div className="flex w-max animate-slide space-x-8">
      {Array(3)
        .fill(testimonials)
        .flat()
        .map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-gray-700 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-green-500/20 hover:border-green-400 p-6 flex-shrink-0 w-[300px] h-[300px] sm:w-[460px] sm:h-[320px] transition-all duration-300"
          >
            <p className="text-yellow-400 text-xl mb-2">★★★★★</p>
            <p className="text-gray-300 italic line-clamp-4 overflow-ellipsis mb-4">
              “{testimonial.text}”
            </p>
            <div className="flex items-center">
              <Image
                src={testimonial.img}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                width={48}
                height={48}
              />
              <div>
                <p className="font-bold text-green-300">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>

  );
}
