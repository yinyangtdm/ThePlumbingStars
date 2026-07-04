import type { Metadata } from "next";
import ServiceShell from "@/components/ServiceShell";
import { cameraInspectionFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Sewer Camera Inspection in Los Angeles & Ventura County | The Plumbing Stars",
  description:
    "HD sewer camera inspection — see inside your pipes before any work begins. Footage is yours to keep. Serving LA and Ventura County. (747) 463-1853.",
};

export default function CameraInspectionPage() {
  return (
    <ServiceShell
      title="Sewer Camera Inspection in Los Angeles & Ventura County"
      intro="See exactly what is inside your pipes — before you agree to anything, before any work begins."
      scheduleLabel="Schedule a Camera Inspection"
      faqs={cameraInspectionFaqs}
    >
      {/* What it does */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            See What Is Inside Your Pipes
          </h2>
          <p className="text-gray-600 mb-3">
            A sewer camera inspection threads an HD camera through your drain or sewer line so you
            can see the interior of your own pipes — the condition of the walls, any blockages,
            and the exact location of a problem. There is no guesswork, no opening walls to
            investigate. You watch the footage live, keep a recording, and receive a written
            diagnosis before any repair work begins.
          </p>
          <p className="text-gray-600">
            It is the only reliable way to know whether a cleaning will solve the problem or
            whether something structural needs to be addressed.
          </p>
        </div>
      </section>

      {/* When it makes sense */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When a Camera Inspection Makes Sense</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            {[
              "Before buying a home — the only way to know the actual condition of the sewer line you are inheriting",
              "After a sewage backup — to understand the root cause, not just clear the symptom",
              "Before scheduling a repair — to confirm location, length, and severity",
              "When drain cleanings have not held — to find out why",
              "Routine check on a home over 15 years old that has never had one",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-brand-red shrink-0 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we look for */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Look For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Cracks and fractures", body: "From hairline stress fractures to full breaks in the pipe wall." },
              { title: "Root intrusion", body: "Roots entering through joints or cracks, ranging from fine tendrils to dense masses." },
              { title: "Offset joints", body: "Pipe sections shifted out of alignment, common in older neighborhoods with settling soil." },
              { title: "Bellying", body: "Low spots where the pipe has dipped, collecting debris and standing water over time." },
              { title: "Buildup", body: "Grease, mineral scale, or organic material narrowing the pipe's usable interior diameter." },
              { title: "Material condition", body: "Whether clay, cast iron, or plastic is aging as expected or showing signs of early failure." },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You keep the footage */}
      <section className="py-12 px-4 sm:px-6 bg-brand-navy text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">You Own the Footage</h2>
          <p className="text-white/80">
            Every inspection comes with a recording you keep. Use it for a home sale disclosure,
            as evidence for an insurance claim, or simply as documentation of your pipe&apos;s
            condition before and after a repair. The footage belongs to you the moment the camera
            comes out of the ground.
          </p>
        </div>
      </section>
    </ServiceShell>
  );
}
