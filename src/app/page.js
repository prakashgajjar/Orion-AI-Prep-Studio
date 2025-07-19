import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { MockInterviewSection } from "@/components/MockInterviewSection";
import Footer from "@/components/Footer";
import Subscription from "./subsciption/Subscription";
import ReviewSlider from "@/components/Review";

const App = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-100 to-white">
        <section className="text-center py-20 px-6 bg-gradient-to-b from-blue-100 to-white">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-2">
            Everything you need to crack your
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Next Tech Interview
          </h1>
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg">
            Get Started for free →
          </button>
        </section>

        <div>
          <Image
            src="/images/2.svg"
            alt="Hero Image"
            className=" max-h-60 sm:max-h-80 w-full bg-white"
            width={200}
            height={200}
          />
        </div>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 py-12 bg-white">
          {/* Card 3 */}
          <div className="bg-green-100 p-6 rounded-2xl shadow hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="text-6xl text-center mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-center text-green-800">
              AI Interview Prep →
            </h3>
          </div>

          {/* Card 1 */}
          <div className="bg-purple-100 p-6 rounded-2xl shadow hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="text-6xl text-center mb-4">💻</div>
            <h3 className="text-xl font-semibold text-center text-purple-800">
              AI Exam Prep →
            </h3>
          </div>

          {/* Card 2 */}
          <div className="bg-yellow-100 p-6 rounded-2xl shadow hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="text-6xl text-center mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-center text-yellow-800">
              Fast Track Courses →
            </h3>
          </div>
        </section>

        {/* section 3 mock interview  */}
        <section>
          <div className="mt-9">
            <MockInterviewSection />
          </div>
        </section>

        <section>
          <div>
            <ReviewSlider />
          </div>
        </section>

        <section>
          <div className="mt-9">
            <div>
              <Subscription />
            </div>
          </div>
        </section>

        {/* footer secotion  */}
        <section>
          <div className="mt-9">
            <Footer />
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
