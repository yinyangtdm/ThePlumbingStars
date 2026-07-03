import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountyServiceExplorer from "@/components/CountyServiceExplorer";
import { buildLocationsFromGeoJson } from "@/lib/serviceLocations";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "The Plumbing Stars | Los Angeles Plumbing Services",
  description:
    "Licensed plumbers serving 75+ LA communities — San Fernando Valley, Westside, Glendale, Pasadena & more. Drain cleaning, sewer repair, hydro jetting. 24/7. (747) 463-1853.",
};

const navLinks = [
  { label: "All Areas", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Now", href: "/schedule" },
];

const cities = [
  "Agoura Hills", "Altadena", "Arleta", "Atwater Village",
  "Bel Air", "Beverly Hills", "Brentwood", "Burbank",
  "Calabasas", "Canoga Park", "Century City", "Chatsworth",
  "Culver City", "Eagle Rock", "Echo Park", "Encino",
  "Fairfax", "Glendale", "Granada Hills", "Hancock Park",
  "Hidden Hills", "Highland Park", "Hollywood", "Holmby Hills",
  "Koreatown", "La Cañada Flintridge", "La Crescenta", "Lake Balboa",
  "Larchmont", "Los Feliz", "Malibu", "Mar Vista",
  "Mid-City", "Mid-Wilshire", "Mission Hills", "Montrose",
  "Mount Washington", "North Hills", "North Hollywood", "Northridge",
  "Pacific Palisades", "Pacoima", "Palms", "Panorama City",
  "Pasadena", "Porter Ranch", "Reseda", "San Fernando",
  "Santa Monica", "Sherman Oaks", "Silver Lake", "South Pasadena",
  "Studio City", "Sun Valley", "Sunland-Tujunga", "Sylmar",
  "Tarzana", "Toluca Lake", "Topanga", "Valley Glen",
  "Valley Village", "Van Nuys", "Venice", "Westlake Village",
  "West Hills", "West Hollywood", "West Los Angeles", "Westwood",
  "Winnetka", "Woodland Hills",
];

function loadInitialLocations() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "la-service-area.geojson");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf8");
      const geo = JSON.parse(raw);
      return buildLocationsFromGeoJson(geo, "losangeles");
    }
  } catch {
    // fall through
  }
  return [];
}

export default async function LosAngelesPage({
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
              Los Angeles County
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Expert Plumbing for Los Angeles.
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-6">
              Licensed technicians with 20+ years serving the San Fernando Valley, Westside, and
              surrounding communities. Flat-rate pricing, zero trip charges.
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
          region="losangeles"
          fallbackCities={cities}
          initialZip={initialZip}
        />
      </main>
      <Footer />
    </>
  );
}
