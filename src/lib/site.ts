/** Canonical site-wide constants reused across metadata, structured data, and the sitemap. */
export const SITE_URL = "https://theplumbingstars.com";
export const SITE_NAME = "The Plumbing Stars";
export const SITE_TITLE_DEFAULT = "The Plumbing Stars | Expert Plumbing Services";
export const SITE_DESCRIPTION =
  "Licensed & insured plumbers available 24/7. Drain cleaning, water heater repair, pipe replacement, and emergency plumbing. Fast, reliable service.";
export const PHONE_DISPLAY = "(747) 463-1853";
export const PHONE_TEL = "+17474631853";
export const BUSINESS_EMAIL = "info@theplumbingstars.com";
export const LICENSE_NUMBER = "998456";

/** Resolve a site-relative path to a fully-qualified absolute URL. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
