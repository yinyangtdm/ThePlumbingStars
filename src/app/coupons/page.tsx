import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CouponGrid from "@/components/CouponGrid";

const title = "Coupons & Special Offers";
const description =
  "Save on drain cleaning, sewer repair, sewer replacement, and water heater installation across Los Angeles and Ventura County.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/coupons" },
  openGraph: { title, description },
};

export default function CouponsPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-light min-h-[60vh]">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Coupons", path: "/coupons" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Special Offers
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Coupons</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-500 mb-8">
              Save on drain, sewer, and water heater services across Los Angeles and Ventura County.
            </p>
            <CouponGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
