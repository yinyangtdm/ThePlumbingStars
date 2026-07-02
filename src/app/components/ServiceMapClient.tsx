"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LA_POLYGON, VENTURA_POLYGON } from "@/lib/serviceAreaPolygons";

const CONFIGS = {
  both: { center: [34.16, -118.82] as [number, number], zoom: 10 },
  la: { center: [34.12, -118.55] as [number, number], zoom: 10 },
  ventura: { center: [34.22, -119.05] as [number, number], zoom: 10 },
};

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;
    map.fitBounds(L.latLngBounds(positions), { padding: [32, 32] });
  }, [map, positions]);

  return null;
}

interface Props {
  county?: "la" | "ventura" | "both";
}

export default function ServiceMapClient({ county = "both" }: Props) {
  const { center, zoom } = CONFIGS[county];

  const fitPositions: [number, number][] =
    county === "la"
      ? LA_POLYGON
      : county === "ventura"
        ? VENTURA_POLYGON
        : [...LA_POLYGON, ...VENTURA_POLYGON];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "380px", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds positions={fitPositions} />
      {(county === "la" || county === "both") && (
        <Polygon
          positions={LA_POLYGON}
          pathOptions={{ color: "#1D4B91", fillColor: "#1D4B91", fillOpacity: 0.25, weight: 2 }}
        >
          <Tooltip sticky>The Plumbing Stars — Los Angeles</Tooltip>
        </Polygon>
      )}
      {(county === "ventura" || county === "both") && (
        <Polygon
          positions={VENTURA_POLYGON}
          pathOptions={{ color: "#e0656f", fillColor: "#e0656f", fillOpacity: 0.25, weight: 2 }}
        >
          <Tooltip sticky>The Plumbing Stars — Ventura County</Tooltip>
        </Polygon>
      )}
    </MapContainer>
  );
}
