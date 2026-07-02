 "use client";

import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";

const LA_POLYGON: [number, number][] = [
  [34.2776, -118.4862],
  [34.2572, -118.4354],
  [34.2674, -118.3351],
  [34.2674, -118.2555],
  [34.2470, -118.1855],
  [34.2118, -118.1154],
  [34.1914, -118.0646],
  [34.1868, -118.0247],
  [34.1720, -117.9657],
  [34.1470, -117.9204],
  [34.0970, -117.9300],
  [34.0720, -117.9849],
  [34.0618, -118.0302],
  [34.0014, -118.0907],
  [33.9912, -118.1058],
  [33.9844, -118.1799],
  [33.9753, -118.2156],
  [33.9434, -118.2404],
  [33.9411, -118.2802],
  [33.9445, -118.3049],
  [33.9673, -118.3296],
  [33.9787, -118.3598],
  [33.9946, -118.4148],
  [33.9901, -118.5150],
  [33.9570, -118.6359],
  [33.9912, -118.6894],
  [33.9958, -118.7320],
  [34.0026, -118.7636],
  [34.0026, -118.7801],
  [34.0310, -118.7759],
  [34.1254, -118.6235],
  [34.1254, -118.5040],
  [34.2266, -118.4683],
  [34.2481, -118.4724],
];

const VENTURA_POLYGON: [number, number][] = [
  [34.2969, -118.4958],
  [34.2481, -118.4724],
  [34.2266, -118.4683],
  [34.1254, -118.5040],
  [34.1254, -118.6235],
  [34.0310, -118.7759],
  [34.0026, -118.7801],
  [34.0049, -118.7897],
  [34.0162, -118.8130],
  [34.0231, -118.8322],
  [34.0231, -118.8405],
  [34.0401, -118.8721],
  [34.0470, -118.9050],
  [34.0549, -118.9243],
  [34.0561, -118.9339],
  [34.0515, -118.9449],
  [34.0572, -118.9655],
  [34.0959, -119.0231],
  [34.1016, -119.0382],
  [34.1027, -119.0520],
  [34.1323, -119.0726],
  [34.1698, -119.0918],
  [34.1914, -119.1014],
  [34.2095, -119.1055],
  [34.2243, -119.1138],
  [34.2322, -119.1261],
  [34.2300, -119.1371],
  [34.2322, -119.1481],
  [34.2470, -119.1728],
  [34.2618, -119.1838],
  [34.2765, -119.2058],
  [34.2776, -119.2113],
  [34.2742, -119.2236],
  [34.2969, -119.2484],
];

const CONFIGS = {
  both:    { center: [34.15, -118.71] as [number, number], zoom: 10 },
  la:      { center: [34.11, -118.35] as [number, number], zoom: 10 },
  ventura: { center: [34.15, -118.87] as [number, number], zoom: 10 },
};

// Utility: detect and normalize coordinate order.
// Leaflet expects [lat, lng]. GeoJSON commonly provides [lng, lat].
function normalizeRing(ring: [number, number][]) {
  if (!ring || ring.length === 0) return ring;
  const first = ring[0];
  // If the first value is > 90 in absolute value, it's almost certainly a longitude,
  // so the ring is [lng, lat] and needs swapping.
  const looksLikeLonFirst = Math.abs(first[0]) > 90;
  if (!looksLikeLonFirst) return ring;
  return ring.map(([a, b]) => [b, a] as [number, number]);
}

function FitToBounds({ polygons }: { polygons: ([number, number][] | null)[] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([]);
    polygons.forEach((poly) => {
      if (!poly || poly.length === 0) return;
      poly.forEach((coord) => bounds.extend(coord));
    });
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, polygons]);
  return null;
}

interface Props {
  county?: "la" | "ventura" | "both";
}

export default function ServiceMapClient({ county = "both" }: Props) {
  // Normalize coordinate order once (memoized) and allow overriding from GeoJSON.
  const defaultLeafletLa = useMemo(() => normalizeRing(LA_POLYGON), []);
  const defaultLeafletVentura = useMemo(() => normalizeRing(VENTURA_POLYGON), []);
  const [leafletLa, setLeafletLa] = useState<[number, number][]>(defaultLeafletLa);
  const [leafletVentura, setLeafletVentura] = useState<[number, number][]>(defaultLeafletVentura);

  // Convert GeoJSON ring to Leaflet [lat, lng], detecting whether the file
  // used [lng, lat] (GeoJSON standard) or [lat, lng] (user-edited).
  function normalizeGeoJsonRing(ring: [number, number][]) {
    if (!ring || ring.length === 0) return ring;
    const [a, b] = ring[0];
    const aIsLon = Math.abs(a) > 90;
    const bIsLon = Math.abs(b) > 90;
    // If first value looks like longitude (abs > 90) then ring is [lng, lat]
    // and needs swapping to [lat, lng].
    if (aIsLon && !bIsLon) {
      return ring.map(([lng, lat]) => [lat, lng] as [number, number]);
    }
    // If second value looks like longitude then ring is already [lat, lng].
    if (bIsLon && !aIsLon) {
      return ring as [number, number][];
    }
    // Fallback: assume standard GeoJSON [lng, lat] and swap.
    return ring.map(([lng, lat]) => [lat, lng] as [number, number]);
  }

  // Try to fetch editable LA GeoJSON from public/ and replace default polygon.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/la-service-area.geojson");
        if (!res.ok) return;
        const json = await res.json();
        const feat = Array.isArray(json.features) && json.features[0];
        const coords = feat?.geometry?.coordinates;
        if (!coords) return;
        // support Polygon and MultiPolygon
        const ring: [number, number][] =
          feat.geometry.type === "Polygon" ? coords[0] : coords[0][0];
        const converted = normalizeGeoJsonRing(ring);
        if (!cancelled) setLeafletLa(converted);
      } catch {
        // swallow, keep default
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load Ventura geojson if present and replace default polygon.
  useEffect(() => {
    let cancelled = false;
    async function loadVentura() {
      try {
        const res = await fetch("/ventura-service-area.geojson");
        if (!res.ok) return;
        const json = await res.json();
        const feat = Array.isArray(json.features) && json.features[0];
        const coords = feat?.geometry?.coordinates;
        if (!coords) return;
        const ring: [number, number][] =
          feat.geometry.type === "Polygon" ? coords[0] : coords[0][0];
        const converted = normalizeGeoJsonRing(ring);
        if (!cancelled) setLeafletVentura(converted);
      } catch {
        // keep default
      }
    }
    loadVentura();
    return () => {
      cancelled = true;
    };
  }, []);

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
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {(county === "la" || county === "both") && (
        <Polygon
          positions={leafletLa}
          pathOptions={{ color: "#1D4B91", fillColor: "#1D4B91", fillOpacity: 0.25, weight: 2 }}
        >
          <Tooltip sticky>The Plumbing Stars — Los Angeles</Tooltip>
        </Polygon>
      )}
      {(county === "ventura" || county === "both") && (
        <Polygon
          positions={leafletVentura}
          pathOptions={{ color: "#e0656f", fillColor: "#e0656f", fillOpacity: 0.25, weight: 2 }}
        >
          <Tooltip sticky>The Plumbing Stars — Ventura County</Tooltip>
        </Polygon>
      )}
      {/* Auto-fit to shown polygons */}
      <FitToBounds
        polygons={[
          county === "la" || county === "both" ? leafletLa : null,
          county === "ventura" || county === "both" ? leafletVentura : null,
        ]}
      />
    </MapContainer>
  );
}
