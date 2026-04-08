import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, sanitizeSource } from "@/lib/subscribers";

export async function POST(request: Request) {
  const rateLimitError = rateLimit(request, {
    maxRequests: 5,
    windowMs: 60_000,
  });
  if (rateLimitError) return rateLimitError;

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, source } = body;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 400 }
    );
  }

  // Log the subscription (structured logging for Cloudflare)
  console.log(
    JSON.stringify({
      type: "newsletter_subscribe",
      email,
      source: sanitizeSource(source),
      subscribedAt: new Date().toISOString(),
    })
  );

  // If SendGrid is configured, add to marketing contacts
  if (process.env.SENDGRID_API_KEY) {
    try {
      const sgResponse = await fetch(
        "https://api.sendgrid.com/v3/marketing/contacts",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contacts: [
              {
                email,
                custom_fields: {
                  signup_source: sanitizeSource(source),
                },
              },
            ],
          }),
        }
      );

      if (!sgResponse.ok) {
        console.error(
          JSON.stringify({
            type: "sendgrid_contact_error",
            status: sgResponse.status,
            body: await sgResponse.text(),
          })
        );
      }
    } catch (err) {
      console.error(
        JSON.stringify({
          type: "sendgrid_contact_error",
          error: err instanceof Error ? err.message : "Unknown",
        })
      );
    }
  }

  return NextResponse.json({ success: true });
}
