import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Resources</h1>
          <p className="text-gray-600 mb-6">Coupons, FAQs, reviews, and helpful information.</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Coupons</h2>
            <div className="bg-white border rounded p-4">No coupons available yet.</div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border rounded p-4">
                <strong>How quickly can you get here?</strong>
                <p className="text-sm text-gray-600 mt-1">We typically arrive within 60 minutes for emergencies.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Reviews</h2>
            <div className="bg-white border rounded p-4">No reviews yet.</div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

