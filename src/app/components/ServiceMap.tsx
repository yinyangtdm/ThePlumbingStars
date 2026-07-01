"use client";

import dynamic from "next/dynamic";

const ServiceMapClient = dynamic(() => import("./ServiceMapClient"), { ssr: false });

export default function ServiceMap({ county }: { county?: "la" | "ventura" | "both" }) {
  return <ServiceMapClient county={county} />;
}
