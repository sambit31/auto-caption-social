import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData:{
        mimeType: "image/jpeg",
        data: base64ImageFile, 
      },
    },
     { text: "Give 5 short aesthetic captions for this image, each unique, poetic and emotional." },
 
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
    systemInstruction: `
      You are an AI caption generator.
      Your role is to generate short, aesthetic captions for images.
      Captions must be poetic, emotional, unique and creative.
      Avoid generic and common captions.
      Do NOT write long paragraphs.
      Always return ONLY the caption text. No explanations.
    `
  }
});

  return response.text;
}