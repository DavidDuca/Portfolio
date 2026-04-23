import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/contact
 * Sends an email via Gmail SMTP using a Google App Password.
 *
 * Required Vercel environment variables:
 *   GMAIL_USER          → e.g. davidduca95@gmail.com
 *   GMAIL_APP_PASSWORD  → 16-char app password from https://myaccount.google.com/apppasswords
 *   CONTACT_TO          → (optional) destination address; defaults to GMAIL_USER
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body ?? {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name, email and message are required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }
    if (message.length > 5000 || name.length > 200) {
      return res.status(400).json({ error: "Input too long." });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env var.");
      return res.status(500).json({ error: "Email service not configured." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const to = process.env.CONTACT_TO || user;
    const safeSubject = (subject?.trim() || "New portfolio contact").slice(0, 200);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] ${safeSubject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#0c1c31;color:#e6ecf6;border-radius:14px">
          <h2 style="color:#4ab6c8;margin:0 0 16px">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
          <hr style="border-color:#1a2c44"/>
          <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: err?.message || "Failed to send message." });
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
