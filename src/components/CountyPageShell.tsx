"use client";

import { useEffect, useState } from "react";
import CountyServiceExplorer from "./CountyServiceExplorer";
import { detectUserArea } from "@/lib/areaDetection";
import {
  sortLocationsByDistance,
  type ServiceLocation,
  type ServiceRegion,
} from "@/lib/serviceLocations";

interface Props {
  region: ServiceRegion;
  countyLabel: string;
  countyTitle: string;
  initialLocations: ServiceLocation[];
  fallbackCities?: string[];
  initialZip?: string;
  initialCity?: string;
}

export default function CountyPageShell({
  region,
  countyLabel,
  countyTitle,
  initialLocations,
  fallbackCities = [],
  initialZip = "",
  initialCity = "",
}: Props) {
  const [titleName, setTitleName] = useState(countyTitle);
  const [geoAnchor, setGeoAnchor] = useState<[number, number] | null>(null);
  const [geoPrimaryId, setGeoPrimaryId] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [initialZip, initialCity, region]);

  useEffect(() => {
    if (initialZip || initialCity) return;

    let mounted = true;
    detectUserArea(region).then((result) => {
      if (!mounted || !result) return;

      setTitleName(result.city);
      const nearest = sortLocationsByDistance(initialLocations, result.coords)[0];
      if (nearest) {
        setGeoAnchor(result.coords);
        setGeoPrimaryId(nearest.id);
      }
    });

    return () => {
      mounted = false;
    };
  }, [initialZip, initialCity, region, initialLocations]);

  return (
    <>
      <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
            {countyLabel}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Expert Plumbing for {titleName}.
          </h1>
        </div>
      </section>

      <CountyServiceExplorer
        initialLocations={initialLocations}
        region={region}
        fallbackCities={fallbackCities}
        initialZip={initialZip}
        initialCity={initialCity}
        geoAnchor={geoAnchor}
        geoPrimaryId={geoPrimaryId}
      />
    </>
  );
}
