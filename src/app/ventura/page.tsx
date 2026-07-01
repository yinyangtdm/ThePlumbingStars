import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BookingForm from "@/app/components/BookingForm";

export const metadata: Metadata = {
  title: "The Plumbing Stars | Ventura County Plumbing Services",
  description:
    "Licensed plumbers serving Ventura, Oxnard, Thousand Oaks, Camarillo & Simi Valley. Drain cleaning, sewer repair, hydro jetting. 24/7. (747) 463-1853.",
};

const navLinks = [
  { label: "All Areas", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Now", href: "#booking" },
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

export default function VenturaPage() {
  return (
    <>
      <Header links={navLinks} />
      <main>
        {/* Hero */}
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
            src="https://maps.google.com/maps?q=Ventura+County,CA&t=&z=10&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ventura County service area map"
          />
        </section>

        {/* Cities */}
        <section className="py-12 px-4 sm:px-6 bg-brand-light">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cities We Serve</h2>
            <p className="text-gray-500 text-sm mb-6">
              Serving all of Ventura County. Don&apos;t see your city? Give us a call.
            </p>
            <div className="flex flex-wrap gap-3">
              {cities.map((city) => (
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

        {/* Booking form */}
        <section id="booking" className="py-12 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Book a Visit</h2>
            <p className="text-gray-500 text-sm mb-6">
              Two-hour arrival windows with a text confirmation when we&apos;re on our way. A real
              person will follow up within 5 minutes during business hours.
            </p>
            <BookingForm region="ventura" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
