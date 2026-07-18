import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS_EMAIL,
  LICENSE_NUMBER,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_NAME,
} from "@/lib/site";
import { cityHubPath, getCityHubs } from "@/lib/cityHubs";

export default function Footer() {
  const laHubs = getCityHubs("losangeles");
  const venturaHubs = getCityHubs("ventura");

  return (
    <footer className="bg-brand-navy-dark text-white/70 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-1 flex items-center gap-4">
            <Image src="/logo.svg" alt="" width={144} height={144} unoptimized />
            {SITE_NAME}
          </p>
          <p className="text-sm">Family-owned since 1998. Licensed &amp; bonded in California.</p>
          <p className="text-xs mt-1">License #{LICENSE_NUMBER}</p>
        </div>

        <div className="text-sm space-y-1">
          <p className="text-white font-medium mb-1">Contact</p>
          <p>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </p>
          <p>
            <a href={`tel:${PHONE_TEL}`} className="hover:text-white transition-colors">
              {PHONE_DISPLAY}
            </a>
          </p>
          <p>
            <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition-colors">
              {BUSINESS_EMAIL}
            </a>
          </p>
          <p>24/7 Emergency Service</p>
        </div>

        <div className="text-sm space-y-1">
          <p className="text-white font-medium mb-1">Service Areas</p>
          <p>
            <Link href="/losangeles" className="hover:text-white transition-colors">
              Los Angeles County
            </Link>
          </p>
          <p>
            <Link href="/ventura" className="hover:text-white transition-colors">
              Ventura County
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pt-8 border-t border-white/10">
        <p className="text-white font-medium text-sm mb-4">Popular Service Areas</p>
        <div className="grid sm:grid-cols-2 gap-8 text-sm">
          <div>
            <p className="text-white/90 font-semibold mb-2">Los Angeles County</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {laHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={cityHubPath(hub)}
                  className="hover:text-white transition-colors"
                >
                  {hub.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/90 font-semibold mb-2">Ventura County</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {venturaHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={cityHubPath(hub)}
                  className="hover:text-white transition-colors"
                >
                  {hub.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-xs text-center">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
