"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  BookMarked
} from "lucide-react";

const popularTopics = [
  { name: "JavaScript", description: "ES6+, Async/Await, Closures, DOM", icon: "🚀" },
  { name: "React", description: "Hooks, State, Virtual DOM, Components", icon: "⚛️" },
  { name: "Node.js", description: "Event Loop, FS, Streams, Express", icon: "🟢" },
  { name: "Algorithms", description: "Sorting, Searching, Complexity, Trees", icon: "🔢" },
  { name: "Python", description: "Lists, OOP, Generators, Libraries", icon: "🐍" },
  { name: "SQL Databases", description: "Joins, Indexes, Subqueries, Normalization", icon: "💾" },
];

export default function TestPage() {
  const { data: session } = useSession();
  // States: 'setup' | 'loading' | 'quiz' | 'summary'
  const [gameState, setGameState] = useState("setup");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState("Preparing database...");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectPopular = (name) => {
    setSelectedTopic(name);
    setCustomTopic("");
    setErrorMessage("");
  };

  const handleCustomChange = (e) => {
    setCustomTopic(e.target.value);
    setSelectedTopic("");
    setErrorMessage("");
  };

  // Generate quiz using API
  const generateQuiz = async () => {
    const topic = selectedTopic || customTopic.trim();
    if (!topic) {
      setErrorMessage("Please select a topic or enter a custom one.");
      return;
    }

    setGameState("loading");
    setLoadingProgress("Initializing AI Model...");
    
    try {
      const messages = [
        "Analyzing topic depth...",
        "Structuring multiple choice questions...",
        "Verifying answer indices...",
        "Assembling premium quiz interface..."
      ];
      
      let msgIdx = 0;
      const interval = setInterval(() => {
        if (msgIdx < messages.length) {
          setLoadingProgress(messages[msgIdx]);
          msgIdx++;
        }
      }, 1500);

      const response = await axios.post("/api/test/generate", { topic });
      clearInterval(interval);

      if (response.data?.questions && response.data.questions.length > 0) {
        setQuestions(response.data.questions);
        setAnswers(new Array(response.data.questions.length).fill(null));
        setCurrentIdx(0);
        setGameState("quiz");
      } else {
        throw new Error("No questions returned from generation API");
      }
    } catch (error) {
      console.error("Failed to generate test:", error);
      setErrorMessage("Failed to generate quiz. Please try again.");
      setGameState("setup");
    }
  };

  const handleSelectOption = (optIdx) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optIdx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleFinish = async () => {
    setGameState("summary");
    if (session?.user) {
      const results = getResultsSummary();
      const amount = 50 + (results.correct * 5);
      try {
        await axios.post("/api/user/coins", {
          amount,
          reason: `AI Test: ${selectedTopic || customTopic}`,
          source: "AI Test"
        });
      } catch (err) {
        console.error("Failed to award coins:", err);
      }
    }
  };

  const handleReset = () => {
    setSelectedTopic("");
    setCustomTopic("");
    setQuestions([]);
    setAnswers([]);
    setCurrentIdx(0);
    setGameState("setup");
  };

  const getResultsSummary = () => {
    let correct = 0;
    let incorrect = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answerIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });
    return { correct, incorrect, score: Math.round((correct / questions.length) * 100) };
  };

  const finalResults = gameState === "summary" ? getResultsSummary() : null;

  // ── SETUP SCREEN ──────────────────────────────────────────────────
  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 animate-pulse text-indigo-600" />
              Dynamic AI Quiz Builder
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3 sm:text-5xl">
              Generate Custom Tests with AI
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select a popular topic or type any subject you want to practice. Our AI will curate 10 personalized questions in real-time.
            </p>
          </div>

          {/* Form Area */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-200/60 p-6 sm:p-10 mb-8">
            {/* Custom Input */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                Create a Custom Topic
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Docker Basics, Advanced CSS Grid, World War II History..."
                  value={customTopic}
                  onChange={handleCustomChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white text-slate-950 rounded-2xl py-4 pl-12 pr-4 text-lg transition-all"
                />
                <BrainCircuit className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Popular Topics Grid */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Or Select a Popular Topic
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {popularTopics.map((topic) => {
                  const isSelected = selectedTopic === topic.name;
                  return (
                    <button
                      key={topic.name}
                      onClick={() => handleSelectPopular(topic.name)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-200 group ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                          : "bg-slate-50/50 hover:bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-md"
                      }`}
                    >
                      <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform">{topic.icon}</span>
                      <h3 className={`font-bold text-base mb-1 ${isSelected ? "text-white" : "text-slate-900"}`}>
                        {topic.name}
                      </h3>
                      <p className={`text-xs leading-relaxed ${isSelected ? "text-indigo-200" : "text-slate-500"}`}>
                        {topic.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl flex items-center gap-2 text-sm">
                <XCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={generateQuiz}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-4 px-8 rounded-2xl text-lg transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.99]"
            >
              <span>Build Test with AI</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-400 mt-6">
          Powered by Gemini 2.5 Flash • Real-time MCQ Generation
        </div>
      </div>
    );
  }

  // ── LOADING SCREEN ────────────────────────────────────────────────
  if (gameState === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-slate-100">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <Sparkles className="w-5 h-5 text-indigo-500 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Generating Questions</h2>
          <p className="text-slate-600 font-medium mb-6">
            Topic: <span className="text-indigo-600 font-bold">{selectedTopic || customTopic}</span>
          </p>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-indigo-600 h-full w-2/3 rounded-full animate-pulse" />
          </div>
          <span className="text-sm font-medium text-slate-400 animate-pulse">{loadingProgress}</span>
        </div>
      </div>
    );
  }

  // ── QUIZ STATE ────────────────────────────────────────────────────
  if (gameState === "quiz") {
    const currentQ = questions[currentIdx];
    const percentage = Math.round(((currentIdx + 1) / questions.length) * 100);

    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          {/* Top Progress bar */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>{percentage}% Complete</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-100 p-6 sm:p-10 mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mb-8">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-4">
              {currentQ.options.map((option, oIdx) => {
                const isSelected = answers[currentIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-indigo-50/50 border-indigo-600 text-slate-950 font-bold"
                        : "bg-slate-50/30 border-slate-100 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold border ${
                        isSelected 
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : "bg-white border-slate-200 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-700"
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-base">{option}</span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed font-bold px-6 py-3.5 rounded-2xl transition shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[currentIdx] === null}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3.5 rounded-2xl transition shadow-lg shadow-indigo-600/10"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={answers.some((ans) => ans === null)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-extrabold px-8 py-3.5 rounded-2xl transition shadow-lg shadow-green-600/10"
              >
                <span>Finish &amp; Score</span>
                <Award className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── SUMMARY SCREEN ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Score Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-100 p-8 sm:p-10 mb-8 text-center relative overflow-hidden">
          {/* Diagonal ribbon decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-full text-indigo-600 mb-6">
            <Award className="w-12 h-12" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Test Completed!</h1>
          <p className="text-slate-500 font-semibold mb-6">
            Topic: <span className="text-indigo-600 capitalize">{selectedTopic || customTopic}</span>
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="text-center border-r border-slate-200">
              <span className="block text-2xl font-black text-green-600">{finalResults.correct}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">True</span>
            </div>
            <div className="text-center border-r border-slate-200">
              <span className="block text-2xl font-black text-rose-600">{finalResults.incorrect}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">False</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black text-indigo-600">{finalResults.score}%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Marks</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setAnswers(new Array(questions.length).fill(null));
                setCurrentIdx(0);
                setGameState("quiz");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3.5 px-8 rounded-2xl transition shadow-lg shadow-indigo-600/10"
            >
              <BookMarked className="w-5 h-5" />
              <span>Choose Another Topic</span>
            </button>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <span>Detailed Review</span>
          <span className="text-sm font-semibold bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full">
            10 Questions
          </span>
        </h2>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.answerIndex;
            return (
              <div 
                key={i} 
                className={`bg-white rounded-2xl border p-5 shadow-sm transition-all duration-200 ${
                  isCorrect ? "border-green-100 hover:border-green-200" : "border-rose-100 hover:border-rose-200"
                }`}
              >
                <div className="flex items-start gap-3 justify-between">
                  <h3 className="font-bold text-slate-800 text-base leading-snug">
                    {i + 1}. {q.question}
                  </h3>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className={`p-3 rounded-xl border ${
                    isCorrect ? "bg-green-50/40 border-green-100 text-green-800" : "bg-rose-50/40 border-rose-100 text-rose-800"
                  }`}>
                    <span className="font-bold block text-xs uppercase tracking-wide opacity-70 mb-1">
                      Your Answer
                    </span>
                    <span className="font-semibold">{q.options[answers[i]]}</span>
                  </div>
                  {!isCorrect && (
                    <div className="p-3 bg-green-50/40 border border-green-100 text-green-800 rounded-xl">
                      <span className="font-bold block text-xs uppercase tracking-wide opacity-70 mb-1">
                        Correct Answer
                      </span>
                      <span className="font-semibold">{q.options[q.answerIndex]}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
