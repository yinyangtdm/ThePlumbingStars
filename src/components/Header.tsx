import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import LocationIndicatorBar from "./LocationIndicatorBar";
import ServicesNavLinks from "./ServicesNavLinks";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function Header() {
  return (
    <header className="bg-brand-header sticky top-0 z-40 border-b-2 border-brand-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between py-0 md:py-2 min-h-[140px] md:min-h-[96px]">

          {/* Left: desktop logo + nav; mobile: hamburger + centered logo */}
          <div className="flex items-center gap-6 flex-1 h-full">
            {/* Desktop logo on the left */}
            <Link href="/" className="hidden md:flex items-center flex-none">
              <Image
                src="/logo.svg"
                alt="The Plumbing Stars"
                width={260}
                height={260}
                className="h-[128px] w-auto self-center"
                unoptimized
              />
            </Link>

            <MobileMenu />
            <nav className="hidden md:flex items-center gap-6 h-full min-h-[96px]">
              {/* Service Areas dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Areas
                </button>
                <div className="hidden group-hover:block absolute left-2 top-full w-52 bg-white border shadow-lg rounded-md z-50 p-3">
                  <Link href="/losangeles" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Los Angeles County
                  </Link>
                  <Link href="/ventura" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Ventura County
                  </Link>
                </div>
              </div>

              {/* Services dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Services
                </button>
                <div className="hidden group-hover:block absolute left-2 top-full w-64 bg-white border shadow-lg rounded-md z-50 p-3">
                  <div className="grid grid-cols-1 gap-1">
                    <ServicesNavLinks linkClassName="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded" />
                  </div>
                </div>
              </div>

              {/* Contact dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Contact
                </button>
                <div className="hidden group-hover:block absolute left-2 top-full w-64 bg-white border shadow-lg rounded-md z-50 p-3">
                  <Link href="/schedule" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Schedule a Service
                  </Link>
                  <Link href="/contact" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Contact Us
                  </Link>
                  <Link href="/search" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Find a Plumbing Star Nearby
                  </Link>
                  <Link href="/leave-review" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Leave a Review
                  </Link>
                </div>
              </div>

              {/* Resources dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Resources
                </button>
                <div className="hidden group-hover:block absolute left-2 top-full w-44 bg-white border shadow-lg rounded-md z-50 p-3">
                  <Link href="/coupons" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Coupons
                  </Link>
                  <Link href="/faq" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    FAQ
                  </Link>
                  <Link href="/reviews" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                    Reviews
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Center logo for mobile */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <Image
              src="/logo.svg"
              alt="The Plumbing Stars"
              width={160}
              height={160}
              className="h-[136px] md:h-[112px] w-auto self-center"
              priority
              unoptimized
            />
          </Link>

          {/* Right: phone + CTA */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <a href={`tel:${PHONE_TEL}`} className="hidden md:block text-right leading-tight">
              <span className="block text-xs font-bold uppercase tracking-[0.1em] text-brand-navy/50">
                24/7 Hotline
              </span>
              <span className="block text-xl font-bold text-brand-navy">{PHONE_DISPLAY}</span>
            </a>
            <Link
              href="/schedule"
              className="hidden md:inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm uppercase tracking-[0.12em] px-6 py-4 rounded-[3px] transition-colors"
            >
              Book Now
            </Link>
            {/* Mobile call button */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="md:hidden bg-brand-red hover:bg-brand-red-dark text-white flex items-center justify-center w-10 h-10 rounded-[3px] transition-colors"
              aria-label="Call now"
            >
              <span className="sr-only">Call Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.3 2.07.54 3.05a2 2 0 0 1-.45 1.95l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 1.95-.45c.98.24 2 .42 3.05.54A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
      <LocationIndicatorBar />
    </header>
  );
}
