import { STATUS } from "@/lib/status";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return Response.json(
        { error: "topic is required and must be a non-empty string" },
        { status: STATUS.BAD_REQUEST }
      );
    }

    const cleanedTopic = topic.trim();

    // Check for GEMINI_API_KEY
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not found, using premium fallback questions");
      return Response.json({ questions: getFallbackQuestions(cleanedTopic) }, { status: STATUS.OK });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      });

      const prompt = `Generate exactly 10 high-quality, diverse multiple choice questions about "${cleanedTopic}". 
Each question must have exactly 4 options and a correct answer index (0-based).
Ensure the difficulty is balanced, covering fundamental, intermediate, and advanced aspects of the topic.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              questions: {
                type: "ARRAY",
                description: "Array of 10 multiple choice questions",
                items: {
                  type: "OBJECT",
                  properties: {
                    question: { type: "STRING", description: "The MCQ question text" },
                    options: {
                      type: "ARRAY",
                      description: "Exactly 4 options for the candidate to choose from",
                      items: { type: "STRING" }
                    },
                    answerIndex: { 
                      type: "INTEGER", 
                      description: "The 0-based index of the correct answer within the options array" 
                    }
                  },
                  required: ["question", "options", "answerIndex"]
                }
              }
            },
            required: ["questions"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response text from Gemini API");
      }

      const parsed = JSON.parse(text);
      if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        throw new Error("Invalid structure returned from Gemini API");
      }

      return Response.json({ questions: parsed.questions }, { status: STATUS.OK });
    } catch (apiError) {
      console.error("Gemini API Error, using fallback:", apiError);
      return Response.json({ questions: getFallbackQuestions(cleanedTopic) }, { status: STATUS.OK });
    }
  } catch (error) {
    console.error("Test Generation Route Error:", error);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

// Robust fallback generator if Gemini API key is missing, rate-limited, or network fails
function getFallbackQuestions(topic) {
  const normalized = topic.toLowerCase();
  
  if (normalized.includes("javascript") || normalized.includes("js")) {
    return [
      { question: "What is the output of `typeof null` in JavaScript?", options: ["object", "null", "undefined", "function"], answerIndex: 0 },
      { question: "Which method adds elements to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answerIndex: 0 },
      { question: "Which keyword declares a block-scoped local variable?", options: ["var", "let", "const", "Both let and const"], answerIndex: 3 },
      { question: "What does `NaN` stand for?", options: ["Not a Number", "Null and Void", "New Array Node", "Next Active Number"], answerIndex: 0 },
      { question: "Which operator is used for strict equality comparison?", options: ["=", "==", "===", "!=="], answerIndex: 2 },
      { question: "What is the primary purpose of a Promise in JS?", options: ["Synchronous code execution", "Asynchronous operations", "Memory management", "Error logging"], answerIndex: 1 },
      { question: "Which array method creates a new array with all elements that pass a test?", options: ["map()", "filter()", "reduce()", "forEach()"], answerIndex: 1 },
      { question: "What is the default value of an uninitialized variable?", options: ["null", "0", "undefined", "false"], answerIndex: 2 },
      { question: "How do you write a single-line comment in JavaScript?", options: ["#", "//", "<!--", "/*"], answerIndex: 1 },
      { question: "Which keyword refers to the object that invoked the current function?", options: ["this", "self", "parent", "super"], answerIndex: 0 }
    ];
  }
  
  if (normalized.includes("react")) {
    return [
      { question: "Which hook replaces componentDidMount in React functional components?", options: ["useEffect", "useState", "useRef", "useMemo"], answerIndex: 0 },
      { question: "What is React Virtual DOM?", options: ["A direct copy of the HTML DOM", "An in-memory representation of the real DOM", "A browser extensions tool", "A style library"], answerIndex: 1 },
      { question: "How do you pass data from parent to child component?", options: ["Through state", "Through props", "Through Context API", "Through refs"], answerIndex: 1 },
      { question: "What is the purpose of keys in React lists?", options: ["To uniquely identify list items for reconciliation", "To apply styling", "To set component ID attributes", "To cache state"], answerIndex: 0 },
      { question: "Which hook allows you to consume context values?", options: ["useContext", "useStateContext", "useConsumer", "usePropContext"], answerIndex: 0 },
      { question: "What does JSX stand for?", options: ["JavaScript XML", "JavaScript Syntax Extension", "JSON Syntax XML", "Java Scripted Extension"], answerIndex: 0 },
      { question: "Which method updates the state in a React class component?", options: ["this.setState", "this.updateState", "this.state.update", "this.forceUpdate"], answerIndex: 0 },
      { question: "Can a React function component hold local state?", options: ["No, only class components can", "Yes, using the useState hook", "Yes, by mutating props", "Only with external Redux state"], answerIndex: 1 },
      { question: "What triggers a re-render of a React component?", options: ["Changes to props or state", "Browser resize events only", "Explicit console logs", "Page refreshes"], answerIndex: 0 },
      { question: "What is the default port for local React development (Create React App)?", options: ["8080", "5000", "3000", "4000"], answerIndex: 2 }
    ];
  }

  // Generic fallback if topic is custom
  return Array.from({ length: 10 }, (_, i) => ({
    question: `Sample Question ${i + 1} about ${topic}?`,
    options: [
      `Correct Answer for ${topic} Option ${i + 1}`,
      `Incorrect Answer A for ${topic} Option ${i + 1}`,
      `Incorrect Answer B for ${topic} Option ${i + 1}`,
      `Incorrect Answer C for ${topic} Option ${i + 1}`
    ],
    answerIndex: 0
  }));
}
