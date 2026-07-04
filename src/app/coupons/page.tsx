import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CouponsPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6 bg-brand-light min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Coupons</h1>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-gray-600">
            No coupons available yet. Check back soon for special offers on drain cleaning and
            sewer services.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
