import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityHubShell from "@/components/CityHubShell";
import {
  getCityHub,
  getCityHubs,
  hubMetaDescription,
  hubTitleArea,
} from "@/lib/cityHubs";
import { PHONE_DISPLAY } from "@/lib/site";

type Params = Promise<{ city: string }>;

export function generateStaticParams() {
  return getCityHubs("losangeles").map((hub) => ({ city: hub.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const hub = getCityHub("losangeles", city);
  if (!hub) return { title: "City Not Found" };

  const title = `Plumbing Services in ${hubTitleArea(hub)}`;
  const description = hubMetaDescription(hub, `Call ${PHONE_DISPLAY}.`);
  const canonical = `/losangeles/${hub.slug}`;

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

export default async function LosAngelesCityPage({ params }: { params: Params }) {
  const { city } = await params;
  const hub = getCityHub("losangeles", city);
  if (!hub) notFound();

  return <CityHubShell hub={hub} />;
}
