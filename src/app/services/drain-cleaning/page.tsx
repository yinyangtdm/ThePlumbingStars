import type { Metadata } from "next";
import ServiceShell from "@/components/ServiceShell";
import { drainCleaningFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Drain Cleaning in Los Angeles & Ventura County | The Plumbing Stars",
  description:
    "Professional drain cleaning starting at $63. Camera-diagnosed, flat-rate cleared, 30-day guarantee. Serving LA and Ventura County 24/7. (747) 463-1853.",
};

export default function DrainCleaningPage() {
  return (
    <ServiceShell
      title="Professional Drain Cleaning in Los Angeles & Ventura County"
      intro="Camera-diagnosed, flat-rate cleared, guaranteed for 30 days — or you don't pay."
      scheduleLabel="Schedule a Drain Cleaning"
      faqs={drainCleaningFaqs}
    >
      {/* Warning signs */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            When Your Drains Are Telling You Something
          </h2>
          <p className="text-gray-600 mb-4">
            A single slow sink might be a simple hair clog you can clear yourself. But when
            multiple fixtures slow down at once, or odors keep returning no matter what you pour
            down the drain, you&apos;re dealing with something deeper — buildup in the main line,
            root intrusion, or a partial blockage that will only get worse.
          </p>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Water draining noticeably slower than usual in sinks, tubs, or showers",
              "Gurgling or bubbling sounds after water leaves a fixture",
              "Two or more drains backing up at the same time",
              "Persistent foul smell rising from drains despite regular cleaning",
              "Water pooling around floor drains or the base of toilets",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why chemical cleaners fail */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Store-Bought Drain Cleaners Fall Short
          </h2>
          <p className="text-gray-600 mb-3">
            Chemical drain cleaners dissolve soft, near-surface blockages quickly. They are not
            designed to reach obstructions in the main line, and the acids that eat through clogs
            do not stop there. Repeated use thins PVC pipe walls, damages rubber gaskets, and
            corrodes older cast iron. More importantly, they never remove the clog entirely — they
            punch a small channel through it, giving you temporary relief while the blockage slowly
            reforms.
          </p>
          <p className="text-gray-600">
            A camera inspection and mechanical clearing removes the obstruction completely. That is
            the difference between a problem solved and a problem delayed.
          </p>
        </div>
      </section>

      {/* How we clear drains */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Clear Drains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                step: "1",
                title: "Camera first",
                body: "We send an HD camera down the line to locate the exact obstruction and identify what it is. No guessing, no unnecessary work.",
              },
              {
                step: "2",
                title: "Snaking or power rodding",
                body: "Most residential clogs — hair, soap buildup, soft grease — clear quickly with a power snake inserted at the clean-out.",
              },
              {
                step: "3",
                title: "Hydro jetting for stubborn blockages",
                body: "When roots, hardened grease, or mineral scale resist snaking, we switch to high-pressure water (up to 4,000 PSI) to scour the pipe wall completely clean.",
              },
              {
                step: "4",
                title: "Post-clearance verification",
                body: "After clearing, a quick camera pass confirms the line is fully open. We document it and leave you the footage.",
              },
            ].map((item) => (
              <div key={item.step} className="border border-gray-200 rounded-xl p-5 flex gap-4">
                <span className="text-2xl font-bold text-brand-red shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special offer */}
      <section className="bg-brand-navy text-white py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-brand-red text-5xl font-bold mb-2">$63</p>
          <h2 className="text-xl font-bold mb-2">Main-line drain cleaning — flat rate.</h2>
          <p className="text-white/80 text-sm">
            If we can&apos;t clear it, you owe us nothing. Backed by a 30-day guarantee — if the
            same clog returns within a month, we come back at no charge.
          </p>
        </div>
      </section>
    </ServiceShell>
  );
}
