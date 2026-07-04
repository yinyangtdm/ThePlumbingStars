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
      <main className="py-16 px-4 sm:px-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Leave a Review", path: "/leave-review" }]} />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Leave a Review</h1>
          <p className="text-gray-600 mb-6">
            We appreciate your feedback. Please fill out the form below.
          </p>
          <LeaveReviewForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
