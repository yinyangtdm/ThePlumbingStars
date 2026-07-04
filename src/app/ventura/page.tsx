import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountyPageShell from "@/components/CountyPageShell";
import { buildLocationsFromGeoJson } from "@/lib/serviceLocations";

export const metadata: Metadata = {
  title: "Ventura County Plumbing Services",
  description:
    "Licensed plumbers serving Ventura, Oxnard, Thousand Oaks, Camarillo & Simi Valley. Drain cleaning, sewer repair, hydro jetting. 24/7. (747) 463-1853.",
  alternates: { canonical: "/ventura" },
};

const cities = [
  "Ventura",
  "Oxnard",
  "Thousand Oaks",
  "Camarillo",
  "Simi Valley",
  "Moorpark",
  "Newbury Park",
  "Santa Paula",
  "Fillmore",
  "Ojai",
  "Port Hueneme",
  "Oak View",
  "Somis",
  "Westlake Village",
];

function loadInitialLocations() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "ventura-service-area.geojson");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf8");
      const geo = JSON.parse(raw);
      return buildLocationsFromGeoJson(geo, "ventura");
    }
  } catch {
    // fall through
  }
  return [];
}

export default async function VenturaPage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string }>;
}) {
  const params = await searchParams;
  const initialZip = params.zip ?? "";
  const initialLocations = loadInitialLocations();

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: "Ventura County", path: "/ventura" },
          ]}
        />
        <CountyPageShell
          region="ventura"
          countyLabel="Ventura County"
          countyTitle="Ventura County"
          initialLocations={initialLocations}
          fallbackCities={cities}
          initialZip={initialZip}
        />
      </main>
      <Footer />
    </>
  );
}
