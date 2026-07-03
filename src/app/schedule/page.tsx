import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export default function SchedulePage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Schedule Online</h1>
          <p className="text-gray-600 mb-6">Choose your service and request a visit below.</p>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <BookingForm region="losangeles" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

