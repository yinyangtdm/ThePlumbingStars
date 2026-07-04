import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeaveReviewForm from "@/components/LeaveReviewForm";

export default function LeaveReviewPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
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
