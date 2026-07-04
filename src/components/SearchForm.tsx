"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { countyPathForRegion, findCityByName } from "@/lib/serviceLocations";
import { getRegionByZip } from "@/lib/zipLookup";

export default function SearchForm() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleanedZip = zip.replace(/\D/g, "");
    const cleanedCity = city.trim();

    if (cleanedZip) {
      if (cleanedZip.length !== 5) {
        setError("Please enter a valid 5-digit ZIP code.");
        return;
      }
      const region = getRegionByZip(cleanedZip);
      if (!region) {
        setError("We don't currently service that ZIP code. Try a city name or contact us.");
        return;
      }
      router.push(`${countyPathForRegion(region)}?zip=${cleanedZip}`);
      return;
    }

    if (cleanedCity) {
      const match = findCityByName(cleanedCity);
      if (!match) {
        setError(
          "We couldn't find that city in our service area. Try the full city name or search by ZIP."
        );
        return;
      }
      router.push(countyPathForRegion(match.region));
      return;
    }

    setError("Enter a ZIP code or city name to search.");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
      <div>
        <label htmlFor="search-zip" className="block text-sm font-medium text-gray-700 mb-1">
          ZIP code
        </label>
        <input
          id="search-zip"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            if (e.target.value.replace(/\D/g, "")) setCity("");
            setError("");
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
          placeholder="e.g. 91301"
        />
      </div>

      <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wide">
        or
      </p>

      <div>
        <label htmlFor="search-city" className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          id="search-city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.trim()) setZip("");
            setError("");
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
          placeholder="e.g. Moorpark"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-brand-navy hover:bg-brand-navy-dark text-white font-bold px-4 py-2 rounded transition-colors"
        >
          Search
        </button>
        <Link href="/" className="px-4 py-2 border border-gray-200 rounded">
          Cancel
        </Link>
      </div>
    </form>
  );
}
