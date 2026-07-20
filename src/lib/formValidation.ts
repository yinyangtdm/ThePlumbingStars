import { bookingFormServiceOptions } from "@/lib/services";
import type { ContactData, LeadData, ReviewData } from "@/lib/mailer";

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  address: 200,
  service: 100,
  description: 5000,
  message: 5000,
  review: 5000,
  city: 100,
  coupon: 200,
  preferredDate: 40,
  preferredTime: 40,
} as const;

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const VALID_REGIONS = new Set(["losangeles", "ventura"]);
const VALID_PREFERRED_TIMES = new Set(["morning", "afternoon", "evening", "emergency"]);

export type ValidationResult<T> = { ok: true; data: T } | { ok: false; error: string };

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function requireText(
  value: unknown,
  label: string,
  max: number,
): ValidationResult<string> {
  const trimmed = asString(value).trim();
  if (!trimmed) return { ok: false, error: `${label} is required` };
  if (trimmed.length > max) return { ok: false, error: `${label} is too long` };
  return { ok: true, data: trimmed };
}

function optionalText(
  value: unknown,
  label: string,
  max: number,
): ValidationResult<string | undefined> {
  const trimmed = asString(value).trim();
  if (!trimmed) return { ok: true, data: undefined };
  if (trimmed.length > max) return { ok: false, error: `${label} is too long` };
  return { ok: true, data: trimmed };
}

function isValidEmailFormat(email: string): boolean {
  return email.length <= FIELD_LIMITS.email && EMAIL_RE.test(email);
}

function validateEmail(value: unknown, required: boolean): ValidationResult<string | undefined> {
  const trimmed = asString(value).trim();
  if (!trimmed) {
    return required
      ? { ok: false, error: "Email is required" }
      : { ok: true, data: undefined };
  }
  if (trimmed.length > FIELD_LIMITS.email || !EMAIL_RE.test(trimmed)) {
    return { ok: false, error: "Invalid email address" };
  }
  return { ok: true, data: trimmed };
}

function digitCount(phone: string): number {
  return phone.replace(/\D/g, "").length;
}

function validatePhone(value: unknown, required: boolean): ValidationResult<string | undefined> {
  const trimmed = asString(value).trim();
  if (!trimmed) {
    return required
      ? { ok: false, error: "Phone is required" }
      : { ok: true, data: undefined };
  }
  if (trimmed.length > FIELD_LIMITS.phone) {
    return { ok: false, error: "Phone is too long" };
  }
  const digits = digitCount(trimmed);
  if (digits < 10 || digits > 15) {
    return { ok: false, error: "Phone must include a valid number of digits" };
  }
  return { ok: true, data: trimmed };
}

export function validateBookingBody(body: unknown): ValidationResult<LeadData> {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }
  const raw = body as Record<string, unknown>;

  const name = requireText(raw.name, "Name", FIELD_LIMITS.name);
  if (!name.ok) return name;
  const phone = validatePhone(raw.phone, true);
  if (!phone.ok) return phone;
  const email = validateEmail(raw.email, true);
  if (!email.ok) return email;
  const address = requireText(raw.address, "Address", FIELD_LIMITS.address);
  if (!address.ok) return address;
  const service = requireText(raw.service, "Service", FIELD_LIMITS.service);
  if (!service.ok) return service;
  if (!bookingFormServiceOptions.includes(service.data)) {
    return { ok: false, error: "Invalid service selection" };
  }

  const regionRaw = asString(raw.region).trim() || "losangeles";
  if (!VALID_REGIONS.has(regionRaw)) {
    return { ok: false, error: "Invalid service area" };
  }

  const preferredDate = optionalText(raw.preferredDate, "Preferred date", FIELD_LIMITS.preferredDate);
  if (!preferredDate.ok) return preferredDate;
  const preferredTime = optionalText(raw.preferredTime, "Preferred time", FIELD_LIMITS.preferredTime);
  if (!preferredTime.ok) return preferredTime;
  if (preferredTime.data && !VALID_PREFERRED_TIMES.has(preferredTime.data)) {
    return { ok: false, error: "Invalid preferred time" };
  }
  const description = optionalText(raw.description, "Description", FIELD_LIMITS.description);
  if (!description.ok) return description;
  const coupon = optionalText(raw.coupon, "Coupon", FIELD_LIMITS.coupon);
  if (!coupon.ok) return coupon;

  return {
    ok: true,
    data: {
      name: name.data,
      phone: phone.data!,
      email: email.data,
      address: address.data,
      service: service.data,
      preferredDate: preferredDate.data,
      preferredTime: preferredTime.data,
      description: description.data,
      region: regionRaw as LeadData["region"],
      coupon: coupon.data,
    },
  };
}

export function validateContactBody(body: unknown): ValidationResult<ContactData> {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }
  const raw = body as Record<string, unknown>;

  const name = requireText(raw.name, "Name", FIELD_LIMITS.name);
  if (!name.ok) return name;
  const email = validateEmail(raw.email, true);
  if (!email.ok) return email;
  const phone = validatePhone(raw.phone, false);
  if (!phone.ok) return phone;
  const message = requireText(raw.message, "Message", FIELD_LIMITS.message);
  if (!message.ok) return message;

  return {
    ok: true,
    data: {
      name: name.data,
      email: email.data!,
      phone: phone.data,
      message: message.data,
    },
  };
}

export function validateReviewBody(body: unknown): ValidationResult<ReviewData> {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }
  const raw = body as Record<string, unknown>;

  const name = requireText(raw.name, "Name", FIELD_LIMITS.name);
  if (!name.ok) return name;
  const city = requireText(raw.city, "City", FIELD_LIMITS.city);
  if (!city.ok) return city;
  const review = requireText(raw.review, "Review", FIELD_LIMITS.review);
  if (!review.ok) return review;

  const numericRating = Number(raw.rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return { ok: false, error: "Rating must be between 1 and 5" };
  }

  return {
    ok: true,
    data: {
      name: name.data,
      city: city.data,
      rating: numericRating,
      review: review.data,
    },
  };
}
