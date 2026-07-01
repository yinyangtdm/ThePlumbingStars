"use client";

import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Coordinates extracted from theplumbingstarslosangeles.com reference map (zoom 10, pixel-to-latlng conversion)
const LA_POLYGON: [number, number][] = [
  [34.3638, -118.8158],
  [34.3434, -118.7650],
  [34.3536, -118.6647],
  [34.3536, -118.5851],
  [34.3332, -118.5150],
  [34.2981, -118.4450],
  [34.2776, -118.3942],
  [34.2731, -118.3543],
  [34.2584, -118.2953],
  [34.2334, -118.2500],
  [34.1834, -118.2596],
  [34.1584, -118.3145],
  [34.1482, -118.3598],
  [34.0879, -118.4203],
  [34.0777, -118.4354],
  [34.0709, -118.5095],
  [34.0618, -118.5452],
  [34.0299, -118.5699],
  [34.0276, -118.6098],
  [34.0310, -118.6345],
  [34.0538, -118.6592],
  [34.0652, -118.6894],
  [34.0811, -118.7444],
  [34.0765, -118.8446],
  [34.0436, -118.9655],
  [34.0777, -119.0190],
  [34.0822, -119.0616],
  [34.0891, -119.0932],
  [34.0891, -119.1096],
  [34.1175, -119.1055],
  [34.2118, -118.9531],
  [34.2118, -118.8336],
  [34.3128, -118.7979],
  [34.3344, -118.8020],
];

const VENTURA_POLYGON: [number, number][] = [
  [34.3831, -118.8254],
  [34.3344, -118.8020],
  [34.3128, -118.7979],
  [34.2118, -118.8336],
  [34.2118, -118.9531],
  [34.1175, -119.1055],
  [34.0891, -119.1096],
  [34.0913, -119.1193],
  [34.1027, -119.1426],
  [34.1095, -119.1618],
  [34.1095, -119.1701],
  [34.1266, -119.2017],
  [34.1334, -119.2346],
  [34.1414, -119.2538],
  [34.1425, -119.2635],
  [34.1380, -119.2744],
  [34.1436, -119.2950],
  [34.1823, -119.3527],
  [34.1879, -119.3678],
  [34.1891, -119.3816],
  [34.2186, -119.4022],
  [34.2561, -119.4214],
  [34.2776, -119.4310],
  [34.2958, -119.4351],
  [34.3105, -119.4434],
  [34.3185, -119.4557],
  [34.3162, -119.4667],
  [34.3185, -119.4777],
  [34.3332, -119.5024],
  [34.3480, -119.5134],
  [34.3627, -119.5354],
  [34.3638, -119.5409],
  [34.3604, -119.5532],
  [34.3831, -119.5779],
];

const CONFIGS = {
  both:    { center: [34.16, -118.82] as [number, number], zoom: 10 },
  la:      { center: [34.18, -118.62] as [number, number], zoom: 10 },
  ventura: { center: [34.22, -119.20] as [number, number], zoom: 10 },
};

interface Props {
  county?: "la" | "ventura" | "both";
}

export default function ServiceMapClient({ county = "both" }: Props) {
  const { center, zoom } = CONFIGS[county];

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
