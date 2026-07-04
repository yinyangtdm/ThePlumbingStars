import type { ServiceRegion } from "./serviceLocations";

type GeoJsonRing = [number, number][];

let laRingCache: GeoJsonRing | null | undefined;
let venturaRingCache: GeoJsonRing | null | undefined;

function pointInRing(lat: number, lng: number, ring: GeoJsonRing): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi + 0.0) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

async function loadPolygonRing(url: string): Promise<GeoJsonRing | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const geo = await res.json();
    const feat = Array.isArray(geo.features) ? geo.features[0] : null;
    const ring = feat?.geometry?.coordinates?.[0];
    return Array.isArray(ring) ? ring : null;
  } catch {
    return null;
  }
}

async function getLaRing(): Promise<GeoJsonRing | null> {
  if (laRingCache !== undefined) return laRingCache;
  laRingCache = await loadPolygonRing("/la-service-area.geojson");
  return laRingCache;
}

async function getVenturaRing(): Promise<GeoJsonRing | null> {
  if (venturaRingCache !== undefined) return venturaRingCache;
  venturaRingCache = await loadPolygonRing("/ventura-service-area.geojson");
  return venturaRingCache;
}

function regionForCoords(
  lat: number,
  lng: number,
  laRing: GeoJsonRing | null,
  venturaRing: GeoJsonRing | null
): ServiceRegion | null {
  if (laRing && pointInRing(lat, lng, laRing)) return "losangeles";
  if (venturaRing && pointInRing(lat, lng, venturaRing)) return "ventura";
  return null;
}

type AreaDetectionResult = {
  city: string;
  coords: [number, number];
  region: ServiceRegion;
};

/** IP-based location lookup; returns null when unavailable or outside service area. */
export async function detectUserArea(
  expectedRegion?: ServiceRegion
): Promise<AreaDetectionResult | null> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    const lat = Number(data.latitude);
    const lng = Number(data.longitude);
    const city = typeof data.city === "string" ? data.city.trim() : "";
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !city) return null;

    const [laRing, venturaRing] = await Promise.all([getLaRing(), getVenturaRing()]);
    const region = regionForCoords(lat, lng, laRing, venturaRing);
    if (!region) return null;
    if (expectedRegion && region !== expectedRegion) return null;

    return { city, coords: [lat, lng], region };
  } catch {
    return null;
  }
}
