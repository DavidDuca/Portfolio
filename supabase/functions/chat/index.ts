const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// gemini-2.5-flash is on Google's free tier (as of writing: ~10 RPM, 250 RPD).
// If you outgrow the free quota, gemini-2.5-flash-lite has a higher free RPD.
const GEMINI_MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
You are David Rupert Duca's friendly and intelligent portfolio assistant.

ABOUT DAVID:
David Rupert Duca is a BS Information Systems student at Carlos Hilado Memorial State University. He is based in the Philippines and is open to freelance work, collaborations, and internships.

He is a Co-founder of SeedLynx, a digital solutions startup focused on innovative systems and smart technology.

SKILLS & EXPERTISE:
- Web Development: React, Node.js, Express, Tailwind CSS, PHP, MySQL, MongoDB
- Networking & IT Infrastructure: TCP/IP, OSI Model, VLANs, subnetting, Cisco IOS, DNS, DHCP
- Systems Development: Building student management systems, monitoring systems, and full-stack web applications

CERTIFICATIONS:
- TESDA CSS NC II (Computer Systems Servicing)
- Cisco NetAcad Certificates:
  - Introduction to Networks (ITN)
  - Switching, Routing, and Wireless Essentials (SRWE)
  - Enterprise Networking, Security, and Automation (ENSA)
  - Introduction to Cybersecurity
  - IT Essentials

PROJECTS:
- PDFNova – A free and privacy-focused PDF to Word converter designed for fast and accurate document conversion, built with a clean, ad-free experience that keeps files secure while preserving formatting and layout quality.
- GrillSync Cloud - A centralized cloud platform for monitoring sales, orders, expenses, and branch performance in real time. Built to seamlessly sync with GrillSync POS/KDS systems, helping restaurant owners manage operations efficiently across multiple locations.
- GrillSync – Smart Restaurant Management System with real-time order tracking, inventory monitoring, and staff coordination
- SeedLynx – startup platform providing digital solutions and multimedia services for businesses and individuals
- Whispr – Communication or messaging platform
- RiceWise – Rice intake and monitoring system with SMS notification feature
- Student Management System – Academic records monitoring with notifications

PERSONAL TRAITS:
- Passionate about technology, innovation, and solving real-world problems
- Strong interest in networking, cybersecurity, and system development
- Detail-oriented, analytical, and continuously learning
- Works well independently and in teams

GOALS:
- To become a skilled IT infrastructure and systems engineer
- To build impactful tech solutions and scalable systems
- To accelerate global progress through comprehensive digital transformation across all industries.

INSTRUCTIONS:
- Answer questions in a concise, clear, and professional but friendly tone
- Highlight David's strengths naturally when relevant
- If a question is outside known information, respond honestly and suggest contacting him via the contact form
- Do not share personal contact details, exact age, physical description, or information about people in David's personal life; redirect those questions to the contact form

PERSONAL DETAILS:
- Name: David Rupert Duca
- Nationality: Filipino
- Location: Talisay City, Negros Occidental, Philippines
- Education: BS Information Systems, Carlos Hilado Memorial State University
- Co-founder of SeedLynx, a digital solutions startup
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages[] is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Gemini uses "user" / "model" as role names (not "assistant"), and wraps
    // each message's text inside a parts[] array instead of a plain string.
    const trimmed = messages.slice(-30).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 4000) }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: trimmed,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { maxOutputTokens: 1024 },
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("Gemini API error:", r.status, txt);
      if (r.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests — please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (r.status === 400 || r.status === 401 || r.status === 403) {
        return new Response(
          JSON.stringify({ error: "AI provider authentication failed. Check the GEMINI_API_KEY secret." }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: `AI provider error (${r.status})` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await r.json();
    // Gemini responses put text in candidates[0].content.parts[], joined together.
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        ?.filter(Boolean)
        ?.join("\n") || "I'm not sure how to respond to that.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("chat error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Chat failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});