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
      <main className="py-16 px-4 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Search", path: "/search" }]} />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search by City or ZIP</h1>
          <SearchForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
