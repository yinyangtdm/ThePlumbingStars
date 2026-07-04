import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChooseAreaClient from "./ChooseAreaClient";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "The Plumbing Stars serves Los Angeles County and Ventura County. Choose your county or enter your ZIP code to find plumbing service near you.",
  alternates: { canonical: "/service-areas" },
};

const counties = [
  {
    name: "Los Angeles County",
    href: "/losangeles",
    blurb: "75+ communities including the San Fernando Valley, Westside, Glendale, and Pasadena.",
  },
  {
    name: "Ventura County",
    href: "/ventura",
    blurb: "Ventura, Oxnard, Thousand Oaks, Camarillo, Simi Valley, and surrounding cities.",
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }]} />

        {/* Hero */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
              Where We Serve
            </h1>
            <p className="text-gray-600">
              Select your county below, or enter your ZIP code to jump straight to the cities we
              cover near you.
            </p>
          </div>
        </section>

        {/* County cards */}
        <section className="pb-6 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {counties.map((county) => (
              <Link
                key={county.href}
                href={county.href}
                className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-xl p-6 transition-colors"
              >
                <h2 className="text-xl font-bold mb-2">{county.name}</h2>
                <p className="text-white/70 text-sm">{county.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ZIP lookup */}
        <section className="pb-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Not sure which county you&apos;re in?
              </h2>
              <ChooseAreaClient />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
