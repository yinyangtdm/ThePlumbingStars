import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewCard from "@/components/ReviewCard";
import JsonLd from "@/components/JsonLd";
import { customerReviews } from "@/lib/reviews";
import { reviewsSchema } from "@/lib/structuredData";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

const title = "Customer Reviews";
const description =
  "Read what customers across Los Angeles and Ventura County say about The Plumbing Stars' drain, sewer, and water heater service.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/reviews" },
  openGraph: { title, description },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={reviewsSchema()} />
      <Header />
      <main className="bg-brand-light min-h-[60vh]">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              What Customers Say
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Reviews</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {customerReviews.map((review) => (
                <ReviewCard
                  key={`${review.name}-${review.location}`}
                  name={review.name}
                  location={review.location}
                  text={review.text}
                  rating={review.rating}
                />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">Had a great experience?</p>
            <div className="mt-4 text-center">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded-md transition-colors"
              >
                Review Us on Google
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
