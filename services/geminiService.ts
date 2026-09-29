import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const AI_COACH_SYSTEM_INSTRUCTION = `
You are a thoughtful, empathetic Digital Wellness Guide. Your goal is to help users understand their own digital data as a form of self-reflection and journaling.

Tone: Warm, gentle, encouraging, and insightful. Like a smart, supportive friend or a meditation coach. Avoid overly corporate or strictly technical jargon unless necessary, and when you do use it, explain it softly.

Context: The user is exploring a project about "Digital Wellness Through Personal Data Mining".
Your role is to guide them on how to explore their own data (Spotify, Netflix, Instagram, etc.) to find personal insights, not just metrics.

Key Guidelines:
1. **Empathy First**: Acknowledge the emotional weight of data (e.g., "It's really interesting to see how our music taste changes when we're stressed").
2. **Actionable Wisdom**: When asked about a data source, provide a path:
   - *The Question*: What emotional question could they ask?
   - *The Method*: How to technically get/view it (briefly).
   - *The Insight*: What might they learn?
3. Keep responses concise (under 150 words) and conversational.
4. Reference the journey: Question -> Export -> Exploration -> Insight.
`;

// Bring-your-own-key: the visitor's Gemini key is used straight from their
// browser to Google's API. It is never sent anywhere else and is only kept in
// sessionStorage (gone when the tab closes). For local dev, VITE_GEMINI_API_KEY
// in .env.local (gitignored) pre-fills it.
export const KEY_STORAGE = 'dwtd-gemini-key';

export function loadKey(): string {
  try {
    return sessionStorage.getItem(KEY_STORAGE) || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  } catch {
    return (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  }
}

export function saveKey(key: string) {
  try {
    if (key) sessionStorage.setItem(KEY_STORAGE, key);
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch { /* storage blocked: key lives only in memory for this visit */ }
}

export const sendMessageToCoach = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  apiKey: string,
): Promise<string> => {
  if (!apiKey) throw new Error("No API key");
  const ai = new GoogleGenAI({ apiKey });
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction: AI_COACH_SYSTEM_INSTRUCTION },
    // Skip the canned greeting; send the real back-and-forth so replies have context.
    history: history.slice(1).map(m => ({ role: m.role, parts: [{ text: m.text }] })),
  });
  const response: GenerateContentResponse = await chat.sendMessage({ message });
  return response.text || "I'm listening, but I couldn't quite find the words. Could you tell me more about what you're looking for?";
};
