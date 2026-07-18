import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountyPageShell from "@/components/CountyPageShell";
import { getCityHubs, toServiceLocation } from "@/lib/cityHubs";

export const metadata: Metadata = {
  title: "Los Angeles County Plumbing Services",
  description:
    "Licensed plumbers serving 75+ LA communities — San Fernando Valley, Westside, Glendale, Pasadena & more. Drain cleaning, sewer repair, hydro jetting. 24/7. (747) 463-1853.",
  alternates: { canonical: "/losangeles" },
};

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

export default async function LosAngelesPage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string }>;
}) {
  const params = await searchParams;
  const initialZip = params.zip ?? "";
  const initialLocations = getCityHubs("losangeles").map(toServiceLocation);

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Los Angeles County", path: "/losangeles" },
          ]}
        />
        <CountyPageShell
          region="losangeles"
          countyLabel="Los Angeles County"
          countyTitle="Los Angeles County"
          initialLocations={initialLocations}
          fallbackCities={cities}
          initialZip={initialZip}
        />
      </main>
      <Footer />
    </>
  );
}
