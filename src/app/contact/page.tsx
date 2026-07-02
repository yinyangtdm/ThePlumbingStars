 "use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BookingForm from "@/app/components/BookingForm";
import { useEffect, useRef, useState } from "react";
import { getRegionByZip } from "@/lib/zipLookup";

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
  const [detected, setDetected] = useState<Region | null | "unknown">("unknown");

  // Silent IP lookup on mount (no prompt)
  useEffect(() => {
    let mounted = true;
    async function silentLookup() {
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (!r.ok) throw new Error("ip lookup failed");
        const j = await r.json();
        const lat = Number(j.latitude);
        const lon = Number(j.longitude);
        if (isNaN(lat) || isNaN(lon)) {
          if (!mounted) return;
          setDetected(null);
          setMessage("Could not determine your location.");
          onSelect(null);
          return;
        }
        // check rings
        if (laRing && pointInRing(lat, lon, laRing)) {
          if (!mounted) return;
          setDetected("losangeles");
          setMessage("Detected: Los Angeles service area.");
          onSelect("losangeles");
          return;
        }
        if (venturaRing && pointInRing(lat, lon, venturaRing)) {
          if (!mounted) return;
          setDetected("ventura");
          setMessage("Detected: Ventura service area.");
          onSelect("ventura");
          return;
        }
        if (!mounted) return;
        setDetected(null);
        setMessage("It seems you are not within our service areas.");
        onSelect(null);
      } catch {
        if (!mounted) return;
        setDetected(null);
        setMessage("Could not determine your location.");
        onSelect(null);
      }
    }
    silentLookup();
    return () => {
      mounted = false;
    };
  }, [laRing, venturaRing, onSelect]);

  return (
    <div>
      {detected === "losangeles" && (
        <a href="/losangeles" className="w-full md:w-auto inline-block bg-brand-sky text-brand-navy font-bold px-6 py-3 rounded-md text-center">
          View Los Angeles service area
        </a>
      )}
      {detected === "ventura" && (
        <a href="/ventura" className="w-full md:w-auto inline-block bg-brand-sky text-brand-navy font-bold px-6 py-3 rounded-md text-center">
          View Ventura service area
        </a>
      )}
      {detected === null && (
        <div>
          <div className="text-sm text-gray-700 mb-2">{message}</div>
          <div className="flex gap-2">
            <a href="/losangeles" className="px-3 py-2 bg-white border rounded text-sm">Los Angeles</a>
            <a href="/ventura" className="px-3 py-2 bg-white border rounded text-sm">Ventura</a>
          </div>
        </div>
      )}
      {detected === "unknown" && (
        <div className="text-sm text-gray-700">Detecting location…</div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [region, setRegion] = useState<Region>("losangeles");
  const formRef = useRef<HTMLDivElement | null>(null);
  const [detectedRegion, setDetectedRegion] = useState<Region | null | "unknown">("unknown");
  const [zip, setZip] = useState("");
  const [zipMessage, setZipMessage] = useState<string | null>(null);

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

          {/* ZIP lookup */}
          <div className="max-w-md mx-auto mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Check your ZIP code</label>
            <div className="flex gap-2">
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter ZIP code"
                className="flex-1 px-3 py-2 border rounded"
              />
              <button
                onClick={() => {
                  setZipMessage(null);
                  const r = getRegionByZip(zip.trim());
                  if (r === "losangeles") {
                    window.location.href = "/losangeles";
                    return;
                  }
                  if (r === "ventura") {
                    window.location.href = "/ventura";
                    return;
                  }
                  setZipMessage(
                    "We're sorry, but you are not within our service area. However, our service area is constantly expanding, so feel free to contact us to see if we can help you or point you in the right direction!"
                  );
                }}
                className="bg-brand-navy text-white px-4 py-2 rounded"
              >
                Check
              </button>
            </div>
            {zipMessage && <p className="text-sm text-gray-700 mt-2">{zipMessage}</p>}
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

