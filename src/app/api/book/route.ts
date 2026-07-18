import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  isHoneypotTripped,
} from "@/lib/formProtection";
import { validateBookingBody } from "@/lib/formValidation";
import {
  isEmailConfigured,
  sendBookingConfirmationEmail,
  sendLeadEmail,
} from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit("book", ip)) {
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

  const parsed = validateBookingBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const lead = parsed.data;

  // Always retain the lead in logs so a delivery failure never loses customer data.
  console.info("[book] lead received", lead);

  if (!isEmailConfigured()) {
    console.error("[book] Email not configured — lead retained in logs only:", lead);
    return NextResponse.json(
      { error: "Email is not configured. Please call us to complete your request." },
      { status: 503 },
    );
  }

  try {
    await sendLeadEmail(lead);
  } catch (err) {
    console.error("[book] Owner notification failed:", err, lead);
    return NextResponse.json(
      { error: "Unable to send your request. Please call us directly." },
      { status: 502 },
    );
  }

  // Customer confirmation is best-effort — never undo a successful owner notify.
  try {
    await sendBookingConfirmationEmail(lead);
  } catch (err) {
    console.error("[book] Customer confirmation failed (owner was notified):", err);
  }

  return NextResponse.json({ ok: true });
}
