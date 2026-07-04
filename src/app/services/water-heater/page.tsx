import type { Metadata } from "next";
import ServiceShell from "@/components/ServiceShell";
import { waterHeaterFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Water Heater Replacement in Los Angeles & Ventura County | The Plumbing Stars",
  description:
    "Tank and tankless water heater replacement. Same-day installation, haul-away included. Flat-rate pricing. LA and Ventura County. (747) 463-1853.",
};

export default function WaterHeaterPage() {
  return (
    <ServiceShell
      title="Water Heater Replacement in Los Angeles & Ventura County"
      intro="Tank and tankless replacement, same-day installation, haul-away included — no second trips."
      scheduleLabel="Schedule a Water Heater Replacement"
      faqs={waterHeaterFaqs}
    >
      {/* Signs it needs replacing */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Signs Your Water Heater Is Ready to Retire</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Age over 10 years for a tank unit or 20 years for tankless — both approaching end of manufacturer life expectancy",
              "Rusty or discolored hot water, suggesting interior tank corrosion",
              "Rumbling, popping, or banging sounds — sediment buildup on the heating element",
              "Inconsistent water temperature or long recovery times between uses",
              "Visible corrosion, rust staining, or moisture around the tank base",
              "Rising energy bills without a change in usage patterns",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tank vs tankless */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tank vs. Tankless — What Is Right for Your Home</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Tank Water Heater</h3>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                {[
                  "Lower upfront cost",
                  "Simple installation, widely serviced",
                  "40–80 gallon buffer for high-demand periods",
                  "10–12 year service life",
                  "Standby heat loss between uses",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-red shrink-0">&#10003;</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Tankless Water Heater</h3>
              <ul className="space-y-1.5 text-gray-600 text-sm">
                {[
                  "Heats water on demand — no standby loss",
                  "Compact wall-mounted footprint",
                  "Endless hot water supply",
                  "20+ year service life",
                  "Higher upfront cost; may require gas line upgrade",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-red shrink-0">&#10003;</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Same day */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Same-Day Installation</h2>
          <p className="text-gray-600 mb-3">
            We carry tank and tankless units on the truck. If your water heater fails in the
            morning, you can have hot water again by afternoon. We handle the full job —
            permitting, installation, testing, and hauling away the old unit. No second trip,
            no separate hauling fee, no surprises on the invoice.
          </p>
        </div>
      </section>

      {/* Energy */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Energy Efficiency in California</h2>
          <p className="text-gray-600 mb-3">
            Newer units — tank or tankless — use significantly less energy than equipment
            installed a decade ago. A mid-efficiency tankless unit can reduce water heating costs
            by 25–35% for average households. We will review available rebates from SoCalGas and
            LADWP if applicable to your address and walk you through any current California
            efficiency requirements.
          </p>
        </div>
      </section>
    </ServiceShell>
  );
}
