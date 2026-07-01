import type { Metadata } from "next";
import { Manrope, DM_Serif_Display } from "next/font/google";
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
  title: "The Plumbing Stars | Expert Plumbing Services",
  description:
    "Licensed & insured plumbers available 24/7. Drain cleaning, water heater repair, pipe replacement, and emergency plumbing. Fast, reliable service.",
  metadataBase: new URL("https://theplumbingstars.com"),
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "The Plumbing Stars | Expert Plumbing Services",
    description:
      "Licensed & insured plumbers available 24/7. Fast, reliable service.",
    url: "https://theplumbingstars.com",
    siteName: "The Plumbing Stars",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
