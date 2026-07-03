import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  { name: "Drain Cleaning", href: "/services/drain-cleaning" },
  { name: "Sewer Line Repair", href: "/services/sewer-repair" },
  { name: "Hydro Jetting", href: "/services/hydro-jetting" },
  { name: "Camera Inspection", href: "/services/camera-inspection" },
  { name: "Trenchless Replacement", href: "/services/trenchless-replacement" },
  { name: "Pipe Lining", href: "/services/pipe-lining" },
  { name: "Water Heater Replacement", href: "/services/water-heater" },
];

export default function ServicesIndex() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Services</h1>
          <p className="text-gray-600 mb-6">Select a service to learn more and book an appointment.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="block p-6 border rounded-lg hover:shadow-sm">
                <h3 className="font-bold text-lg mb-1">{s.name}</h3>
                <span className="text-sm text-brand-navy font-medium">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

