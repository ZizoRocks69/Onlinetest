
import { GoogleGenAI, Type } from "@google/genai";
import { StudyPlan, QuizQuestion } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudyPlan = async (topic: string): Promise<StudyPlan> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a detailed study plan for the topic: "${topic}". Include specific techniques like Pomodoro or Spaced Repetition.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          plan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                description: { type: Type.STRING },
                technique: { type: Type.STRING },
                duration: { type: Type.STRING }
              },
              required: ["phase", "description", "technique", "duration"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["topic", "plan", "summary"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 5-question multiple choice quiz for the topic: "${topic}". Make it challenging but educational.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const generateIdeas = async (keywords: string): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 creative essay or project ideas based on these keywords: "${keywords}". Provide catchy titles and brief one-sentence descriptions for each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const askQuestion = async (question: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a helpful study assistant. Answer the following student question concisely: "${question}"`,
  });

  return response.text || "I'm sorry, I couldn't process that question.";
};
