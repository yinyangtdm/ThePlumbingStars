"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BookingForm from "@/app/components/BookingForm";
import { useRef, useState } from "react";

export default function ContactPage() {
  const [region, setRegion] = useState<"losangeles" | "ventura">("losangeles");
  const formRef = useRef<HTMLDivElement | null>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact & Bookings</h1>
          <p className="text-gray-600 mb-6">Call us 24/7 at (747) 463-1853 or request a visit below.</p>

          <div className="grid grid-cols-1 gap-4 mb-6 max-w-md">
            {/* CTA 1: Call */}
            <a
              href="tel:+17474631853"
              className="inline-flex w-full items-center justify-center bg-brand-red text-white font-bold px-6 py-3 rounded-md"
            >
              Call (747) 463-1853
            </a>

            {/* CTA 2: Email (blue) */}
            <a
              href="mailto:info@theplumbingstars.com"
              className="inline-flex w-full items-center justify-center bg-brand-sky text-brand-navy font-bold px-6 py-3 rounded-md"
            >
              Email Us
            </a>
          </div>

          <div ref={formRef} className="bg-white rounded-xl p-6 shadow-sm">
            <BookingForm region={region} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

