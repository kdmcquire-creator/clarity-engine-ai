import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: Request) {
  // Rate limit contact form submissions
  const rateLimitError = rateLimit(request, {
    maxRequests: 3,
    windowMs: 300_000,
  });
  if (rateLimitError) return rateLimitError;

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error("SENDGRID_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const toEmail =
      process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com";
    const fromEmail =
      process.env.SENDGRID_FROM_EMAIL || "noreply@clarity-engine.ai";

    // Use SendGrid v3 Mail Send API directly (fetch-based, Cloudflare Workers compatible)
    const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: toEmail }] }],
        from: { email: fromEmail, name: "Clarity Engine AI" },
        reply_to: { email, name },
        subject: `Contact Form: Message from ${name}`,
        content: [
          {
            type: "text/plain",
            value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
          {
            type: "text/html",
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
            `,
          },
        ],
      }),
    });

    if (!sgResponse.ok) {
      const errorBody = await sgResponse.text();
      console.error(
        JSON.stringify({
          type: "contact_form_send_error",
          status: sgResponse.status,
          body: errorBody,
        })
      );
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    console.log(
      JSON.stringify({
        type: "contact_form_sent",
        to: toEmail,
        from: email,
        name,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      JSON.stringify({
        type: "contact_form_error",
        error: error instanceof Error ? error.message : "Unknown",
      })
    );
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
