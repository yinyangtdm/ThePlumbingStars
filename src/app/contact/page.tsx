"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetectAreaClient from "./DetectAreaClient";
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
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Schedule a Service */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
              <h3 className="text-xl font-bold">Schedule a Service</h3>
              <p className="text-gray-600">Call <a href="tel:+17474631853" className="text-brand-navy font-bold">(747) 463-1853</a></p>
              <div className="mt-auto w-full">
                <a href="/schedule" className="inline-block w-full text-center bg-brand-red hover:bg-brand-red-dark text-white font-bold px-4 py-3 rounded-md">
                  Schedule Online
                </a>
              </div>
            </div>

            {/* Card 2: Find a Plumbing Star Nearby */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
              <h3 className="text-xl font-bold">Find A Plumbing Star Nearby</h3>
              <p className="text-gray-600">
                <DetectAreaClient />
              </p>
              <div className="mt-auto w-full">
                <a href="/search" className="inline-block w-full text-center bg-brand-navy text-white font-bold px-4 py-3 rounded-md">
                  Search by City
                </a>
              </div>
            </div>

            {/* Card 3: Leave a Review */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
              <h3 className="text-xl font-bold">Leave a Review</h3>
              <p className="text-gray-600">Tell us how we did — we read every review.</p>
              <div className="mt-auto w-full">
                <a href="/leave-review" className="inline-block w-full text-center bg-brand-sky text-brand-navy font-bold px-4 py-3 rounded-md">
                  Leave a Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

