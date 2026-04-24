const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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
- GrillSync – Smart grilling and monitoring system
- SeedLynx – startup platform providing digital solutions and multimedia services for businesses and individuals
- Whispr – Communication or messaging platform
- RiceWise – Rice intake and monitoring system with SMS notification feature
- Student Management System – Academic records monitoring with notifications

PERSONAL TRAITS:
- Passionate about technology, innovation, and solving real-world problemssss
- Strong interest in networking, cybersecurity, and system development
- Detail-oriented, analytical, and continuously learning
- Works well independently and in teams

GOALS:
- To become a skilled IT infrastructure and systems engineer
- To build impactful tech solutions and scalable systems
- To contribute to digital transformation in education and agriculture

INSTRUCTIONS:
- Answer questions in a concise, clear, and professional but friendly tone
- Highlight David’s strengths naturally when relevant
- If a question is outside known information, respond honestly and suggest contacting him via the contact form
- Do NOT invent personal or sensitive information (e.g., exact address, phone numbers, passwords, private data)
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
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

    const trimmed = messages.slice(-30).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content).slice(0, 4000),
    }));

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("Lovable AI error:", r.status, txt);
      if (r.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests — please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (r.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add credits in Lovable → Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: `AI provider error (${r.status})` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content || "I'm not sure how to respond to that.";

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
