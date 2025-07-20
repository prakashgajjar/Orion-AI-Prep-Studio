import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-md text-gray-400 px-6 py-16 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 text-sm">
        {/* Practice Questions */}
        <div>
          <h2 className="font-bold text-green-400 mb-4">Practice Questions</h2>
          <ul className="space-y-2">
            {["Programming", "Scripting", "Databases", "System Design", "Puzzles"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-green-400 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Interview Tools */}
        <div>
          <h2 className="font-bold text-green-400 mb-4">AI Interview Tools</h2>
          <ul className="space-y-2">
            {[
              "AI Test Generator",
              "PDF-based Q&A",
              "Code Review",
              "Challenge Mode",
              "HR Round Prep",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-green-400 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-bold text-green-400 mb-4">Resources</h2>
          <ul className="space-y-2">
            {["GATE Notes", "Year 1", "Year 2", "Year 3", "Year 4"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-green-400 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="font-bold text-green-400 mb-4">Connect with Me</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://github.com/prakashgajjar"
                target="_blank"
                className="flex items-center space-x-2 hover:text-green-400 transition"
              >
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="w-5 h-5 invert"
                />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/prakash-suthar-15968127a/"
                target="_blank"
                className="flex items-center space-x-2 hover:text-green-400 transition"
              >
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/prksh.suthar/"
                target="_blank"
                className="flex items-center space-x-2 hover:text-green-400 transition"
              >
                <Image
                  src="https://img.icons8.com/fluency/48/instagram-new.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
        © 2025 greetAI by Prakash Suthar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
