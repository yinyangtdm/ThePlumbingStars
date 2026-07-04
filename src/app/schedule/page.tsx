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
      <main className="py-16 px-4 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Schedule", path: "/schedule" }]} />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Schedule Online</h1>
          <p className="text-gray-600 mb-6">
            {coupon
              ? "Your coupon is applied below. Complete the form to request your visit."
              : "Choose your service and request a visit below."}
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <BookingForm region={region} coupon={coupon} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
