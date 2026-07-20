import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  isAllowedFormOrigin,
  isHoneypotTripped,
  isJsonBodyTooLarge,
} from "@/lib/formProtection";
import { validateReviewBody } from "@/lib/formValidation";
import { isEmailConfigured, sendReviewEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  if (!isAllowedFormOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (isJsonBodyTooLarge(req)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit("review", ip)) {
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

  const parsed = validateReviewBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  console.info("[review] review received", {
    rating: parsed.data.rating,
    cityLength: parsed.data.city.length,
  });

  if (!isEmailConfigured()) {
    console.error("[review] Email not configured — review not emailed");
    return NextResponse.json(
      { error: "Email is not configured. Please try again later." },
      { status: 503 },
    );
  }

  try {
    await sendReviewEmail(parsed.data);
  } catch (err) {
    console.error(
      "[review] Owner notification failed:",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { error: "Unable to submit your review. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
