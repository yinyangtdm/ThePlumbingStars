import nodemailer from "nodemailer";

export function isEmailConfigured(): boolean {
  return !!(
    process.env.RESEND_API_KEY ||
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
  );
}

function bookingDestination(): string {
  return process.env.BOOKING_TO ?? "info@theplumbingstars.com";
}

function reviewDestination(): string {
  return process.env.REVIEW_TO ?? "info@theplumbingstars.com";
}

type OutboundEmail = {
  to: string;
  subject: string;
  html: string;
};

async function sendViaResend({ to, subject, html }: OutboundEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const from =
    process.env.EMAIL_FROM ?? "The Plumbing Stars <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }
}

async function sendViaGmail({ to, subject, html }: OutboundEmail): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Gmail credentials are not set");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"The Plumbing Stars" <${user}>`,
    to,
    subject,
    html,
  });
}

async function deliverEmail(payload: OutboundEmail): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    await sendViaResend(payload);
    return;
  }

  await sendViaGmail(payload);
}

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  description?: string;
  region: "losangeles" | "ventura";
}

export interface ReviewData {
  name: string;
  city: string;
  rating: number;
  review: string;
}

export async function sendLeadEmail(data: LeadData): Promise<void> {
  const regionLabel = data.region === "losangeles" ? "Los Angeles" : "Ventura County";

  await deliverEmail({
    to: bookingDestination(),
    subject: `New Booking Request — ${regionLabel}`,
    html: `
      <h2 style="color:#0b2a55">New Booking Request — ${regionLabel}</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email ?? "—"}</td></tr>
        <tr><td><strong>Address / ZIP</strong></td><td>${data.address}</td></tr>
        <tr><td><strong>Service</strong></td><td>${data.service}</td></tr>
        <tr><td><strong>Preferred Date</strong></td><td>${data.preferredDate ?? "—"}</td></tr>
        <tr><td><strong>Preferred Time</strong></td><td>${data.preferredTime ?? "—"}</td></tr>
        <tr><td><strong>Description</strong></td><td>${data.description ?? "—"}</td></tr>
      </table>
      <hr style="margin-top:24px"/>
      <p style="color:#888;font-size:12px">Submitted via theplumbingstars.com/${data.region}</p>
    `,
  });
}

export async function sendReviewEmail(data: ReviewData): Promise<void> {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

  await deliverEmail({
    to: reviewDestination(),
    subject: `New Customer Review — ${data.rating}/5 from ${data.name}`,
    html: `
      <h2 style="color:#0b2a55">New Customer Review</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>City</strong></td><td>${data.city}</td></tr>
        <tr><td><strong>Rating</strong></td><td>${data.rating}/5 (${stars})</td></tr>
        <tr><td valign="top"><strong>Review</strong></td><td>${data.review.replace(/\n/g, "<br/>")}</td></tr>
      </table>
      <hr style="margin-top:24px"/>
      <p style="color:#888;font-size:12px">Submitted via theplumbingstars.com/leave-review</p>
    `,
  });
}
