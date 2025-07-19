"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";


const Navbar = () => {
  const [showAI, setShowAI] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const aiRef = useRef(null);
  const resourcesRef = useRef(null);
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aiRef.current &&
        !aiRef.current.contains(event.target) &&
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target)
      ) {
        setShowAI(false);
        setShowResources(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1700px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Orion AI
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-800">
          <li className="relative" ref={aiRef}>
            <button
              onClick={() => setShowAI(!showAI)}
              className="hover:text-indigo-600 transition"
            >
              Services ▼
            </button>
            {showAI && (
              <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-64 z-20">
                {[
                  "AI Test Generator",
                  "PDF-based Q&A",
                  "Code Review",
                  "AI Guidance",
                  "Challenge Mode",
                  "Full Interview",
                  "HR Round",
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="block px-5 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="hover:text-indigo-600 transition">
              General Talk
            </Link>
          </li>

          <li className="relative" ref={resourcesRef}>
            <button
              onClick={() => setShowResources(!showResources)}
              className="hover:text-indigo-600 transition"
            >
              Resources ▼
            </button>
            {showResources && (
              <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-52 z-20">
                {["GATE", "1st Year", "2nd Year", "3rd Year", "4th Year"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="block px-5 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="hover:text-indigo-600 transition">
              Coin System
            </Link>
          </li>
        </ul>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                />
                <span className="text-sm">{session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow text-sm font-semibold mt-2"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow text-sm font-semibold mt-2"
              >
                Log in
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-black">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6">
          <ul className="space-y-4 text-gray-800 font-medium">
            <li>
              <Link href="#" className="block">
                General Talk
              </Link>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer">Services</summary>
                <ul className="ml-4 mt-2 space-y-2">
                  {[
                    "AI Test Generator",
                    "PDF-based Q&A",
                    "Code Review",
                    "AI Guidance",
                    "Challenge Mode",
                    "Full Interview",
                    "HR Round",
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer">Resources</summary>
                <ul className="ml-4 mt-2 space-y-2">
                  {["GATE", "1st Year", "2nd Year", "3rd Year", "4th Year"].map(
                    (item, idx) => (
                      <li key={idx}>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </details>
            </li>
            <li>
              <Link href="#" className="block">
                Coin System
              </Link>
            </li>
            <div className="hidden md:flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                  <span className="text-sm">{session.user.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow text-sm font-semibold mt-2"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow text-sm font-semibold mt-2"
                >
                  Log in
                </button>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
