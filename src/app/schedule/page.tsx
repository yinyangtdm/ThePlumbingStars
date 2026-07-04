import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingForm from "@/components/BookingForm";
import { getCouponById } from "@/lib/coupons";
import type { ServiceRegion } from "@/lib/serviceLocations";

export const metadata: Metadata = {
  title: "Schedule a Service",
  description:
    "Request a plumbing appointment online. Flat-rate pricing, 24/7 availability, serving Los Angeles and Ventura County.",
  alternates: { canonical: "/schedule" },
  robots: { index: false, follow: true },
};

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ coupon?: string; region?: string }>;
}) {
  const params = await searchParams;
  const coupon = params.coupon ? getCouponById(params.coupon) : undefined;
  const region: ServiceRegion | undefined =
    params.region === "losangeles" || params.region === "ventura" ? params.region : undefined;

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Schedule", path: "/schedule" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Book Online
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Schedule Online</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              {coupon
                ? "Your coupon is applied below. Complete the form to request your visit."
                : "Choose your service and request a visit below."}
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <BookingForm region={region} coupon={coupon} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
