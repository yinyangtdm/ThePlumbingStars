import type { Metadata } from "next";
import ServiceShell from "@/components/ServiceShell";

export const metadata: Metadata = {
  title: "CIPP Pipe Lining in Los Angeles & Ventura County | The Plumbing Stars",
  description:
    "Cured-In-Place Pipe lining restores damaged sewer lines without excavation. 50-year service life. Flat-rate pricing. LA and Ventura County. (747) 463-1853.",
};

const faqs = [
  {
    q: "Will lining reduce my pipe's interior diameter?",
    a: "Slightly. The liner wall is typically 5–8mm thick. For a standard 4-inch residential pipe, this reduces the interior by less than 10% and has no measurable impact on flow — the smooth epoxy surface actually improves flow compared to a corroded or scale-coated original.",
  },
  {
    q: "Can you line a pipe that has tree roots in it?",
    a: "Yes, but the roots must be removed first. We use mechanical cutting followed by hydro jetting to clear the pipe completely. The cured epoxy liner then creates a sealed interior surface that roots cannot penetrate.",
  },
  {
    q: "How does CIPP compare to pipe bursting?",
    a: "CIPP lining is ideal when the existing pipe's structure is largely intact but has cracks, leaks, or root entry points — the liner reinforces what is already there. Pipe bursting is used when the pipe is too deteriorated to serve as a structural guide and a completely new pipe is needed.",
  },
  {
    q: "How long does CIPP installation take?",
    a: "Most residential lining jobs complete in a single day. The curing process takes 2–4 hours depending on the liner material and method used.",
  },
];

export default function PipeLiningPage() {
  return (
    <ServiceShell
      title="CIPP Pipe Lining in Los Angeles & Ventura County"
      intro="A new pipe inside your existing one — no digging, no disruption, 50-year service life."
      faqs={faqs}
    >
      {/* What CIPP is */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What CIPP Lining Does</h2>
          <p className="text-gray-600 mb-3">
            Cured-In-Place Pipe (CIPP) lining is a trenchless method for rehabilitating damaged or
            deteriorating sewer lines without replacing them. A felt or fiberglass liner saturated
            with epoxy resin is inserted into the existing pipe, inflated to press against the
            walls, and then cured — using hot water, steam, or UV light — into a hard, seamless
            pipe inside the old one.
          </p>
          <p className="text-gray-600">
            The result is a structurally independent pipe that seals cracks, covers root entry
            points, spans offset joints, and restores full flow capacity. No excavation required.
          </p>
        </div>
      </section>

      {/* What it fixes */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Lining Fixes</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Hairline cracks and stress fractures in the pipe wall",
              "Corrosion in cast iron lines",
              "Root entry points at pipe joints (epoxy surface is impenetrable to roots)",
              "Minor joint offsets and separations that would otherwise require spot excavation",
              "Age-related deterioration in clay tile pipe",
              "Leaking lateral connections and service connections",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The process */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Five-Step Lining Process</h2>
          <div className="space-y-5">
            {[
              { n: "1", t: "Camera inspection", b: "We document the pipe's current condition and confirm lining is structurally appropriate." },
              { n: "2", t: "Hydro jetting", b: "The pipe is cleaned thoroughly — roots, debris, grease, and scale removed so the resin bonds directly to the wall." },
              { n: "3", t: "Liner installation", b: "The resin-saturated liner is positioned inside the pipe using air pressure or a pull cable from the access point." },
              { n: "4", t: "Curing", b: "Hot water, steam, or UV light activates the resin, hardening the liner to the pipe wall. This typically takes 2–4 hours." },
              { n: "5", t: "Final camera inspection", b: "We verify the new surface, confirm full diameter, and document the finished liner before closing up." },
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

      {/* Service life */}
      <section className="py-12 px-4 sm:px-6 bg-brand-navy text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">50-Year Service Life</h2>
          <p className="text-white/80">
            A properly installed CIPP liner is rated for 50 years. The epoxy surface is
            non-corrosive, impermeable to water infiltration, and smooth enough to actually
            improve flow rates in pipes with heavy mineral buildup. Our installations come with a
            written guarantee covering materials and workmanship.
          </p>
        </div>
      </section>
    </ServiceShell>
  );
}
