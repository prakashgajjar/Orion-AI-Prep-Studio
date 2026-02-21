import Image from "next/image";
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 backdrop-blur-md text-gray-700 px-6 py-16 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 text-sm">
        {/* Practice Questions */}
        <div>
          <h2 className="font-bold text-zinc-900 mb-4">Practice Questions</h2>
          <ul className="space-y-2">
            {["Programming", "Scripting", "Databases", "System Design", "Puzzles"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-zinc-900 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Interview Tools */}
        <div>
          <h2 className="font-bold text-zinc-900 mb-4">AI Interview Tools</h2>
          <ul className="space-y-2">
            {[
              "AI Test Generator",
              "PDF-based Q&A",
              "Code Review",
              "Challenge Mode",
              "HR Round Prep",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-zinc-900 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-bold text-zinc-900 mb-4">Resources</h2>
          <ul className="space-y-2">
            {["GATE Notes", "Year 1", "Year 2", "Year 3", "Year 4"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-zinc-900 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="font-bold text-zinc-900 mb-4">Connect with Me</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://github.com/prakashgajjar"
                target="_blank"
                className="flex items-center space-x-2 hover:text-zinc-900 transition"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/prakash-suthar-15968127a/"
                target="_blank"
                className="flex items-center space-x-2 hover:text-zinc-900 transition"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:prakash@example.com"
                className="flex items-center space-x-2 hover:text-zinc-900 transition"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-12 pt-6 text-center text-xs text-gray-600">
        © 2025 OrionAI by Prakash Suthar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
