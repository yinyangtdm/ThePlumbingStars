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
            <div className="space-y-4">
              <div className="bg-white border rounded p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" aria-hidden />
                  <div>
                    <div className="font-bold">Kim R. <span className="text-sm text-gray-500 font-normal">— Los Angeles, CA</span></div>
                    <div className="text-xs text-gray-400">Nov 17, 2023 · 5 stars</div>
                    <p className="mt-2 text-gray-700">
                      This is the second time I have used The Plumbing Stars. We needed repairs to our ground drains to the street for years. The team came out quickly, on time (even a bit early). They were clean and clearly laid out the project and fair price. I will definitely use them again!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" aria-hidden />
                  <div>
                    <div className="font-bold">Adriana B. <span className="text-sm text-gray-500 font-normal">— Los Angeles, CA</span></div>
                    <div className="text-xs text-gray-400">Mar 21, 2024 · 5 stars</div>
                    <p className="mt-2 text-gray-700">
                      I was hesitant to use these guys, given so few reviews posted. But since they were all 5 stars, I gave them a shot. So glad I did! The staff is very courteous & professional and don't give you the runaround. They inspected the leaky/broken pipe the same day and quoted one third of another company's price — and managed to get a crew the morning of the scheduled work after a freeway accident. Highly recommend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" aria-hidden />
                  <div>
                    <div className="font-bold">Danette B. <span className="text-sm text-gray-500 font-normal">— Moorpark, CA</span></div>
                    <div className="text-xs text-gray-400">Jun 6, 2023 · 5 stars</div>
                    <p className="mt-2 text-gray-700">First to Review</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

