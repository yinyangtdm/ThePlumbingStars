import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityServiceShell from "@/components/CityServiceShell";
import {
  cityServicePath,
  getCityHub,
  getCityHubs,
  hubMetaDescription,
  hubTitleArea,
} from "@/lib/cityHubs";
import { getServiceBySlug, services } from "@/lib/services";
import { PHONE_DISPLAY } from "@/lib/site";

type Params = Promise<{ city: string; service: string }>;

export function generateStaticParams() {
  return getCityHubs("ventura").flatMap((hub) =>
    services.map((service) => ({ city: hub.slug, service: service.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, service: serviceSlug } = await params;
  const hub = getCityHub("ventura", city);
  const service = getServiceBySlug(serviceSlug);
  if (!hub || !service) return { title: "Not Found" };

  const title = `${service.name} in ${hubTitleArea(hub)}`;
  const description = hubMetaDescription(
    hub,
    `${service.name} with flat-rate pricing. Call ${PHONE_DISPLAY}.`
  );
  const canonical = cityServicePath(hub, service.slug);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function VenturaCityServicePage({ params }: { params: Params }) {
  const { city, service: serviceSlug } = await params;
  const hub = getCityHub("ventura", city);
  const service = getServiceBySlug(serviceSlug);
  if (!hub || !service) notFound();

  const faqs = hub.faqs;

  return <CityServiceShell hub={hub} service={service} faqs={faqs} />;
}
