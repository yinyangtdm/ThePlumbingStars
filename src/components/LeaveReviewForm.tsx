"use client";

import { useState } from "react";
import Link from "next/link";
import { HONEYPOT_FIELD } from "@/lib/formProtection";
import { PHONE_DISPLAY } from "@/lib/site";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="36"
      height="36"
      aria-hidden="true"
      className="block"
    >
      <path
        fill={filled ? "#b81f2a" : "#ffffff"}
        stroke="#b81f2a"
        strokeWidth="1.5"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          onClick={() => onChange(star)}
          className="p-0.5 rounded transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-1"
        >
          <StarIcon filled={star <= value} />
        </button>
      ))}
    </div>
  );
}

export default function LeaveReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    city: "",
    rating: 0,
    review: "",
    [HONEYPOT_FIELD]: "",
  });

  function set(field: "name" | "city" | "review" | typeof HONEYPOT_FIELD) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.rating < 1) {
      setError("Please select a star rating.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(`Something went wrong. Please try again or call us at ${PHONE_DISPLAY}.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-5xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You</h3>
        <p className="text-gray-600 mb-6">
          Your review has been submitted. We appreciate your feedback!
        </p>
        <Link href="/" className="inline-block px-6 py-3 border border-gray-200 rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-4 relative">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`review-${HONEYPOT_FIELD}`}>Website</label>
        <input
          id={`review-${HONEYPOT_FIELD}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form[HONEYPOT_FIELD]}
          onChange={set(HONEYPOT_FIELD)}
        />
      </div>

      <div>
        <label htmlFor="review-name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="review-name"
          required
          value={form.name}
          onChange={set("name")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
        />
      </div>

      <div>
        <label htmlFor="review-city" className="block text-sm font-medium text-gray-700 mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <input
          id="review-city"
          required
          value={form.city}
          onChange={set("city")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Rating <span className="text-red-500">*</span>
        </span>
        <StarRating value={form.rating} onChange={(rating) => setForm((prev) => ({ ...prev, rating }))} />
      </div>

      <div>
        <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">
          Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-text"
          required
          rows={5}
          value={form.review}
          onChange={set("review")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-bold px-4 py-2 rounded transition-colors"
        >
          {submitting ? "Sending…" : "Submit"}
        </button>
        <Link href="/" className="px-4 py-2 border border-gray-200 rounded">
          Cancel
        </Link>
      </div>
    </form>
  );
}
