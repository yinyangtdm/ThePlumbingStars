import { customerReviews } from "@/lib/reviews";
import {
  BUSINESS_EMAIL,
  LICENSE_NUMBER,
  PHONE_TEL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

/** JSON-LD `LocalBusiness` (Plumber) schema, shared across every page via the root layout. */
export function localBusinessSchema() {
  const ratingCount = customerReviews.length;
  const averageRating =
    customerReviews.reduce((sum, review) => sum + review.rating, 0) / ratingCount;

  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: absoluteUrl("/logo.svg"),
    url: SITE_URL,
    telephone: PHONE_TEL,
    email: BUSINESS_EMAIL,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    hasCredential: `California Contractors State License Board #${LICENSE_NUMBER}`,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Los Angeles County, CA" },
      { "@type": "AdministrativeArea", name: "Ventura County, CA" },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: ratingCount,
    },
  };
}

/** JSON-LD `BreadcrumbList` schema for a hierarchical page trail. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** JSON-LD `Service` schema for an individual service landing page. */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: `${name} | ${SITE_NAME}`,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Los Angeles County, CA" },
      { "@type": "AdministrativeArea", name: "Ventura County, CA" },
    ],
  };
}

/** JSON-LD `FAQPage` schema built from an array of question/answer pairs. */
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/** JSON-LD review list + `AggregateRating` schema for the customer reviews page. */
export function reviewsSchema() {
  const ratingCount = customerReviews.length;
  const averageRating =
    customerReviews.reduce((sum, review) => sum + review.rating, 0) / ratingCount;

  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: ratingCount,
    },
    review: customerReviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
    })),
  };
}

/** JSON-LD for a curated city hub page (plumbing services offered in a specific city). */
export function citySchema({
  cityName,
  countyName,
  description,
  path,
  latitude,
  longitude,
}: {
  cityName: string;
  countyName: string;
  description: string;
  path: string;
  latitude?: number;
  longitude?: number;
}) {
  const areaServed: Record<string, unknown> = {
    "@type": "City",
    name: cityName,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${countyName}, CA`,
    },
  };

  if (latitude != null && longitude != null) {
    areaServed.geo = {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    serviceType: "Plumbing",
    name: `Plumbing Services in ${cityName} | ${SITE_NAME}`,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed,
  };
}
