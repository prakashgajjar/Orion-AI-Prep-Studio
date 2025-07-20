"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { AppContext } from "@/hooks/AppContext";

const Navbar = () => {
  const [showAI, setShowAI] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const aiRef = useRef(null);
  const resourcesRef = useRef(null);
  const { data: session } = useSession();

  const {setShowPdfIntervewPopup} = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aiRef.current && !aiRef.current.contains(event.target) &&
        resourcesRef.current && !resourcesRef.current.contains(event.target)
      ) {
        setShowAI(false);
        setShowResources(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black/80 backdrop-blur-sm  text-white sticky top-0 z-[100px] shadow-md">
      <div className="max-w-[1700px] mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-green-400">
          Orion<span className="text-white">AI</span>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <li className="relative" ref={aiRef}>
            <button
              onClick={() => setShowAI(!showAI)}
              className="hover:text-green-400 transition"
            >
              Services ▼
            </button>
            {showAI && (
              <ul className="absolute top-full left-0 mt-2 bg-[#0B0B0F] border border-gray-700 shadow-lg rounded-md w-64 z-20">
                {[
                  "AI Test Generator", "PDF-based Q&A", "Code Review",
                  "AI Guidance", "Challenge Mode", "Full Interview", "HR Round"
                ].map((item, idx) => (
                  <li key={idx} onClick={()=>{
                    if(item === "PDF-based Q&A"){
                      setShowPdfIntervewPopup(true);
                    }
                  }}>

                    <Link
                      href="#"
                      className="block px-5 py-3 hover:bg-green-500 hover:text-black transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="hover:text-green-400 transition">
              General Talk
            </Link>
          </li>

          <li className="relative" ref={resourcesRef}>
            <button
              onClick={() => setShowResources(!showResources)}
              className="hover:text-green-400 transition"
            >
              Resources ▼
            </button>
            {showResources && (
              <ul className="absolute top-full left-0 mt-2 bg-[#0B0B0F] border border-gray-700 shadow-lg rounded-md w-52 z-20">
                {["GATE", "1st Year", "2nd Year", "3rd Year", "4th Year"].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href="#"
                      className="block px-5 py-3 hover:bg-green-500 hover:text-black transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="hover:text-green-400 transition">
              Coin System
            </Link>
          </li>
        </ul>

        {/* Right: Auth Buttons (Desktop) */}
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
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-md text-sm font-semibold transition"
            >
              Log in
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 bg-black text-white">
          <ul className="space-y-4 text-gray-300 font-medium">
            <li>
              <Link href="#" className="block hover:text-green-400">General Talk</Link>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer hover:text-green-400">Services</summary>
                <ul className="ml-4 mt-2 space-y-2">
                  {[
                    "AI Test Generator", "PDF-based Q&A", "Code Review",
                    "AI Guidance", "Challenge Mode", "Full Interview", "HR Round"
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-green-500 hover:text-black rounded-md transition"
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
                <summary className="cursor-pointer hover:text-green-400">Resources</summary>
                <ul className="ml-4 mt-2 space-y-2">
                  {["GATE", "1st Year", "2nd Year", "3rd Year", "4th Year"].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-green-500 hover:text-black rounded-md transition"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link href="#" className="block hover:text-green-400">Coin System</Link>
            </li>
            <div className="pt-4">
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
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-md text-sm font-semibold transition"
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
