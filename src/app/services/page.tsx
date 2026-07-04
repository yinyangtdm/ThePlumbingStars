import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { services, servicePath } from "@/lib/services";

const title = "Plumbing Services";
const description =
  "Drain cleaning, sewer repair, hydro jetting, camera inspection, trenchless replacement, pipe lining, and water heater replacement — serving Los Angeles and Ventura County.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description },
};

export default function ServicesIndex() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              What We Do
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Services</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 mb-6">Select a service to learn more and book an appointment.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug)}
                  className="block p-6 border rounded-lg hover:shadow-sm"
                >
                  <h2 className="font-bold text-lg mb-1">{service.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                  <span className="text-sm text-brand-navy font-medium">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
