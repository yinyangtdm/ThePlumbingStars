"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ServiceMap from "./ServiceMap";
import {
  sortLocationsByDistance,
  type ServiceLocation,
  type ServiceRegion,
} from "@/lib/serviceLocations";
import { getRegionByZip, getZipCoordinates } from "@/lib/zipLookup";

/** Must match ServiceMapClient map height. Sized for two full city cards + gap. */
const MAP_HEIGHT_PX = 412;

interface Props {
  initialLocations: ServiceLocation[];
  region: ServiceRegion;
  fallbackCities?: string[];
  initialZip?: string;
  geoAnchor?: [number, number] | null;
  geoPrimaryId?: string;
}

function countyForRegion(region: ServiceRegion): "la" | "ventura" {
  return region === "losangeles" ? "la" : "ventura";
}

function otherCountyPath(region: ServiceRegion): string {
  return region === "losangeles" ? "/ventura" : "/losangeles";
}

function sortedFromZip(
  locations: ServiceLocation[],
  zipCode: string,
  region: ServiceRegion
): ServiceLocation[] | null {
  if (zipCode.length !== 5 || getRegionByZip(zipCode) !== region) return null;
  const coords = getZipCoordinates(zipCode);
  if (!coords) return null;
  return sortLocationsByDistance(locations, coords);
}

function nearestIdFromZip(
  locations: ServiceLocation[],
  zipCode: string,
  region: ServiceRegion
): string | undefined {
  const sorted = sortedFromZip(locations, zipCode, region);
  return sorted?.[0]?.id;
}

export default function CountyServiceExplorer({
  initialLocations,
  region,
  fallbackCities = [],
  initialZip = "",
  geoAnchor = null,
  geoPrimaryId,
}: Props) {
  const router = useRouter();
  const [locations, setLocations] = useState(() =>
    sortedFromZip(initialLocations, initialZip, region) ?? initialLocations
  );
  const [primaryId, setPrimaryId] = useState<string | undefined>(() =>
    initialZip ? nearestIdFromZip(initialLocations, initialZip, region) : undefined
  );
  const [zip, setZip] = useState(initialZip);
  const [zipError, setZipError] = useState("");
  const citiesHeadingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mobileScrollDone = useRef(false);

  const applySort = useCallback(
    (anchor: [number, number], primary?: string) => {
      setLocations(sortLocationsByDistance(initialLocations, anchor, primary));
      setPrimaryId(primary);
      requestAnimationFrame(() => {
        if (listRef.current) {
          listRef.current.scrollTop = 0;
        }
      });
    },
    [initialLocations]
  );

  useEffect(() => {
    if (initialZip || !geoAnchor) return;
    applySort(geoAnchor, geoPrimaryId);
  }, [initialZip, geoAnchor, geoPrimaryId, applySort]);

  useEffect(() => {
    if (mobileScrollDone.current) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    if (locations.length === 0) return;

    const scrollMobileView = () => {
      const heading = citiesHeadingRef.current;
      if (!heading) return;

      const headerOffset = 100;
      const headingBottom = heading.getBoundingClientRect().bottom + window.scrollY;
      const target = headingBottom - headerOffset;

      if (window.scrollY >= target - 8) return;

      window.scrollTo({ top: Math.max(0, target), behavior: "auto" });
      mobileScrollDone.current = true;
    };

    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(scrollMobileView);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [locations]);

  const handleZipSearch = useCallback(
    (zipCode: string) => {
      const trimmed = zipCode.trim();
      if (trimmed.length !== 5) {
        setZipError("Please enter a valid 5-digit ZIP code.");
        return;
      }
      const matchedRegion = getRegionByZip(trimmed);
      if (!matchedRegion) {
        setZipError(
          "We couldn't match that ZIP to a service area. Please select your region below or call us."
        );
        return;
      }
      if (matchedRegion !== region) {
        router.push(`${otherCountyPath(region)}?zip=${trimmed}`);
        return;
      }
      const coords = getZipCoordinates(trimmed);
      if (!coords) {
        setZipError("We couldn't locate that ZIP. Please try again or call us.");
        return;
      }
      setZipError("");
      const nearest = sortLocationsByDistance(initialLocations, coords)[0];
      applySort(coords, nearest?.id);
    },
    [applySort, initialLocations, region, router]
  );

  function handleZipSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleZipSearch(zip);
  }

  function handleSelectLocation(id: string) {
    const loc = initialLocations.find((l) => l.id === id);
    if (!loc) return;
    applySort(loc.coords, id);
  }

  function renderLocationCard(loc: ServiceLocation) {
    return (
      <article
        key={loc.id}
        className={`bg-white rounded shadow p-4 transition ring-2 shrink-0 ${
          loc.id === primaryId ? "ring-brand-red" : "ring-transparent"
        }`}
      >
        <h3 className="text-lg font-semibold mb-1">{loc.name}</h3>
        <p className="text-sm text-gray-600 mb-3">
          Serving {loc.name} and surrounding areas.
        </p>
        <div className="grid grid-cols-3 gap-2 w-full">
          <a
            href="tel:+17474631853"
            className="flex items-center justify-center px-2 py-2 bg-brand-navy text-white rounded text-sm text-center"
          >
            Call
          </a>
          <a
            href="/services"
            className="flex items-center justify-center px-2 py-2 border border-gray-200 rounded text-sm text-center"
          >
            Services
          </a>
          <a
            href="/coupons"
            className="flex items-center justify-center px-2 py-2 border border-gray-200 rounded text-sm text-center"
          >
            Coupons
          </a>
        </div>
        <div className="mt-4">
          <a
            href="/schedule"
            className="block w-full text-center bg-brand-red text-white font-bold px-4 py-3 rounded"
          >
            Schedule a Service
          </a>
        </div>
      </article>
    );
  }

  return (
    <section id="cities-section" className="py-12 px-4 sm:px-6 bg-brand-light">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={citiesHeadingRef}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Cities We Serve
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Highlighted service cities — search your ZIP or click a star on the map.
        </p>

        <form
          onSubmit={handleZipSubmit}
          className="flex gap-2 w-full max-w-md mb-4 p-3 rounded-lg bg-brand-sky-light border border-brand-sky shadow-sm"
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setZipError("");
            }}
            placeholder="Enter your ZIP code"
            className="flex-1 px-3 py-2 text-sm rounded-md border border-brand-sky bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-gray-900"
          />
          <button
            type="submit"
            className="bg-brand-navy hover:bg-brand-navy-dark text-white font-semibold text-sm px-3 py-2 rounded-md transition-colors whitespace-nowrap"
          >
            Find My Area
          </button>
        </form>
        {zipError && <p className="text-red-600 text-sm mb-4">{zipError}</p>}

        <div
          className="flex flex-col lg:flex-row lg:gap-6 lg:items-start"
          style={{ "--explorer-height": `${MAP_HEIGHT_PX}px` } as React.CSSProperties}
        >
          {/* Cards — left on desktop */}
          <div className="order-2 lg:order-1 lg:flex-1 lg:min-w-0">
            <div
              ref={listRef}
              className="flex flex-col gap-4 overflow-visible lg:h-[var(--explorer-height)] lg:overflow-y-auto lg:p-1"
            >
              {locations.length === 0 ? (
                <>
                  <p className="text-sm text-gray-600">
                    No starred cities found. Showing the full list below.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-sm text-gray-600">
                    {fallbackCities.map((city) => (
                      <p key={city}>{city}</p>
                    ))}
                  </div>
                </>
              ) : (
                locations.map(renderLocationCard)
              )}
            </div>
          </div>

          {/* Map — right on desktop */}
          <div className="order-1 lg:order-2 lg:flex-1 lg:min-w-0 mb-6 lg:mb-0">
            <ServiceMap
              county={countyForRegion(region)}
              locations={locations}
              selectedId={primaryId}
              onSelectLocation={handleSelectLocation}
              height={MAP_HEIGHT_PX}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
