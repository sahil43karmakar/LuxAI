import { GoogleGenAI } from "@google/genai";

const apikey = "AIzaSyDB4pi7jX6TwtmqKaQrQinzssJ7y3h6nVY";

const ai = new GoogleGenAI({
  apiKey: apikey,
});

// ✅ Exportable function
export async function runGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}