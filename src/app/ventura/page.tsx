import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountyPageShell from "@/components/CountyPageShell";
import { getCityHubs, toServiceLocation } from "@/lib/cityHubs";

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

export default async function VenturaPage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string; city?: string }>;
}) {
  const params = await searchParams;
  const initialZip = params.zip ?? "";
  const initialCity = params.city ?? "";
  const initialLocations = getCityHubs("ventura").map(toServiceLocation);

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
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
          initialCity={initialCity}
        />
      </main>
      <Footer />
    </>
  );
}
