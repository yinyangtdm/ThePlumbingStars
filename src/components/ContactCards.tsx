import Link from "next/link";
import DetectAreaClient from "./DetectAreaClient";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Schedule a Service</h3>
        <p className="text-gray-600">
          Call{" "}
          <a href={`tel:${PHONE_TEL}`} className="text-brand-navy font-bold">
            {PHONE_DISPLAY}
          </a>
        </p>
        <div className="mt-auto w-full">
          <Link
            href="/schedule"
            className="inline-block w-full text-center bg-brand-red hover:bg-brand-red-dark text-white font-bold px-4 py-3 rounded-md transition-colors"
          >
            Schedule Online
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Contact Us</h3>
        <p className="text-gray-600">Have a question? Send us a message and we&apos;ll get back to you.</p>
        <div className="mt-auto w-full">
          <Link
            href="/contact"
            className="inline-block w-full text-center bg-brand-navy hover:bg-brand-navy-dark text-white font-bold px-4 py-3 rounded-md transition-colors"
          >
            Ask a Question
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Find A Plumbing Star Nearby</h3>
        <p className="text-gray-600">
          <DetectAreaClient />
        </p>
        <div className="mt-auto w-full">
          <Link
            href="/search"
            className="inline-block w-full text-center bg-brand-navy hover:bg-brand-navy-dark text-white font-bold px-4 py-3 rounded-md transition-colors"
          >
            Search by City
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Leave a Review</h3>
        <p className="text-gray-600">Tell us how we did — we read every review.</p>
        <div className="mt-auto w-full">
          <Link
            href="/leave-review"
            className="inline-block w-full text-center bg-brand-sky hover:bg-brand-navy hover:text-white text-brand-navy font-bold px-4 py-3 rounded-md transition-colors"
          >
            Leave a Review
          </Link>
        </div>
      </div>
    </div>
  );
}
