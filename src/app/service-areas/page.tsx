import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ServiceMap from "@/app/components/ServiceMap";

export const metadata: Metadata = {
  title: "Service Areas | The Plumbing Stars — Los Angeles & Ventura County",
  description:
    "The Plumbing Stars serves 75+ communities across Los Angeles County and all of Ventura County. Find your neighborhood and book a visit.",
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Now", href: "/#service-areas" },
];

const sfv = [
  "Westlake Village", "Agoura Hills", "Calabasas", "Hidden Hills",
  "Bell Canyon", "West Hills", "Woodland Hills", "Canoga Park",
  "Winnetka", "Chatsworth", "Northridge", "Porter Ranch",
  "Granada Hills", "Mission Hills", "North Hills", "Sylmar",
  "San Fernando", "Pacoima", "Arleta", "Panorama City",
  "Sun Valley", "Sunland-Tujunga", "Reseda", "Lake Balboa",
  "Tarzana", "Encino", "Van Nuys", "Valley Glen",
  "Sherman Oaks", "Studio City", "Valley Village", "North Hollywood",
  "Toluca Lake",
];

const westside = [
  "Malibu", "Topanga", "Pacific Palisades", "Brentwood",
  "Santa Monica", "Westwood", "Bel Air", "Holmby Hills",
  "Beverly Hills", "Century City", "West Los Angeles", "Sawtelle",
  "Rancho Park", "Cheviot Hills", "Palms", "Culver City",
  "Venice", "Mar Vista", "West Hollywood", "Hollywood",
  "East Hollywood", "Los Feliz", "Silver Lake", "Echo Park",
  "Hancock Park", "Larchmont", "Fairfax", "Mid-Wilshire",
  "Koreatown", "Mid-City",
];

const eastside = [
  "Glendale", "Burbank", "La Cañada Flintridge", "La Crescenta",
  "Montrose", "Altadena", "Pasadena", "South Pasadena",
  "Eagle Rock", "Highland Park", "Mount Washington", "Glassell Park",
  "Cypress Park", "Atwater Village",
];

const ventura = [
  "Ventura", "Oxnard", "Camarillo", "Thousand Oaks",
  "Simi Valley", "Moorpark", "Newbury Park", "Santa Paula",
  "Fillmore", "Ojai", "Port Hueneme", "Oak View",
  "Somis", "Westlake Village",
];

const areaGroups = [
  { heading: "San Fernando Valley", cities: sfv },
  { heading: "Westside & Central LA", cities: westside },
  { heading: "Eastside & Pasadena", cities: eastside },
];

export default function ServiceAreasPage() {
  return (
    <>
      <Header links={navLinks} />
      <main>
        {/* Hero */}
        <section className="bg-brand-light py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-bold uppercase tracking-[0.12em] text-sm mb-2">
              Coverage Area
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy mb-4">
              Los Angeles{" "}
              <span className="text-brand-red">Service Areas.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We also serve Ventura County — and our coverage area is always expanding.
              Not sure if we reach you? Give us a call; chances are we&apos;ve got you covered.
            </p>
          </div>
        </section>

        {/* City grid */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {areaGroups.map((group) => (
                <div key={group.heading} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-brand-navy font-bold text-base mb-4 pb-2 border-b-2 border-brand-navy">
                    {group.heading}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.cities.map((city) => (
                      <li key={city} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-brand-red text-xs">●</span>
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              Don&apos;t see your city? Call us — our coverage is always expanding.
            </p>
          </div>
        </section>

        {/* Leaflet map */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <ServiceMap />
            <div className="flex items-center gap-6 mt-3 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-[#1D4B91]" />
                The Plumbing Stars Los Angeles
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-[#e0656f]" />
                The Plumbing Stars Ventura County
              </span>
            </div>
          </div>
        </section>

        {/* Ventura County */}
        <section className="bg-brand-light py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Ventura County
            </h2>
            <div className="flex flex-wrap gap-3">
              {ventura.map((city) => (
                <span
                  key={city}
                  className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-700"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto">
            <p className="text-brand-red font-bold uppercase tracking-[0.12em] text-sm mb-2">
              Same-Day Service
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              In Your Neighborhood Today.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+17474631853"
                className="bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider px-8 py-4 rounded-[3px] text-sm transition-colors"
              >
                Call (747) 463-1853
              </a>
              <a
                href="/#service-areas"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-[3px] text-sm transition-colors"
              >
                Book Online
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
