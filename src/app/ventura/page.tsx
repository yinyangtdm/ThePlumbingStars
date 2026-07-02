import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ServiceMap from "@/app/components/ServiceMap";
import { venturaCities } from "@/lib/navLinks";

export const metadata: Metadata = {
  title: "Ventura County Service Areas | The Plumbing Stars",
  description:
    "The Plumbing Stars serves Ventura, Oxnard, Thousand Oaks, Camarillo, Simi Valley and all of Ventura County. Book a visit today.",
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Now", href: "/#service-areas" },
];

export default function VenturaPage() {
  return (
    <>
      <Header items={navLinks} />
      <main>
        <section className="bg-brand-light py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-bold uppercase tracking-[0.12em] text-sm mb-2">
              Coverage Area
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy mb-4">
              Ventura County{" "}
              <span className="text-brand-red">Service Areas.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Family-owned since 1998, serving every community in Ventura County.
              Not sure if we reach you? Give us a call — we&apos;ve got you covered.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Cities We Serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {venturaCities.map((city) => (
                <span
                  key={city}
                  className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-700"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Don&apos;t see your city? Call us — our coverage is always expanding.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              <Link href="/losangeles" className="text-brand-red font-bold hover:underline">
                View Los Angeles County service areas →
              </Link>
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <ServiceMap county="ventura" />
            <div className="flex items-center gap-6 mt-3 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-[#e0656f]" />
                The Plumbing Stars Ventura County
              </span>
            </div>
          </div>
        </section>

        <section className="bg-brand-navy chev-pattern text-white py-16 px-4 sm:px-6 text-center">
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
              <Link
                href="/#service-areas"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-[3px] text-sm transition-colors"
              >
                Book Online
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
