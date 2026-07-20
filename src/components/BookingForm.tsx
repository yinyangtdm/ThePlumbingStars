"use client";

import { useState } from "react";
import type { Coupon } from "@/lib/coupons";
import { HONEYPOT_FIELD } from "@/lib/formProtection";
import type { ServiceRegion } from "@/lib/serviceLocations";
import { bookingFormServiceOptions } from "@/lib/services";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const serviceAreas: { value: ServiceRegion; label: string }[] = [
  { value: "losangeles", label: "Los Angeles County" },
  { value: "ventura", label: "Ventura County" },
];

export default function BookingForm({
  region,
  coupon,
}: {
  /** Pre-selected service area; the customer can still change it in the form. */
  region?: ServiceRegion;
  coupon?: Coupon;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    region: region ?? "losangeles",
    name: "",
    phone: "",
    email: "",
    address: "",
    service: coupon?.service ?? "",
    date: "",
    time: "",
    description: "",
    [HONEYPOT_FIELD]: "",
  });

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          service: form.service,
          preferredDate: form.date || undefined,
          preferredTime: form.time || undefined,
          description: form.description || undefined,
          region: form.region,
          coupon: coupon ? `${coupon.offer} — ${coupon.title}` : undefined,
          [HONEYPOT_FIELD]: form[HONEYPOT_FIELD],
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(`Something went wrong. Please call us directly at ${PHONE_DISPLAY}.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-5xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received</h3>
        <p className="text-gray-600 mb-6">
          A confirmation email is on its way. A real person will follow up within 5 minutes during
          business hours. For emergencies, call us directly.
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Call Now: {PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`book-${HONEYPOT_FIELD}`}>Website</label>
        <input
          id={`book-${HONEYPOT_FIELD}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form[HONEYPOT_FIELD]}
          onChange={set(HONEYPOT_FIELD)}
        />
      </div>

      {coupon && (
        <div className="p-4 bg-brand-sky-light border border-brand-sky rounded-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/70 mb-1">
            Selected Coupon
          </p>
          <p className="font-display text-2xl font-bold text-brand-red leading-none mb-1">
            {coupon.offer}
          </p>
          <p className="font-sans normal-case font-bold text-gray-900">{coupon.title}</p>
        </div>
      )}

      <div>
        <label htmlFor="book-region" className="block text-sm font-medium text-gray-700 mb-1">
          Service Area <span className="text-red-500">*</span>
        </label>
        <select
          id="book-region"
          required
          value={form.region}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, region: e.target.value as ServiceRegion }))
          }
          className={inputClass}
        >
          {serviceAreas.map((area) => (
            <option key={area.value} value={area.value}>
              {area.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="book-name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="book-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={set("name")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="book-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="book-phone"
            type="tel"
            name="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="book-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="book-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="book-address" className="block text-sm font-medium text-gray-700 mb-1">
          Service Address / ZIP <span className="text-red-500">*</span>
        </label>
        <input
          id="book-address"
          type="text"
          name="street-address"
          autoComplete="street-address"
          required
          value={form.address}
          onChange={set("address")}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="book-service" className="block text-sm font-medium text-gray-700 mb-1">
          What Do You Need Help With? <span className="text-red-500">*</span>
        </label>
        <select
          id="book-service"
          required
          value={form.service}
          onChange={set("service")}
          className={inputClass}
        >
          <option value="">Select a service…</option>
          {bookingFormServiceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="book-date" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date
          </label>
          <input
            id="book-date"
            type="date"
            value={form.date}
            onChange={set("date")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="book-time" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time
          </label>
          <select id="book-time" value={form.time} onChange={set("time")} className={inputClass}>
            <option value="">Any time works</option>
            <option value="morning">Morning (8am – 12pm)</option>
            <option value="afternoon">Afternoon (12pm – 4pm)</option>
            <option value="evening">Evening (4pm – 8pm)</option>
            <option value="emergency">Emergency — ASAP</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="book-description" className="block text-sm font-medium text-gray-700 mb-1">
          Describe the Issue
        </label>
        <textarea
          id="book-description"
          rows={4}
          value={form.description}
          onChange={set("description")}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <p className="text-xs text-gray-400">No spam, no robocalls, no upsells.</p>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-bold py-4 px-6 rounded-[3px] text-lg uppercase tracking-wider transition-colors"
      >
        {submitting ? "Sending…" : "Send My Request"}
      </button>
    </form>
  );
}
