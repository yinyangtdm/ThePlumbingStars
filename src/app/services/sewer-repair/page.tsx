import type { Metadata } from "next";
import ServiceShell from "@/app/components/ServiceShell";

export const metadata: Metadata = {
  title: "Sewer Line Repair in Los Angeles & Ventura County | The Plumbing Stars",
  description:
    "HD camera diagnosis, two written options, flat-rate repair. Serving LA and Ventura County 24/7. Spot repairs to full replacements. (747) 463-1853.",
};

const faqs = [
  {
    q: "How do I know if it's a clog or a sewer line problem?",
    a: "A single slow drain is usually a localized clog. When two or more fixtures back up simultaneously, or flushing one toilet causes gurgling in a nearby sink or tub, the problem is almost certainly in the main sewer line.",
  },
  {
    q: "How long does a sewer line repair take?",
    a: "A targeted spot repair typically takes 3–6 hours. Larger repairs or full section replacements may run 1–2 days depending on access and site conditions.",
  },
  {
    q: "Do you work on commercial properties?",
    a: "Yes. We handle residential and commercial properties, including apartment buildings, retail spaces, and restaurants.",
  },
  {
    q: "What is the difference between a spot repair and full replacement?",
    a: "A spot repair addresses a single localized failure — we open a small access point, cut out the damaged section, and replace it. Full replacement (or trenchless lining/bursting) makes more sense when the pipe has multiple problem areas or has reached the end of its service life.",
  },
];

export default function SewerRepairPage() {
  return (
    <ServiceShell
      title="Sewer Line Repair in Los Angeles & Ventura County"
      intro="We show you the footage, present two written options, and fix it on schedule — no guesswork, no surprises."
      faqs={faqs}
    >
      {/* Warning signs */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Signs Your Sewer Line Needs Attention</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Multiple drains in your home backing up at the same time",
              "Sewage odor in the yard, near the foundation, or coming up through floor drains",
              "Unusually green or lush patches of grass directly above the sewer run",
              "Soggy ground or wet spots with no obvious water source",
              "Persistent gurgling from toilets when no one is using them",
              "Foundation settling or unexplained cracks in concrete slabs (advanced cases)",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Diagnose first */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            We Diagnose Before We Quote
          </h2>
          <p className="text-gray-600 mb-3">
            Every sewer repair we perform starts with an HD camera inspection. You watch the
            footage with us. We identify the location and severity of the problem — a hairline
            crack, offset joint, root intrusion, or collapsed section — and put two written options
            in front of you before any work begins.
          </p>
          <p className="text-gray-600">
            Spot repair or full replacement — you make the call with complete information and a
            flat-rate price for each option on paper.
          </p>
        </div>
      </section>

      {/* Repair vs replacement */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Spot Repair vs. Full Replacement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Spot Repair</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Single localized crack or break",
                  "Pipe in otherwise sound condition",
                  "Damage limited to a short section",
                  "Lowest upfront cost",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-red shrink-0">&#10003;</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Full Replacement</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {[
                  "Multiple failure points along the run",
                  "Pipe past its service life (clay, Orangeburg, corroded cast iron)",
                  "Extensive root intrusion across the full length",
                  "Pipe bellied or collapsed in multiple sections",
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

      {/* Process */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
          <div className="space-y-4">
            {[
              { n: "1", t: "Camera inspection", b: "HD video documents the exact location and nature of the problem. You keep the footage." },
              { n: "2", t: "Written diagnosis", b: "We mark the failure point on a simple diagram and explain what we found in plain language." },
              { n: "3", t: "Two options in writing", b: "Spot repair and full replacement — each with a flat-rate price. No pressure, no upsell." },
              { n: "4", t: "Repair with photo documentation", b: "Before and after photos taken throughout. Sent to you before we leave the job." },
              { n: "5", t: "Post-repair camera verification", b: "Final camera pass confirms the repair is complete and the line is clear." },
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
