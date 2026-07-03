import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function SearchPage() {
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Search by City or ZIP</h1>
          <p className="text-gray-600 mb-6">Enter a city name or ZIP code to find service availability.</p>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP code</label>
              <input value={zip} onChange={(e) => setZip(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. 91301" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. Moorpark" />
            </div>
            <div className="flex gap-2">
              <button className="bg-brand-navy text-white px-4 py-2 rounded">Search</button>
              <a href="/" className="px-4 py-2 border rounded">Cancel</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

