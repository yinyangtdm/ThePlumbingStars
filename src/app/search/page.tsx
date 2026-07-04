import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchForm from "@/components/SearchForm";

export const metadata: Metadata = {
  title: "Search by City or ZIP",
  description: "Find your city or ZIP code to see local plumbing service and coverage details.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Search", path: "/search" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Find Your Area
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Search by City or ZIP</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
