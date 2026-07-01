"use client";

import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Simplified LA County boundary polygon
const LA_POLYGON: [number, number][] = [
  [34.8233, -118.9200],
  [34.8600, -118.3500],
  [34.6200, -117.9800],
  [34.4200, -117.6700],
  [34.2500, -117.5100],
  [33.9800, -117.5100],
  [33.7040, -117.5094],
  [33.7040, -118.0800],
  [33.7600, -118.2800],
  [33.8100, -118.4200],
  [33.9000, -118.5400],
  [34.0300, -118.8000],
  [34.1100, -119.0000],
  [34.8233, -118.9200],
];

// Simplified Ventura County boundary polygon
const VENTURA_POLYGON: [number, number][] = [
  [34.1100, -119.0000],
  [34.8233, -118.9200],
  [35.7950, -118.9200],
  [35.7950, -119.4500],
  [35.3000, -119.6800],
  [34.8000, -119.5500],
  [34.4500, -119.4500],
  [34.3000, -119.3000],
  [34.2000, -119.1500],
  [34.1100, -119.0000],
];

export default function ServiceMapClient() {
  return (
    <MapContainer
      center={[34.3, -118.7]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height: "380px", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Polygon
        positions={LA_POLYGON}
        pathOptions={{ color: "#1D4B91", fillColor: "#1D4B91", fillOpacity: 0.25, weight: 2 }}
      >
        <Tooltip sticky>The Plumbing Stars — Los Angeles</Tooltip>
      </Polygon>
      <Polygon
        positions={VENTURA_POLYGON}
        pathOptions={{ color: "#e0656f", fillColor: "#e0656f", fillOpacity: 0.25, weight: 2 }}
      >
        <Tooltip sticky>The Plumbing Stars — Ventura County</Tooltip>
      </Polygon>
    </MapContainer>
  );
}
