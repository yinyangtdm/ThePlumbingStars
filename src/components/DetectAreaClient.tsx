"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { detectUserArea } from "@/lib/areaDetection";
import type { ServiceRegion } from "@/lib/serviceLocations";

export default function DetectAreaClient() {
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<ServiceRegion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    detectUserArea()
      .then((result) => {
        if (!mounted) return;
        setCity(result?.city ?? null);
        setRegion(result?.region ?? null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

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
      Detected: <span className="font-medium">{city}</span> —{" "}
      <Link href="/search" className="text-brand-navy font-bold">
        Search by city
      </Link>
    </span>
  );
}
