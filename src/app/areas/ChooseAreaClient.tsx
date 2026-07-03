"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRegionByZip } from "@/lib/zipLookup";

export default function ChooseArea() {
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const cleaned = zip.trim();
    if (!/^\d{5}$/.test(cleaned)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    const region = getRegionByZip(cleaned);
    if (region) {
      router.push(`/${region}`);
    } else {
      setError("We don't currently service that ZIP code. Try another or contact us.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-brand-navy">Enter ZIP code</label>
      <div className="flex gap-2 items-center">
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="e.g. 91301"
          className="min-w-0 flex-1 border rounded px-3 py-2"
        />
        <button className="flex-none bg-brand-red text-white px-4 py-2 rounded font-bold" type="submit">
          Check
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}

