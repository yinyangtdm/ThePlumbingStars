import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BookingForm from "@/app/components/BookingForm";
import { useState } from "react";

export default function ContactPage() {
  // very small client toggle — render booking form for chosen region
  const [region, setRegion] = useState<"losangeles" | "ventura">("losangeles");

  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact & Bookings</h1>
          <p className="text-gray-600 mb-6">Call us 24/7 at (747) 463-1853 or request a visit below.</p>

          <div className="flex gap-3 mb-6">
            <button onClick={() => setRegion("losangeles")} className={`px-4 py-2 rounded ${region === "losangeles" ? "bg-brand-navy text-white" : "bg-gray-100"}`}>
              Los Angeles
            </button>
            <button onClick={() => setRegion("ventura")} className={`px-4 py-2 rounded ${region === "ventura" ? "bg-brand-navy text-white" : "bg-gray-100"}`}>
              Ventura
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* BookingForm is a client component */}
            <BookingForm region={region} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

