import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import { customerReviews } from "@/lib/reviews";

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6 bg-brand-light min-h-[60vh]">
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
            <a href="/leave-review" className="text-brand-navy font-semibold hover:underline">
              Leave a review
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
