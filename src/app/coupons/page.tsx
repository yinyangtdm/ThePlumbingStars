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
      <main className="py-16 px-4 sm:px-6 bg-brand-light min-h-[60vh]">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Coupons", path: "/coupons" }]} />
        <div className="max-w-3xl mx-auto">
          <h1 className="font-sans normal-case text-3xl font-bold text-gray-900 mb-2">Coupons</h1>
          <p className="text-gray-500 mb-8">
            Save on drain, sewer, and water heater services across Los Angeles and Ventura County.
          </p>
          <CouponGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
