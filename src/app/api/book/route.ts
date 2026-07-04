import { NextRequest, NextResponse } from "next/server";
import { isEmailConfigured, sendLeadEmail, type LeadData } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  // Parse & validate
  const body = await req.json();
  const { name, phone, email, address, service, preferredDate, preferredTime, description, region, coupon } =
    body as Partial<LeadData & { preferredDate: string; preferredTime: string }>;

  if (!name || !phone || !address || !service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead: LeadData = {
    name,
    phone,
    email,
    address,
    service,
    preferredDate,
    preferredTime,
    description,
    region: region ?? "losangeles",
    coupon,
  };

  // Tier 2 — Email
  let emailed = false;
  if (isEmailConfigured()) {
    await sendLeadEmail(lead);
    emailed = true;
  }

  // Fallback — never silently lose a lead
  if (!emailed) {
    console.warn("[book] Email not configured — lead received but not sent:", lead);
  }

  return NextResponse.json({ ok: true });
}
