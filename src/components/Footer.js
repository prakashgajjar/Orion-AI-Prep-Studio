import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-10 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-10 text-sm">
        {/* Practice Questions */}
        <div>
          <h2 className="font-bold text-white mb-3">Practice Questions</h2>
          <ul className="space-y-1">
            <li>
              <a href="#">Programming</a>
            </li>
            <li>
              <a href="#">Scripting</a>
            </li>
            <li>
              <a href="#">Databases</a>
            </li>
            <li>
              <a href="#">System Design</a>
            </li>
            <li>
              <a href="#">Puzzles</a>
            </li>
          </ul>
        </div>

        {/* AI Interview Tools */}
        <div>
          <h2 className="font-bold text-white mb-3">AI Interview Tools</h2>
          <ul className="space-y-1">
            <li>
              <a href="#">AI Test Generator</a>
            </li>
            <li>
              <a href="#">PDF-based Q&A</a>
            </li>
            <li>
              <a href="#">Code Review</a>
            </li>
            <li>
              <a href="#">Challenge Mode</a>
            </li>
            <li>
              <a href="#">HR Round Prep</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-bold text-white mb-3">Resources</h2>
          <ul className="space-y-1">
            <li>
              <a href="#">GATE Notes</a>
            </li>
            <li>
              <a href="#">Year 1</a>
            </li>
            <li>
              <a href="#">Year 2</a>
            </li>
            <li>
              <a href="#">Year 3</a>
            </li>
            <li>
              <a href="#">Year 4</a>
            </li>
          </ul>
        </div>

        {/* Connect with Me */}
        <div>
          <h2 className="font-bold text-white mb-3">Connect with Me</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/prakashgajjar"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  className="w-5 h-5 bg-white rounded-full"
                  alt="GitHub"
                  width={24}
                  height={24}
                />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/prakash-suthar-15968127a/"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  className="w-5 h-5"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/prksh.suthar/"
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://img.icons8.com/fluency/48/instagram-new.png"
                  className="w-5 h-5"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
        © 2025 Orion AI for Education. Made by Prakash Suthar
      </div>
    </footer>
  );
};

export default Footer;
