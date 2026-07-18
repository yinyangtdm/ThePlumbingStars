"use client";

import { useState } from "react";
import Link from "next/link";
import { HONEYPOT_FIELD } from "@/lib/formProtection";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    [HONEYPOT_FIELD]: "",
  });

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message,
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent</h3>
        <p className="text-gray-600 mb-6">
          Thanks for reaching out. We&apos;ll get back to you as soon as we can. For emergencies,
          call us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Call Now: {PHONE_DISPLAY}
          </a>
          <Link
            href="/"
            className="inline-block px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`contact-${HONEYPOT_FIELD}`}>Website</label>
        <input
          id={`contact-${HONEYPOT_FIELD}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form[HONEYPOT_FIELD]}
          onChange={set(HONEYPOT_FIELD)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input type="text" required value={form.name} onChange={set("name")} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input type="tel" value={form.phone} onChange={set("phone")} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
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
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
