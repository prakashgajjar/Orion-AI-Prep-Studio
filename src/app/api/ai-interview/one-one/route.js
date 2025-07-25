import { STATUS } from "@/lib/status";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const  {chatHistory}  = await req.json();
 
  const history = JSON.stringify(chatHistory)
  console.log("Chat History:", history);


  if (!history) {
    return Response.status(STATUS.BAD_REQUEST).json({
      error: "chatHistory is required",
    });
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const aiResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
  });
  console.log(aiResponse.text);
  return Response.json({ response: aiResponse.text }, { status: STATUS.OK });

}
