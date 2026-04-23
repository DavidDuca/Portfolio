import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/chat
 * Conversational AI endpoint backed by Google Gemini.
 *
 * Required Vercel environment variable:
 *   GEMINI_API_KEY → Get one (free tier) at https://aistudio.google.com/apikey
 *
 * Optional:
 *   GEMINI_MODEL   → defaults to "gemini-2.0-flash"
 *
 * Request body: { messages: [{ role: "user" | "assistant", content: string }, ...] }
 * Response:     { reply: string }
 *
 * --------------------------------------------------------------
 *   ▸▸▸ HOW TO ADD / SWAP THE AI MODEL ◂◂◂
 * --------------------------------------------------------------
 *  1. Create a Google AI Studio account → https://aistudio.google.com
 *  2. Generate an API key.
 *  3. In your Vercel project: Settings → Environment Variables
 *     - Add  GEMINI_API_KEY  = your key
 *     - (optional) GEMINI_MODEL = gemini-2.0-flash | gemini-1.5-pro | etc.
 *  4. Redeploy. Done — the chatbot will start replying.
 *
 *  To switch providers (OpenAI, Anthropic, etc.), only this file
 *  needs to change. The frontend just POSTs { messages } and
 *  expects { reply } back.
 * --------------------------------------------------------------
 */

const SYSTEM_PROMPT = `You are David Rupert Duca's friendly portfolio assistant. David is:
- Co-founder of SeedLynx (AgriTech & digital services startup)
- Web developer (React, Node.js, Express, Tailwind CSS, MongoDB, PHP, MySQL)
- IT infrastructure & networking specialist (TCP/IP, OSI, VLANs, Cisco IOS, DNS, DHCP, subnetting)
- BS Information Systems student at Carlos Hilado Memorial State University
- Holds TESDA CSS NC II + 5 Cisco NetAcad certificates (ITN, SRWE, ENSA, Intro to Cybersecurity, IT Essentials)
- Based in the Philippines, open to freelance and collaborations
- Projects: GrillSync, SeedLynx, Whispr, RiceWise

Answer questions concisely and warmly. If asked something you don't know about David, say so politely and suggest contacting him via the contact form.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Chatbot is not configured. Add GEMINI_API_KEY to Vercel environment variables.",
      });
    }

    const { messages } = (req.body ?? {}) as { messages?: { role: string; content: string }[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages[] is required" });
    }
    if (messages.length > 30) messages.splice(0, messages.length - 30); // keep recent context

    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

    // Convert OpenAI-style messages to Gemini "contents" format
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 4000) }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("Gemini error:", r.status, txt);
      return res.status(500).json({ error: `AI provider error (${r.status})` });
    }

    const data = await r.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ||
      "I'm not sure how to respond to that.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: err?.message || "Chat failed" });
  }
}
