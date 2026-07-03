import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountyServiceExplorer from "@/components/CountyServiceExplorer";
import { buildLocationsFromGeoJson } from "@/lib/serviceLocations";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "The Plumbing Stars | Ventura County Plumbing Services",
  description:
    "Licensed plumbers serving Ventura, Oxnard, Thousand Oaks, Camarillo & Simi Valley. Drain cleaning, sewer repair, hydro jetting. 24/7. (747) 463-1853.",
};

const navLinks = [
  { label: "All Areas", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Now", href: "/schedule" },
];

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
      <Header links={navLinks} />
      <main>
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Ventura County
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Expert Plumbing for Ventura County.
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-6">
              Family-owned since 1998. Licensed technicians serving Ventura, Oxnard, Thousand
              Oaks, Camarillo, Simi Valley, and surrounding communities. Flat-rate pricing, zero
              trip charges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/schedule"
                className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-3 rounded-[3px] transition-colors"
              >
                Book a Visit
              </a>
              <a
                href="tel:+17474631853"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3 rounded-[3px] transition-colors"
              >
                Call (747) 463-1853
              </a>
            </div>
          </div>
        </section>

        <CountyServiceExplorer
          initialLocations={initialLocations}
          region="ventura"
          fallbackCities={cities}
          initialZip={initialZip}
        />
      </main>
      <Footer />
    </>
  );
}
