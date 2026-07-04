export type Faq = {
  q: string;
  a: string;
};

export const homeFaqs: Faq[] = [
  {
    q: "How quickly can you get here?",
    a: "We typically arrive within 60 minutes for emergency calls. For scheduled service we offer 2-hour arrival windows with a text when we're on our way.",
  },
  {
    q: "Do you charge for estimates?",
    a: "No. We diagnose the problem, explain what we found, and give you a flat-rate price in writing — before any work begins.",
  },
  {
    q: "Do you charge extra for nights, weekends, or holidays?",
    a: "Never. Our 24/7 service comes at the same flat rate no matter when you call.",
  },
  {
    q: "What does your guarantee cover?",
    a: "Any workmanship defect on the repair we performed. If something we fixed fails, we come back and fix it — no charge.",
  },
  {
    q: "Which areas do you serve?",
    a: "We serve 75+ communities across Los Angeles County and all of Ventura County, including Ventura, Oxnard, Thousand Oaks, Camarillo, and Simi Valley.",
  },
];

export const drainCleaningFaqs: Faq[] = [
  {
    q: "Can I just use a hardware-store snake?",
    a: "For a shallow clog in a single fixture, sometimes. Consumer snakes reach about 25 feet and are difficult to control — they can scratch pipe walls or push a clog deeper rather than retrieve it. If the problem is in the main line or involves root intrusion, a professional tool and camera diagnosis is the right approach.",
  },
  {
    q: "What causes drains to keep clogging repeatedly?",
    a: "Recurring clogs usually mean one of three things: the blockage was never fully cleared, structural buildup (grease, mineral scale, or root intrusion) has narrowed the main line, or an offset joint or low spot in the pipe is collecting debris. A camera inspection tells us which.",
  },
  {
    q: "How long does a drain cleaning visit take?",
    a: "Most residential drain cleanings take 45 minutes to 90 minutes from arrival — camera inspection, clearing, and post-clearance verification included.",
  },
  {
    q: "Will there be a mess?",
    a: "We use drop cloths and shoe covers. The camera and snake go through an existing clean-out or fixture drain — no wall openings, no excavation. We leave the area the way we found it.",
  },
];

export const sewerRepairFaqs: Faq[] = [
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

export const hydroJettingFaqs: Faq[] = [
  {
    q: "Can hydro jetting damage older pipes?",
    a: "Done correctly, no. We always run a camera inspection first to assess pipe condition and material. If a pipe has structural damage — cracks, root punctures, significant corrosion — we identify it before jetting and address it first.",
  },
  {
    q: "How often should drain lines be hydro jetted?",
    a: "For most homes, once every 18–24 months for kitchen lines and every few years for the main sewer line. Commercial kitchens and high-volume buildings typically need more frequent service.",
  },
  {
    q: "Is hydro jetting the same as regular snaking?",
    a: "No. A snake removes soft blockages by mechanical action — hooking or breaking up the clog. Hydro jetting removes the clog and scours the pipe wall clean, eliminating the residue that causes recurrence. It's a more thorough treatment.",
  },
  {
    q: "Will hydro jetting remove tree roots permanently?",
    a: "It flushes out root debris after mechanical cutting, but doesn't prevent regrowth. If root intrusion is ongoing, pipe lining is the long-term fix — the epoxy surface creates a barrier roots cannot penetrate.",
  },
];

export const cameraInspectionFaqs: Faq[] = [
  {
    q: "How far does the camera go?",
    a: "Standard residential inspections cover from the clean-out to the city main — typically 75 to 100 feet. Longer runs require additional access points, which we can set up on the same visit.",
  },
  {
    q: "Does a camera inspection require any digging?",
    a: "No. The camera enters through an existing clean-out access point or through a toilet or clean drain. No digging, no wall openings, no damage to your property.",
  },
  {
    q: "How long does it take?",
    a: "A single-run residential inspection takes about 45 minutes to an hour, including setup, the full run, and reviewing the footage with you on-site.",
  },
  {
    q: "What pipe types can you inspect?",
    a: "Our cameras are sized for 2-inch through 10-inch diameter pipe and work in ABS plastic, PVC, cast iron, clay tile, and Orangeburg.",
  },
];

export const trenchlessReplacementFaqs: Faq[] = [
  {
    q: "How do I know if my pipe qualifies for trenchless?",
    a: "A camera inspection tells us definitively. If the pipe has a passable interior, consistent diameter, and no extreme bends, trenchless is almost always an option.",
  },
  {
    q: "Is a trenchlessly replaced pipe as good as a newly excavated one?",
    a: "In most cases better. HDPE pipe (pipe bursting) and cured epoxy liners are non-corrosive, root-resistant, and rated for 50+ year service life — outperforming the original clay or cast iron.",
  },
  {
    q: "How long does trenchless replacement take?",
    a: "Most residential projects complete in one to two days — camera inspection, access preparation, lining or bursting, and final verification included.",
  },
  {
    q: "Is trenchless covered by homeowners insurance?",
    a: "It depends on the policy and cause of failure. Sudden failures from root intrusion or external damage are more commonly covered than gradual deterioration. We provide photo and video documentation of the cause that you can submit with a claim.",
  },
];

export const pipeLiningFaqs: Faq[] = [
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

export const waterHeaterFaqs: Faq[] = [
  {
    q: "Can I upgrade from a tank to a tankless heater?",
    a: "Yes. Tankless installation typically requires a larger gas line and dedicated venting. We assess your current setup, provide a flat-rate quote, and complete the upgrade in a single visit if the infrastructure supports it.",
  },
  {
    q: "How long does water heater replacement take?",
    a: "Standard tank replacement takes 2–3 hours. Tankless installation with gas line work runs 3–5 hours.",
  },
  {
    q: "My water heater is leaking — is it an emergency?",
    a: "A slow seep from the pressure relief valve is a warning sign but not immediately critical. Water actively pooling from the tank base or connections warrants same-day service. Call us and we will tell you whether to shut off the gas and water supply in the meantime.",
  },
  {
    q: "Do you install both gas and electric water heaters?",
    a: "Yes. We service and replace all fuel types — natural gas, propane, and electric, both tank and tankless.",
  },
];

export type FaqGroup = {
  id: string;
  label: string;
  faqs: Faq[];
};

export const faqGroups: FaqGroup[] = [
  { id: "general", label: "General", faqs: homeFaqs },
  { id: "drain-cleaning", label: "Drain Cleaning", faqs: drainCleaningFaqs },
  { id: "sewer-repair", label: "Sewer Line Repair", faqs: sewerRepairFaqs },
  { id: "hydro-jetting", label: "Hydro Jetting", faqs: hydroJettingFaqs },
  { id: "camera-inspection", label: "Camera Inspection", faqs: cameraInspectionFaqs },
  { id: "trenchless-replacement", label: "Trenchless Replacement", faqs: trenchlessReplacementFaqs },
  { id: "pipe-lining", label: "Pipe Lining", faqs: pipeLiningFaqs },
  { id: "water-heater", label: "Water Heater Replacement", faqs: waterHeaterFaqs },
];
