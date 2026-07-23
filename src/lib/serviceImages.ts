/** Production service photos under `public/images/services/`. Reference-only slots omitted until assets exist. */
export type ServiceImage = {
  src: string;
  alt: string;
};

const serviceImages: Partial<Record<string, ServiceImage[]>> = {
  "drain-cleaning": [
    {
      src: "/images/services/drain-cleaning/drain-cleaning.jpg",
      alt: "Plumber clearing a residential drain line",
    },
  ],
  "pipe-lining": [
    {
      src: "/images/services/pipe-lining/pipe-lining.png",
      alt: "Trenchless cured-in-place pipe lining inside a sewer line",
    },
  ],
};

export function getServiceImages(slug: string): ServiceImage[] {
  return serviceImages[slug] ?? [];
}

export function getServiceHeroImage(slug: string): ServiceImage | undefined {
  return getServiceImages(slug)[0];
}

export function getServiceExtraImages(slug: string): ServiceImage[] {
  return getServiceImages(slug).slice(1);
}
