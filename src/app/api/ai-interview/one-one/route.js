import { STATUS } from "@/lib/status";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { chatHistory = [], jobTitle = "Software Developer" } = await req.json();

    if (!chatHistory || !Array.isArray(chatHistory)) {
      return Response.json(
        { error: "chatHistory is required and must be an array" },
        { status: STATUS.BAD_REQUEST }
      );
    }

    // If chatHistory is empty, start the interview
    if (chatHistory.length === 0) {
      return Response.json(
        { response: `Hello! Welcome to your mock interview for the ${jobTitle} role. Let's start with a simple question: Can you tell me about your background and experience?` },
        { status: STATUS.OK }
      );
    }

    // Format chat history into a clear dialog for Gemini context
    const dialogue = chatHistory
      .map(
        (msg) =>
          `${msg.sender === "user" ? "Candidate" : "Interviewer"}: ${msg.text}`
      )
      .join("\n");

    const systemInstruction = `You are a professional technical interviewer conducting a mock interview for the role of "${jobTitle}".
Evaluate the Candidate's answers and respond directly as the Interviewer.
Follow these guidelines strictly:
1. Speak naturally, supportively, yet critically like a real human interviewer.
2. Keep your response brief, clear, and focused—usually 1 to 3 sentences. Do not write paragraphs.
3. Ask relevant follow-up questions to test the candidate's depth or move to another topic if they answered well.
4. If the candidate asks you a question, answer it briefly and steer back to the interview.
5. NEVER include structural prefixes like "Interviewer:", "AI:", or meta-commentary. Output ONLY the words you would speak aloud.
6. The interview should last around 5 to 6 questions. When the interview is finished (e.g. they have answered all questions or the time is up), thank them warmly and conclude the interview by saying: "Thank you for your time and thoughtful responses! That concludes our interview. We'll review your answers and get back to you soon."`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Here is the interview conversation history so far:
${dialogue}

Please generate the interviewer's next response:`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = aiResponse.text || "I'm sorry, can you repeat that?";
    console.log("AI Response:", reply);

    return Response.json({ response: reply.trim() }, { status: STATUS.OK });
  } catch (error) {
    console.error("AI Interview Route Error:", error);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

