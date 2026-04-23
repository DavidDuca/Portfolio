import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/chat
 * Conversational AI endpoint backed by the Lovable AI Gateway.
 *
 * Required Vercel environment variable:
 *   LOVABLE_API_KEY → Provided automatically by Lovable Cloud.
 *                     Copy it from your Lovable project (Cloud → Secrets)
 *                     and paste it into Vercel → Settings → Environment Variables.
 *
 * Optional:
 *   LOVABLE_AI_MODEL → defaults to "google/gemini-3-flash-preview"
 *
 * Request body: { messages: [{ role: "user" | "assistant", content: string }, ...] }
 * Response:     { reply: string }
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
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Chatbot is not configured. Add LOVABLE_API_KEY to Vercel environment variables.",
      });
    }

    const { messages } = (req.body ?? {}) as { messages?: { role: string; content: string }[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages[] is required" });
    }
    if (messages.length > 30) messages.splice(0, messages.length - 30); // keep recent context

    const model = process.env.LOVABLE_AI_MODEL || "google/gemini-3-flash-preview";

    // Lovable AI Gateway uses the OpenAI-compatible chat completions format
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: String(m.content).slice(0, 4000),
          })),
        ],
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("Lovable AI error:", r.status, txt);
      if (r.status === 429) {
        return res.status(429).json({
          error: "I'm getting a lot of requests right now — please wait a moment and try again.",
        });
      }
      if (r.status === 402) {
        return res.status(402).json({
          error: "AI credits exhausted. Please add credits in Lovable → Settings → Workspace → Usage.",
        });
      }
      return res.status(500).json({ error: `AI provider error (${r.status})` });
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "I'm not sure how to respond to that.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: err?.message || "Chat failed" });
  }
}
