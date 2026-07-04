import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ReviewCard from "@/components/ReviewCard";
import { customerReviews } from "@/lib/reviews";
import { reviewsSchema } from "@/lib/structuredData";

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
      <main className="py-16 px-4 sm:px-6 bg-brand-light min-h-[60vh]">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]} />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h1>
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
          <p className="mt-8 text-center text-sm text-gray-600">
            Had a great experience?{" "}
            <Link href="/leave-review" className="text-brand-navy font-semibold hover:underline">
              Leave a review
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
