import { NextResponse } from "next/server";
import { getAllNewsletters, saveNewsletter } from "@/lib/newsletters";

export const dynamic = "force-dynamic";

async function sendViaSendGrid(
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return { success: false, error: "SENDGRID_API_KEY not configured" };
  }

  const fromEmail =
    process.env.SENDGRID_NEWSLETTER_FROM_EMAIL || "newsletter@clarity-engine.ai";

  const createRes = await fetch(
    "https://api.sendgrid.com/v3/marketing/singlesends",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Newsletter: ${subject} - ${new Date().toISOString()}`,
        send_to: { all: true },
        email_config: {
          subject,
          html_content: htmlContent,
          generate_plain_content: true,
        },
      }),
    }
  );

  if (createRes.ok) {
    const createData = (await createRes.json()) as { id?: string };
    if (createData.id) {
      const scheduleRes = await fetch(
        `https://api.sendgrid.com/v3/marketing/singlesends/${createData.id}/schedule`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ send_at: "now" }),
        }
      );

      if (scheduleRes.ok) {
        return { success: true };
      }
    }
  }

  // Fallback: fetch contacts and use mail/send
  const contactsRes = await fetch(
    "https://api.sendgrid.com/v3/marketing/contacts",
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );

  if (!contactsRes.ok) {
    return { success: false, error: "Failed to fetch contacts" };
  }

  const contactsData = (await contactsRes.json()) as {
    result?: Array<{ email: string }>;
  };
  const contacts = contactsData.result || [];

  if (contacts.length === 0) {
    return { success: false, error: "No contacts found" };
  }

  const batchSize = 1000;
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    const personalizations = batch.map((c) => ({ to: [{ email: c.email }] }));

    const sendRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations,
        from: { email: fromEmail },
        subject,
        content: [{ type: "text/html", value: htmlContent }],
      }),
    });

    if (!sendRes.ok) {
      const errData = await sendRes.text();
      return { success: false, error: `Mail send failed: ${errData}` };
    }
  }

  return { success: true };
}

export async function POST(request: Request) {
  const adminKey = process.env.ADMIN_API_KEY;
  const cronSecret = process.env.CRON_SECRET;
  if (!adminKey && !cronSecret) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    request.headers.get("x-cron-secret");

  const validTokens = [adminKey, cronSecret].filter(Boolean);
  if (!token || !validTokens.includes(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const newsletters = await getAllNewsletters();
  const due = newsletters
    .filter((n) => n.status === "queued" && new Date(n.sendDate) <= now)
    .sort(
      (a, b) =>
        new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime()
    );

  if (due.length === 0) {
    return NextResponse.json({ message: "No newsletters due for sending" });
  }

  const next = due[0];
  const result = await sendViaSendGrid(next.subject, next.bodyHtml);

  if (!result.success) {
    console.error(`Cron: failed to send newsletter ${next.id}:`, result.error);
    return NextResponse.json(
      { error: result.error || "Failed to send" },
      { status: 500 }
    );
  }

  next.status = "sent";
  next.sentAt = new Date().toISOString();
  await saveNewsletter(next);

  return NextResponse.json({
    success: true,
    sent: { id: next.id, title: next.title, sentAt: next.sentAt },
  });
}
