"use client";

import Link from "next/link";
import { useLocationContext } from "./LocationProvider";
import { countyPathForRegion } from "@/lib/serviceLocations";

const COUNTY_LABEL: Record<"losangeles" | "ventura", string> = {
  losangeles: "LA County",
  ventura: "Ventura County",
};

export default function LocationIndicatorBar() {
  const { defaultLocation, status } = useLocationContext();

  if (status !== "resolved" || !defaultLocation) return null;

  return (
    <div className="border-t border-brand-navy/10 bg-brand-sky-light/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex justify-end">
        <Link
          href={`${countyPathForRegion(defaultLocation.region)}/${defaultLocation.id}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-red transition-colors"
          title="Your default service area — click to view your city page"
        >
          <svg
            className="w-3.5 h-3.5 text-brand-red shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>
            Your area: {defaultLocation.name}, {COUNTY_LABEL[defaultLocation.region]}
          </span>
        </Link>
      </div>
    </div>
  );
}
