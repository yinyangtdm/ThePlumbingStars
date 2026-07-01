"use client";

import { useState } from "react";

const services = [
  "Drain Cleaning",
  "Sewer Line Repair",
  "Hydro Jetting",
  "Pipe Lining",
  "Epoxy Brush Coating",
  "Camera Inspection",
  "Trenchless Replacement",
  "Water Heater Replacement",
  "Other / Not Sure",
];

export default function BookingForm({ region }: { region: "losangeles" | "ventura" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    date: "",
    time: "",
    description: "",
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
          email: form.email || undefined,
          address: form.address,
          service: form.service,
          preferredDate: form.date || undefined,
          preferredTime: form.time || undefined,
          description: form.description || undefined,
          region,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at (747) 463-1853.");
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
          A real person will follow up within 5 minutes during business hours. For emergencies,
          call us directly.
        </p>
        <a
          href="tel:+17474631853"
          className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Call Now: (747) 463-1853
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy bg-white text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input type="text" required value={form.name} onChange={set("name")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input type="tel" required value={form.phone} onChange={set("phone")} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input type="email" value={form.email} onChange={set("email")} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Address / ZIP <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.address}
          onChange={set("address")}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What Do You Need Help With? <span className="text-red-500">*</span>
        </label>
        <select required value={form.service} onChange={set("service")} className={inputClass}>
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <input type="date" value={form.date} onChange={set("date")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
          <select value={form.time} onChange={set("time")} className={inputClass}>
            <option value="">Any time works</option>
            <option value="morning">Morning (8am – 12pm)</option>
            <option value="afternoon">Afternoon (12pm – 4pm)</option>
            <option value="evening">Evening (4pm – 8pm)</option>
            <option value="emergency">Emergency — ASAP</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue</label>
        <textarea
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
        className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
      >
        {submitting ? "Sending…" : "Send My Request"}
      </button>
    </form>
  );
}
