import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BookingForm from "@/app/components/BookingForm";

export const metadata: Metadata = {
  title: "The Plumbing Stars | Los Angeles Plumbing Services",
  description:
    "Licensed plumbers serving 75+ LA communities — San Fernando Valley, Westside, Glendale, Pasadena & more. Drain cleaning, sewer repair, hydro jetting. 24/7. (747) 463-1853.",
};

const navLinks = [
  { label: "All Areas", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Now", href: "#booking" },
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

export default function LosAngelesPage() {
  return (
    <>
      <Header links={navLinks} />
      <main>
        {/* Hero */}
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
                href="#booking"
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

        {/* Map */}
        <section className="w-full h-80 sm:h-96">
          <iframe
            src="https://maps.google.com/maps?q=Los+Angeles+County,CA&t=&z=9&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Los Angeles County service area map"
          />
        </section>

        {/* Cities */}
        <section className="py-12 px-4 sm:px-6 bg-brand-light">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cities We Serve</h2>
            <p className="text-gray-500 text-sm mb-6">
              75+ communities across Los Angeles County. Don&apos;t see yours? Call us — we&apos;re always expanding.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1.5 text-sm text-gray-600">
              {cities.map((city) => (
                <p key={city}>{city}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Booking form */}
        <section id="booking" className="py-12 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Book a Visit</h2>
            <p className="text-gray-500 text-sm mb-6">
              A real person will follow up within 5 minutes during business hours. Emergency calls
              go out 24/7.
            </p>
            <BookingForm region="losangeles" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
