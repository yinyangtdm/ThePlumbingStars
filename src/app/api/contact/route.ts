import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  isHoneypotTripped,
} from "@/lib/formProtection";
import { validateContactBody } from "@/lib/formValidation";
import { isEmailConfigured, sendContactEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit("contact", ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body && typeof body === "object" && isHoneypotTripped(body as Record<string, unknown>)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = validateContactBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const contact = parsed.data;

  console.info("[contact] message received", contact);

  if (!isEmailConfigured()) {
    console.error("[contact] Email not configured — message retained in logs only:", contact);
    return NextResponse.json(
      { error: "Email is not configured. Please call us to complete your request." },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(contact);
  } catch (err) {
    console.error("[contact] Owner notification failed:", err, contact);
    return NextResponse.json(
      { error: "Unable to send your message. Please call us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
