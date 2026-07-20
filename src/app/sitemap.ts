import type { MetadataRoute } from "next";
import { services, servicePath } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import { cityHubPath, cityServicePath, getAllCityHubs } from "@/lib/cityHubs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/losangeles`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/ventura`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/coupons`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/reviews`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}${servicePath(service.slug)}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = getAllCityHubs().map((hub) => ({
    url: `${SITE_URL}${cityHubPath(hub)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityServiceRoutes: MetadataRoute.Sitemap = getAllCityHubs().flatMap((hub) =>
    services.map((service) => ({
      url: `${SITE_URL}${cityServicePath(hub, service.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...cityServiceRoutes];
}
