"use client";

import dynamic from "next/dynamic";
import type { ServiceLocation } from "@/lib/serviceLocations";

const ServiceMapClient = dynamic(() => import("./ServiceMapClient"), { ssr: false });

interface Props {
  county?: "la" | "ventura" | "both";
  locations?: ServiceLocation[];
  selectedId?: string;
  onSelectLocation?: (id: string) => void;
  height?: number;
}

export default function ServiceMap({
  county,
  locations,
  selectedId,
  onSelectLocation,
  height,
}: Props) {
  return (
    <ServiceMapClient
      county={county}
      locations={locations}
      selectedId={selectedId}
      onSelectLocation={onSelectLocation}
      height={height}
    />
  );
}
