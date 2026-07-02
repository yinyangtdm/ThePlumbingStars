 "use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BookingForm from "@/app/components/BookingForm";
import { useEffect, useRef, useState } from "react";

type Region = "losangeles" | "ventura";

function pointInRing(lat: number, lng: number, ring: [number, number][]) {
  // ring is array of [lng, lat] (GeoJSON). Ray-casting algorithm.
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

function useServiceAreas() {
  const [laRing, setLaRing] = useState<[number, number][] | null>(null);
  const [venturaRing, setVenturaRing] = useState<[number, number][] | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [laRes, veRes] = await Promise.all([
          fetch("/la-service-area.geojson"),
          fetch("/ventura-service-area.geojson"),
        ]);
        if (laRes.ok) {
          const j = await laRes.json();
          const feat = Array.isArray(j.features) && j.features[0];
          const coords = feat?.geometry?.coordinates;
          if (coords) setLaRing(coords[0]);
        }
        if (veRes.ok) {
          const j = await veRes.json();
          const feat = Array.isArray(j.features) && j.features[0];
          const coords = feat?.geometry?.coordinates;
          if (coords) setVenturaRing(coords[0]);
        }
      } catch {
        // ignore
      }
    }
    load();
  }, []);

  return { laRing, venturaRing };
}

function LocationCTA({ onSelect }: { onSelect: (r: Region | null) => void }) {
  const { laRing, venturaRing } = useServiceAreas();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function detect() {
    setLoading(true);
    setMessage(null);
    try {
      let pos: { lat: number; lon: number } | null = null;
      // Try browser geolocation first
      if ("geolocation" in navigator) {
        pos = await new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error("timeout")), 8000);
          navigator.geolocation.getCurrentPosition(
            (p) => {
              clearTimeout(timer);
              resolve({ lat: p.coords.latitude, lon: p.coords.longitude });
            },
            (err) => {
              clearTimeout(timer);
              reject(err);
            },
            { maximumAge: 60 * 1000, timeout: 8000 }
          );
        }).catch(() => null);
      }
      // Fallback to IP-based location if geolocation failed
      if (!pos) {
        try {
          const r = await fetch("https://ipapi.co/json/");
          if (r.ok) {
            const j = await r.json();
            pos = { lat: Number(j.latitude), lon: Number(j.longitude) };
          }
        } catch {
          pos = null;
        }
      }

      if (!pos) {
        setMessage("Could not determine your location.");
        onSelect(null);
        return;
      }

      const { lat, lon } = pos;
      // check against loaded rings (GeoJSON coords are [lng, lat])
      if (laRing && pointInRing(lat, lon, laRing)) {
        setMessage("You're inside Los Angeles service area.");
        onSelect("losangeles");
        return;
      }
      if (venturaRing && pointInRing(lat, lon, venturaRing)) {
        setMessage("You're inside Ventura service area.");
        onSelect("ventura");
        return;
      }

      setMessage("It seems you are not within our service areas.");
      onSelect(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={detect}
        className="w-full md:w-auto bg-brand-sky text-brand-navy font-bold px-6 py-3 rounded-md"
        disabled={loading}
      >
        {loading ? "Detecting location…" : "Detect my location"}
      </button>
      {message && (
        <div className="mt-3 text-sm text-gray-700">
          {message}
          {message.includes("not within") && (
            <div className="mt-2 flex gap-2">
              <a href="/losangeles" className="px-3 py-2 bg-white border rounded text-sm">Los Angeles</a>
              <a href="/ventura" className="px-3 py-2 bg-white border rounded text-sm">Ventura</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [region, setRegion] = useState<Region>("losangeles");
  const formRef = useRef<HTMLDivElement | null>(null);
  const [detectedRegion, setDetectedRegion] = useState<Region | null | "unknown">("unknown");

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact & Bookings</h1>
          <p className="text-gray-600 mb-6">Call us 24/7 at (747) 463-1853 or request a visit below.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* CTA 1: Call */}
            <a
              href="tel:+17474631853"
              className="inline-flex items-center justify-center bg-brand-red text-white font-bold px-6 py-3 rounded-md"
            >
              Call (747) 463-1853
            </a>

            {/* CTA 2: Detect location */}
            <LocationCTA onSelect={(r) => setDetectedRegion(r ?? null)} />

            {/* CTA 3: Book online (scroll to form) */}
            <button onClick={scrollToForm} className="bg-brand-navy text-white font-bold px-6 py-3 rounded-md">
              Book Online
            </button>

            {/* CTA 4: Email */}
            <a href="mailto:info@theplumbingstars.com" className="bg-white border text-brand-navy font-bold px-6 py-3 rounded-md text-center">
              Email Us
            </a>
          </div>

          <div ref={formRef} className="bg-white rounded-xl p-6 shadow-sm">
            <BookingForm region={detectedRegion === "losangeles" ? "losangeles" : detectedRegion === "ventura" ? "ventura" : region} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

