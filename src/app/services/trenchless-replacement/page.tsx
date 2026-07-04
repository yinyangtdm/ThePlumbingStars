import type { Metadata } from "next";
import ServiceShell from "@/components/ServiceShell";
import { trenchlessReplacementFaqs } from "@/lib/faqs";

const title = "Trenchless Sewer Replacement in Los Angeles & Ventura County";
const description =
  "Replace your sewer line without excavation. Pipe bursting and CIPP lining. No driveway damage, 1–2 day completion. LA and Ventura County. (747) 463-1853.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/trenchless-replacement" },
  openGraph: { title, description },
};

export default function TrenchlessReplacementPage() {
  return (
    <ServiceShell
      serviceName="Trenchless Replacement"
      slug="trenchless-replacement"
      title="Trenchless Sewer Replacement in Los Angeles & Ventura County"
      intro="A new sewer line without excavating your yard, driveway, or landscaping — completed in one to two days."
      scheduleLabel="Schedule a Trenchless Replacement"
      faqs={trenchlessReplacementFaqs}
    >
      {/* What trenchless means */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What &quot;Trenchless&quot; Actually Means</h2>
          <p className="text-gray-600 mb-3">
            Traditional sewer replacement requires digging a trench from your house to the street
            — through the yard, the driveway, and sometimes through landscaping or hardscape that
            took years to establish. Trenchless replacement achieves the same result with two small
            access points instead of a full-length trench. Everything between them stays intact.
          </p>
          <p className="text-gray-600">
            No lawn restoration, no driveway repaving, no weeks of disruption.
          </p>
        </div>
      </section>

      {/* Two methods */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Two Methods — Which Is Right for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Pipe Bursting</h3>
              <p className="text-gray-600 text-sm mb-3">
                A hydraulic head is pulled through the existing pipe, fracturing it outward while
                simultaneously pulling a new HDPE pipe in behind it. Best when the existing pipe
                is too deteriorated to serve as a guide and a completely new pipe is needed.
              </p>
              <p className="text-sm text-brand-navy font-medium">Best for: failed or collapsed pipe that needs full replacement</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Pipe Lining (CIPP)</h3>
              <p className="text-gray-600 text-sm mb-3">
                An epoxy-saturated liner is inserted into the existing pipe and cured in place,
                forming a new pipe within the old one. Best when the pipe structure is largely
                intact but has cracks, root entry points, or aging joints.
              </p>
              <p className="text-sm text-brand-navy font-medium">Best for: cracked or leaking pipe that still has structural integrity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why LA homeowners choose trenchless */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Homeowners Choose Trenchless</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Your driveway, concrete, and landscaping remain untouched",
              "Most projects complete in 1–2 days instead of 1–2 weeks",
              "Total cost is typically lower once landscape and hardscape restoration is factored in",
              "New materials (HDPE or epoxy liner) carry a 50-year service life",
              "Cleaner jobsite — no excavation machinery tearing up the property",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* When trenchless isn't right */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            When Traditional Excavation May Be Necessary
          </h2>
          <p className="text-gray-600 mb-3">
            Trenchless is the right choice in the vast majority of cases, but not all. We will
            tell you honestly if excavation is the better option.
          </p>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Pipe fully collapsed with no interior passage for the camera or equipment",
              "Multiple 90° bends preventing the liner or burst head from passing through",
              "Pipe severely offset at joints beyond what lining can bridge",
              "Site conditions preventing access equipment from reaching both ends",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gray-400 shrink-0 mt-0.5">&#8226;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ServiceShell>
  );
}
