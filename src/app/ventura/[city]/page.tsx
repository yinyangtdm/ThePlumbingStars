import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityHubShell from "@/components/CityHubShell";
import { getCityHub, getCityHubs } from "@/lib/cityHubs";
import { PHONE_DISPLAY } from "@/lib/site";

type Params = Promise<{ city: string }>;

export function generateStaticParams() {
  return getCityHubs("ventura").map((hub) => ({ city: hub.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const hub = getCityHub("ventura", city);
  if (!hub) return { title: "City Not Found" };

  return {
    title: `Plumbing Services in ${hub.name}`,
    description: `${hub.intro} Call ${PHONE_DISPLAY}.`,
    alternates: { canonical: `/ventura/${hub.slug}` },
  };
}

export default async function VenturaCityPage({ params }: { params: Params }) {
  const { city } = await params;
  const hub = getCityHub("ventura", city);
  if (!hub) notFound();

  return <CityHubShell hub={hub} />;
}
