import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeaveReviewForm from "@/components/LeaveReviewForm";

const title = "Leave a Review";
const description = "Share your experience with The Plumbing Stars — we read and respond to every review.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/leave-review" },
  robots: { index: false, follow: true },
  openGraph: { title, description },
};

export default function LeaveReviewPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Leave a Review", path: "/leave-review" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Share Your Experience
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Leave a Review</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              We appreciate your feedback. Please fill out the form below.
            </p>
            <LeaveReviewForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
