import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permanent (308) redirects for retired routes — preserves SEO equity and
  // bookmarked/indexed links after the URL structure was reorganized.
  async redirects() {
    return [
      // Legacy marketing domains — once attached to this Vercel project,
      // any request to these hosts is sent straight to the matching county
      // page on the primary domain. Add/remove `has.value` entries here if
      // more legacy domains are retired into this project.
      {
        source: "/:path*",
        has: [{ type: "host", value: "theplumbingstarslosangeles.com" }],
        destination: "https://theplumbingstars.com/losangeles",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.theplumbingstarslosangeles.com" }],
        destination: "https://theplumbingstars.com/losangeles",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "theplumbingstarsventura.com" }],
        destination: "https://theplumbingstars.com/ventura",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.theplumbingstarsventura.com" }],
        destination: "https://theplumbingstars.com/ventura",
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
        source: "/areas",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/coupons",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
