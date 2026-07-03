import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LeaveReviewPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Leave a Review</h1>
          <p className="text-gray-600 mb-6">We appreciate your feedback. Please fill out the form below.</p>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea className="w-full px-3 py-2 border rounded" rows={5} />
              </div>
              <div className="flex gap-2">
                <button className="bg-brand-red text-white px-4 py-2 rounded">Submit</button>
                <a href="/" className="px-4 py-2 border rounded">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

