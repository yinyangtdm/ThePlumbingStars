"use client";

import Link from "next/link";
import { useLocationContext } from "./LocationProvider";
import { services, servicePathForLocation, type ServiceInfo } from "@/lib/services";

type ServiceCardsProps = {
  items?: ServiceInfo[];
  className?: string;
  cardClassName?: string;
};

/** Service card grid that prefers city-scoped URLs when a location is known. */
export default function ServiceCards({
  items = services,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  cardClassName = "group border border-gray-200 rounded-xl p-6 hover:border-brand-navy hover:shadow-sm transition-all",
}: ServiceCardsProps) {
  const { defaultLocation, status } = useLocationContext();
  const location = status === "resolved" ? defaultLocation : null;

  return (
    <div className={className}>
      {items.map((service) => (
        <Link
          key={service.slug}
          href={servicePathForLocation(location, service.slug)}
          className={cardClassName}
        >
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-navy transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">{service.description}</p>
          <span className="text-brand-navy text-sm font-medium">Learn more &rarr;</span>
        </Link>
      ))}
    </div>
  );
}
