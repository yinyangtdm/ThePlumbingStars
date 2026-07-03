"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function pointInRing(lat: number, lng: number, ring: [number, number][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0],
      yi = ring[i][1];
    const xj = ring[j][0],
      yj = ring[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi + 0.0) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function DetectAreaClient() {
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<"losangeles" | "ventura" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function detect() {
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (!r.ok) throw new Error("ip lookup failed");
        const j = await r.json();
        const lat = Number(j.latitude);
        const lon = Number(j.longitude);
        const detectedCity = j.city || null;
        if (!mounted) return;
        setCity(detectedCity);

        // load service area polygons
        const [laRes, veRes] = await Promise.all([
          fetch("/la-service-area.geojson"),
          fetch("/ventura-service-area.geojson"),
        ]);
        let laRing: [number, number][] | null = null;
        let veRing: [number, number][] | null = null;
        if (laRes.ok) {
          const jla = await laRes.json();
          const feat = Array.isArray(jla.features) && jla.features[0];
          const coords = feat?.geometry?.coordinates;
          if (coords) laRing = coords[0];
        }
        if (veRes.ok) {
          const jve = await veRes.json();
          const feat = Array.isArray(jve.features) && jve.features[0];
          const coords = feat?.geometry?.coordinates;
          if (coords) veRing = coords[0];
        }

        if (laRing && pointInRing(lat, lon, laRing)) {
          setRegion("losangeles");
          return;
        }
        if (veRing && pointInRing(lat, lon, veRing)) {
          setRegion("ventura");
          return;
        }
        setRegion(null);
      } catch {
        if (!mounted) return;
        setCity(null);
        setRegion(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    detect();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <span>Detecting location…</span>;
  if (!city) return <span>Location unknown</span>;

  if (region === "losangeles") {
    return (
      <span>
        Detected: <Link href="/losangeles" className="text-brand-navy font-bold">{city}</Link>
      </span>
    );
  }
  if (region === "ventura") {
    return (
      <span>
        Detected: <Link href="/ventura" className="text-brand-navy font-bold">{city}</Link>
      </span>
    );
  }
  return (
    <span>
      Detected: <span className="font-medium">{city}</span> — <Link href="/search" className="text-brand-navy font-bold">Search by city</Link>
    </span>
  );
}

