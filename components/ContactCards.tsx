import DetectAreaClient from "./DetectAreaClient";

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Schedule a Service</h3>
        <p className="text-gray-600">
          Call{" "}
          <a href="tel:+17474631853" className="text-brand-navy font-bold">
            (747) 463-1853
          </a>
        </p>
        <div className="mt-auto w-full">
          <a
            href="/schedule"
            className="inline-block w-full text-center bg-brand-red hover:bg-brand-red-dark text-white font-bold px-4 py-3 rounded-md transition-colors"
          >
            Schedule Online
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Find A Plumbing Star Nearby</h3>
        <p className="text-gray-600">
          <DetectAreaClient />
        </p>
        <div className="mt-auto w-full">
          <a
            href="/search"
            className="inline-block w-full text-center bg-brand-navy hover:bg-brand-navy-dark text-white font-bold px-4 py-3 rounded-md transition-colors"
          >
            Search by City
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start gap-4">
        <h3 className="text-xl font-bold">Leave a Review</h3>
        <p className="text-gray-600">Tell us how we did — we read every review.</p>
        <div className="mt-auto w-full">
          <a
            href="/leave-review"
            className="inline-block w-full text-center bg-brand-sky hover:bg-brand-navy hover:text-white text-brand-navy font-bold px-4 py-3 rounded-md transition-colors"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </div>
  );
}
