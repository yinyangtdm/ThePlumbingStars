import nodemailer from "nodemailer";
import { BUSINESS_EMAIL, PHONE_DISPLAY, PHONE_TEL, SITE_NAME, SITE_URL } from "@/lib/site";

/** True for local `next dev` and non-production Vercel (preview/dev). */
export function isNonProductionEmailEnv(): boolean {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV !== "production";
  }
  return process.env.NODE_ENV !== "production";
}

export function isEmailConfigured(): boolean {
  return !!(
    process.env.RESEND_API_KEY ||
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
  );
}

/** Strip CR/LF and other control chars from values used in email headers. */
function sanitizeHeaderValue(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\0-\x1f\x7f]/g, "").trim();
}

const HEADER_EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function isSafeEmailHeader(email: string): boolean {
  const cleaned = sanitizeHeaderValue(email);
  return cleaned.length > 0 && cleaned.length <= 254 && HEADER_EMAIL_RE.test(cleaned);
}

function parseAddressList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((addr) => sanitizeHeaderValue(addr))
    .filter((addr) => isSafeEmailHeader(addr));
}

/**
 * Comma-separated override via `envName`.
 * Production: falls back to BUSINESS_EMAIL when unset.
 * Non-production: requires an explicit override so leads never hit the company inbox by accident.
 */
function resolveDestinations(envName: "BOOKING_TO" | "REVIEW_TO"): string[] {
  const list = parseAddressList(process.env[envName]);
  if (list.length > 0) return list;

  if (isNonProductionEmailEnv()) {
    throw new Error(
      `Set ${envName} to a test inbox for local email testing (do not use ${BUSINESS_EMAIL}).`,
    );
  }

  return [BUSINESS_EMAIL];
}

/** Booking + contact inbox. Production falls back to BUSINESS_EMAIL; local/dev requires BOOKING_TO. */
export function getBookingDestinations(): string[] {
  return resolveDestinations("BOOKING_TO");
}

/** Review inbox. Production falls back to BUSINESS_EMAIL; local/dev requires REVIEW_TO. */
export function getReviewDestinations(): string[] {
  return resolveDestinations("REVIEW_TO");
}

type OutboundEmail = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

type DeliverResult = {
  id?: string;
  provider: "resend" | "gmail";
};

async function sendViaResend({ to, subject, html, replyTo }: OutboundEmail): Promise<DeliverResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const from =
    process.env.EMAIL_FROM ?? "The Plumbing Stars <onboarding@resend.dev>";

  const recipients = Array.isArray(to) ? to : [to];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  const detail = await response.text();
  if (!response.ok) {
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }

  let id: string | undefined;
  try {
    id = (JSON.parse(detail) as { id?: string }).id;
  } catch {
    // ignore parse errors — delivery still succeeded
  }

  return { id, provider: "resend" };
}

async function sendViaGmail({ to, subject, html, replyTo }: OutboundEmail): Promise<DeliverResult> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Gmail credentials are not set");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: `"The Plumbing Stars" <${user}>`,
    to: Array.isArray(to) ? to.join(", ") : to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  return { id: info.messageId, provider: "gmail" };
}

async function deliverEmail(payload: OutboundEmail): Promise<DeliverResult> {
  const recipients = (Array.isArray(payload.to) ? payload.to : [payload.to])
    .map(sanitizeHeaderValue)
    .filter((addr) => isSafeEmailHeader(addr));
  if (recipients.length === 0) {
    throw new Error("No valid email recipients");
  }

  const subject = sanitizeHeaderValue(payload.subject);
  const replyTo =
    payload.replyTo && isSafeEmailHeader(payload.replyTo)
      ? sanitizeHeaderValue(payload.replyTo)
      : undefined;

  const safe: OutboundEmail = {
    to: recipients,
    subject,
    html: payload.html,
    ...(replyTo ? { replyTo } : {}),
  };

  if (process.env.RESEND_API_KEY) {
    return sendViaResend(safe);
  }

  return sendViaGmail(safe);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPreferredTime(value?: string): string {
  if (!value) return "—";
  const labels: Record<string, string> = {
    morning: "Morning (8am – 12pm)",
    afternoon: "Afternoon (12pm – 4pm)",
    evening: "Evening (4pm – 8pm)",
    emergency: "Emergency — ASAP",
  };
  return labels[value] ?? value;
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
  coupon?: string;
}

export interface ReviewData {
  name: string;
  city: string;
  rating: number;
  review: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendLeadEmail(data: LeadData): Promise<DeliverResult> {
  const regionLabel = data.region === "losangeles" ? "Los Angeles" : "Ventura County";
  const to = getBookingDestinations();

  const result = await deliverEmail({
    to,
    subject: `New Booking Request — ${regionLabel}`,
    html: `
      <h2 style="color:#0b2a55">New Booking Request — ${regionLabel}</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email ?? "—")}</td></tr>
        <tr><td><strong>Address / ZIP</strong></td><td>${escapeHtml(data.address)}</td></tr>
        <tr><td><strong>Service</strong></td><td>${escapeHtml(data.service)}</td></tr>
        <tr><td><strong>Coupon</strong></td><td>${escapeHtml(data.coupon ?? "—")}</td></tr>
        <tr><td><strong>Preferred Date</strong></td><td>${escapeHtml(data.preferredDate ?? "—")}</td></tr>
        <tr><td><strong>Preferred Time</strong></td><td>${escapeHtml(formatPreferredTime(data.preferredTime))}</td></tr>
        <tr><td><strong>Description</strong></td><td>${escapeHtml(data.description ?? "—")}</td></tr>
      </table>
      <hr style="margin-top:24px"/>
      <p style="color:#888;font-size:12px">Submitted via ${SITE_URL}/schedule</p>
    `,
  });

  console.info("[mailer] lead email sent", { to, id: result.id, provider: result.provider });
  return result;
}

export async function sendBookingConfirmationEmail(data: LeadData): Promise<DeliverResult> {
  if (!data.email || !isSafeEmailHeader(data.email)) {
    throw new Error("Cannot send booking confirmation without a customer email");
  }

  const result = await deliverEmail({
    to: data.email,
    replyTo: BUSINESS_EMAIL,
    subject: `We received your service request — ${SITE_NAME}`,
    html: `
      <div style="font-family:sans-serif;font-size:14px;color:#222;line-height:1.5">
        <h2 style="color:#0b2a55;margin-bottom:8px">Request received</h2>
        <p>Hi ${escapeHtml(data.name)},</p>
        <p>
          Thanks for contacting ${SITE_NAME}. We received your service request and a real person
          will follow up within 5 minutes during business hours.
        </p>
        <table cellpadding="6" style="font-size:14px;margin:16px 0">
          <tr><td><strong>Service</strong></td><td>${escapeHtml(data.service)}</td></tr>
          <tr><td><strong>Address / ZIP</strong></td><td>${escapeHtml(data.address)}</td></tr>
          <tr><td><strong>Preferred Date</strong></td><td>${escapeHtml(data.preferredDate ?? "—")}</td></tr>
          <tr><td><strong>Preferred Time</strong></td><td>${escapeHtml(formatPreferredTime(data.preferredTime))}</td></tr>
        </table>
        <p>
          For emergencies, call us anytime at
          <a href="tel:${PHONE_TEL}" style="color:#0b2a55;font-weight:bold">${PHONE_DISPLAY}</a>.
        </p>
        <p style="margin-top:24px">— ${SITE_NAME}</p>
        <hr style="margin-top:24px"/>
        <p style="color:#888;font-size:12px">Submitted via ${SITE_URL}/schedule</p>
      </div>
    `,
  });

  console.info("[mailer] booking confirmation sent", {
    to: data.email,
    id: result.id,
    provider: result.provider,
  });
  return result;
}

export async function sendContactEmail(data: ContactData): Promise<DeliverResult> {
  const to = getBookingDestinations();

  const result = await deliverEmail({
    to,
    replyTo: isSafeEmailHeader(data.email) ? data.email : undefined,
    subject: "New Contact Message",
    html: `
      <h2 style="color:#0b2a55">New Contact Message</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone ?? "—")}</td></tr>
        <tr><td valign="top"><strong>Message</strong></td><td>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</td></tr>
      </table>
      <hr style="margin-top:24px"/>
      <p style="color:#888;font-size:12px">Submitted via ${SITE_URL}/contact</p>
    `,
  });

  console.info("[mailer] contact email sent", { to, id: result.id, provider: result.provider });
  return result;
}

export async function sendReviewEmail(data: ReviewData): Promise<DeliverResult> {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
  const to = getReviewDestinations();

  const safeName = sanitizeHeaderValue(data.name).slice(0, 100) || "Customer";

  const result = await deliverEmail({
    to,
    subject: `New Customer Review — ${data.rating}/5 from ${safeName}`,
    html: `
      <h2 style="color:#0b2a55">New Customer Review</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td><strong>City</strong></td><td>${escapeHtml(data.city)}</td></tr>
        <tr><td><strong>Rating</strong></td><td>${data.rating}/5 (${stars})</td></tr>
        <tr><td valign="top"><strong>Review</strong></td><td>${escapeHtml(data.review).replace(/\n/g, "<br/>")}</td></tr>
      </table>
      <hr style="margin-top:24px"/>
      <p style="color:#888;font-size:12px">Submitted via ${SITE_URL}/leave-review</p>
    `,
  });

  console.info("[mailer] review email sent", { to, id: result.id, provider: result.provider });
  return result;
}
