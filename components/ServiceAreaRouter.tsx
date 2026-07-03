"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRegionByZip } from "@/lib/zipLookup";

export default function ServiceAreaRouter() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = zip.trim();
    if (trimmed.length !== 5) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    const region = getRegionByZip(trimmed);
    if (region) {
      router.push(`/${region}`);
    } else {
      setError("We couldn't match that ZIP to a service area. Please select your region below or call us.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder="Enter your ZIP code"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-navy text-gray-900"
        />
        <button
          type="submit"
          className="bg-brand-navy hover:bg-brand-navy-dark text-white font-bold px-4 py-3 rounded-lg transition-colors whitespace-nowrap"
        >
          Find My Area
        </button>
      </form>

      {error && <p className="text-red-600 text-sm -mt-2">{error}</p>}

      <p className="text-gray-400 text-sm">— or choose your region —</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <a
          href="/losangeles"
          className="group border-2 border-brand-navy rounded-xl p-6 hover:bg-brand-navy transition-colors text-center"
        >
          <p className="font-bold text-brand-navy group-hover:text-white text-lg mb-1">
            Los Angeles
          </p>
          <p className="text-gray-500 group-hover:text-white/80 text-sm">
            San Fernando Valley, Westside, Glendale, Pasadena &amp; more
          </p>
        </a>
        <a
          href="/ventura"
          className="group border-2 border-brand-navy rounded-xl p-6 hover:bg-brand-navy transition-colors text-center"
        >
          <p className="font-bold text-brand-navy group-hover:text-white text-lg mb-1">
            Ventura County
          </p>
          <p className="text-gray-500 group-hover:text-white/80 text-sm">
            Ventura, Oxnard, Thousand Oaks, Camarillo, Simi Valley
          </p>
        </a>
      </div>
    </div>
  );
}
