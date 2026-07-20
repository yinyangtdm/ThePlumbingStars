"use client";

import Link from "next/link";
import { useLocationContext } from "./LocationProvider";
import { services, servicePathForLocation } from "@/lib/services";

type ServicesNavLinksProps = {
  linkClassName: string;
  onNavigate?: () => void;
};

/** Services menu links — city-scoped when a location is resolved, else county `/services/...`. */
export default function ServicesNavLinks({ linkClassName, onNavigate }: ServicesNavLinksProps) {
  const { defaultLocation, status } = useLocationContext();
  const location = status === "resolved" ? defaultLocation : null;

  return (
    <>
      {services.map((service) => (
        <Link
          key={service.slug}
          href={servicePathForLocation(location, service.slug)}
          onClick={onNavigate}
          className={linkClassName}
        >
          {service.name}
        </Link>
      ))}
    </>
  );
}
