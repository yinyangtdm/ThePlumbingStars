import type { Metadata } from "next";
import { Manrope, DM_Serif_Display } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Script from "next/script";
import ScrollRestoration from "@/components/ScrollRestoration";
import { LocationProvider } from "@/components/LocationProvider";
import { localBusinessSchema } from "@/lib/structuredData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE_DEFAULT, SITE_URL } from "@/lib/site";
import { getAllCityHubs, toServiceLocation } from "@/lib/cityHubs";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allLocations = getAllCityHubs().map(toServiceLocation);

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollRestoration />
        {/* Google Analytics (gtag.js) — loads only when NEXT_PUBLIC_GA_ID is set */ }
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        )}
        <JsonLd data={localBusinessSchema()} />
        <LocationProvider allLocations={allLocations}>{children}</LocationProvider>
      </body>
    </html>
  );
}
