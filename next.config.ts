import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Permanent (308) redirects for retired routes — preserves SEO equity and
  // bookmarked/indexed links after the URL structure was reorganized.
  async redirects() {
    return [
      // The apex domain is only kept around for legacy links/bookmarks — the
      // canonical host is the www subdomain (matches SITE_URL in
      // src/lib/site.ts). Codified here so it doesn't depend solely on the
      // Vercel dashboard's domain redirect setting.
      {
        source: "/:path*",
        has: [{ type: "host", value: "theplumbingstars.com" }],
        destination: "https://www.theplumbingstars.com/:path*",
        permanent: true,
      },
      // Legacy marketing domains — once attached to this Vercel project,
      // any request to these hosts is sent straight to the matching county
      // page on the primary domain. Add/remove `has.value` entries here if
      // more legacy domains are retired into this project.
      {
        source: "/:path*",
        has: [{ type: "host", value: "theplumbingstarslosangeles.com" }],
        destination: "https://www.theplumbingstars.com/losangeles",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.theplumbingstarslosangeles.com" }],
        destination: "https://www.theplumbingstars.com/losangeles",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "theplumbingstarsventura.com" }],
        destination: "https://www.theplumbingstars.com/ventura",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.theplumbingstarsventura.com" }],
        destination: "https://www.theplumbingstars.com/ventura",
        permanent: true,
      },
      {
        source: "/service-areas/los-angeles-county",
        destination: "/losangeles",
        permanent: true,
      },
      {
        source: "/service-areas/ventura-county",
        destination: "/ventura",
        permanent: true,
      },
      {
        source: "/service-areas",
        destination: "/losangeles",
        permanent: true,
      },
      {
        source: "/areas",
        destination: "/losangeles",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/coupons",
        permanent: true,
      },
      // Retired city hub pages — remap to the nearest remaining starred city.
      {
        source: "/losangeles/tarzana",
        destination: "/losangeles/woodland-hills",
        permanent: true,
      },
      {
        source: "/losangeles/reseda",
        destination: "/losangeles/northridge",
        permanent: true,
      },
      {
        source: "/losangeles/canoga-park",
        destination: "/losangeles/woodland-hills",
        permanent: true,
      },
      {
        source: "/losangeles/sherman-oaks",
        destination: "/losangeles/van-nuys",
        permanent: true,
      },
      {
        source: "/ventura/port-hueneme",
        destination: "/ventura/oxnard",
        permanent: true,
      },
      {
        source: "/ventura/port-hueneme/:service",
        destination: "/ventura/oxnard/:service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
