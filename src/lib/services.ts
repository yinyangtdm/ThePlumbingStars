/** Canonical list of bookable service pages — single source of truth for nav, home grid, and the services index. */
export type ServiceInfo = {
  slug: string;
  name: string;
  description: string;
};

export const services: ServiceInfo[] = [
  {
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    description:
      "Kitchens, bathrooms, laundry rooms, and main lines — diagnosed by camera, cleared at a flat rate, and guaranteed for thirty days.",
  },
  {
    slug: "sewer-repair",
    name: "Sewer Line Repair",
    description:
      "From a hairline crack to a collapsed main line, we'll show you the footage, propose two options, and finish on time.",
  },
  {
    slug: "hydro-jetting",
    name: "Hydro Jetting",
    description:
      "The pressurised, no-chemical method that scours roots, grease, and scale until pipes look factory-new.",
  },
  {
    slug: "camera-inspection",
    name: "Camera Inspection",
    description: "HD video down the line so you understand the problem before you understand the bill.",
  },
  {
    slug: "trenchless-replacement",
    name: "Trenchless Replacement",
    description:
      "No-dig pipe bursting and lining — for the homeowner who'd rather not lose a driveway, lawn, or weekend.",
  },
  {
    slug: "pipe-lining",
    name: "Pipe Lining",
    description: "CIPP trenchless lining restores aging pipes from the inside without excavation.",
  },
  {
    slug: "water-heater",
    name: "Water Heater Replacement",
    description: "Tank & tankless replacement — install, haul-away, same-afternoon turnaround.",
  },
];

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}

/** Options for the booking form's service dropdown — the bookable pages plus a few catch-all types. */
export const bookingFormServiceOptions: string[] = [
  ...services.map((service) => service.name),
  "Epoxy Brush Coating",
  "Other / Not Sure",
];
