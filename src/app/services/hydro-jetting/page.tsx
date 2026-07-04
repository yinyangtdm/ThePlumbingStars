import type { Metadata } from "next";
import ServiceShell from "@/components/ServiceShell";
import { hydroJettingFaqs } from "@/lib/faqs";

const title = "Hydro Jetting Services in Los Angeles & Ventura County";
const description =
  "High-pressure water clearing for grease, roots, and mineral scale. No chemicals. Flat-rate pricing. LA and Ventura County. (747) 463-1853.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/hydro-jetting" },
  openGraph: { title, description },
};

export default function HydroJettingPage() {
  return (
    <ServiceShell
      serviceName="Hydro Jetting"
      slug="hydro-jetting"
      title="Hydro Jetting Services in Los Angeles & Ventura County"
      intro="High-pressure water that scours pipe walls completely clean — no chemicals, no residue, no recurrence."
      scheduleLabel="Schedule a Hydro Jetting"
      faqs={hydroJettingFaqs}
    >
      {/* What is hydro jetting */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Hydro Jetting Does</h2>
          <p className="text-gray-600 mb-3">
            Hydro jetting directs a pressurized water stream — typically 1,500 to 4,000 PSI
            depending on pipe diameter and blockage type — through a specialized nozzle to scour
            the inside of your drain or sewer line completely clean.
          </p>
          <p className="text-gray-600">
            Unlike a drain snake, which punches a channel through a clog, hydro jetting removes
            the entire obstruction along with the layer of grease, scale, or organic material
            coating the pipe wall. The result is a pipe that flows like new.
          </p>
        </div>
      </section>

      {/* When to use it */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            When Hydro Jetting Is the Right Tool
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Kitchen drain lines coated with grease that has hardened over months or years",
              "Main sewer lines with tree root debris after mechanical root cutting",
              "Commercial lines in restaurants, apartment buildings, or industrial facilities",
              "Any drain that has been snaked multiple times with diminishing results",
              "Pre-sale or pre-lining pipe cleaning before a camera inspection or relining job",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chemical free */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Chemical-Free and Environmentally Sound
          </h2>
          <p className="text-gray-600 mb-3">
            Hydro jetting uses only water. No caustic chemicals, no solvents, no residue left
            behind in the pipe or in the municipal sewer system. For homeowners with older plumbing,
            young children, or pets, it is the safest drain cleaning method available.
          </p>
          <p className="text-gray-600">
            It is also the method we recommend before any pipe lining job — a thoroughly cleaned
            pipe surface ensures the epoxy bonds correctly to the wall.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
          <div className="space-y-4">
            {[
              { n: "1", t: "Camera inspection", b: "We confirm hydro jetting is appropriate and check for structural vulnerabilities before applying pressure." },
              { n: "2", t: "Nozzle selection", b: "We choose the nozzle based on pipe diameter, material, and the type of blockage or buildup." },
              { n: "3", t: "Jetting pass", b: "We work backward from the obstruction, with the nozzle pulling itself through the pipe as it jets." },
              { n: "4", t: "Post-jet camera verification", b: "A final camera pass confirms the pipe wall is clear and full flow is restored." },
              { n: "5", t: "Documentation", b: "You receive before-and-after footage and a written service confirmation." },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 items-start">
                <span className="text-xl font-bold text-brand-red w-6 shrink-0">{item.n}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.t}</p>
                  <p className="text-gray-600 text-sm">{item.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServiceShell>
  );
}
