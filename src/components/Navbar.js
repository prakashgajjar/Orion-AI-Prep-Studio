"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { AppContext } from "@/hooks/AppContext";
import { ChevronDown } from "lucide-react";

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
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 text-zinc-900 sticky top-0 z-[100px] shadow-sm">
      <div className="max-w-[1700px] mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-zinc-900">
          Orion<span className="text-gray-600">AI</span>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <li className="relative" ref={aiRef}>
            <button
              onClick={() => setShowAI(!showAI)}
              className="hover:text-zinc-900 transition flex items-center gap-1"
            >
              Services <ChevronDown size={16} />
            </button>
            {showAI && (
              <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-64 z-20">
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
                      className="block px-5 py-3 hover:bg-gray-100 hover:text-zinc-900 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="hover:text-zinc-900 transition">
              General Talk
            </Link>
          </li>

          <li className="relative" ref={resourcesRef}>
            <button
              onClick={() => setShowResources(!showResources)}
              className="hover:text-zinc-900 transition flex items-center gap-1"
            >
              Resources <ChevronDown size={16} />
            </button>
            {showResources && (
              <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-52 z-20">
                {["GATE", "1st Year", "2nd Year", "3rd Year", "4th Year"].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href="#"
                      className="block px-5 py-3 hover:bg-gray-100 hover:text-zinc-900 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="#" className="hover:text-zinc-900 transition">
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
              <span className="text-sm text-gray-700">{session.user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-gray-300 hover:bg-gray-400 text-zinc-900 px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
            >
              Log in
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-zinc-900">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 bg-white border-t border-gray-200 text-zinc-900">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li>
              <Link href="#" className="block hover:text-zinc-900">General Talk</Link>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer hover:text-zinc-900">Services</summary>
                <ul className="ml-4 mt-2 space-y-2">
                  {[
                    "AI Test Generator", "PDF-based Q&A", "Code Review",
                    "AI Guidance", "Challenge Mode", "Full Interview", "HR Round"
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-zinc-900 rounded-md transition"
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
                <summary className="cursor-pointer hover:text-zinc-900">Resources</summary>
                <ul className="ml-4 mt-2 space-y-2">
                  {["GATE", "1st Year", "2nd Year", "3rd Year", "4th Year"].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-zinc-900 rounded-md transition"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link href="#" className="block hover:text-zinc-900">Coin System</Link>
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
                  <span className="text-sm text-gray-700">{session.user.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-gray-300 hover:bg-gray-400 text-zinc-900 px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
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
