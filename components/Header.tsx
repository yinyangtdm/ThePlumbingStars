import Image from "next/image";
import Link from "next/link";
import MobileMenu, { type NavLink } from "./MobileMenu";

const defaultLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Areas", href: "/areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Header({ links = defaultLinks }: { links?: NavLink[] }) {
  return (
    <header className="bg-[#eceff4] sticky top-0 z-40 border-b-2 border-brand-navy">
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

            <MobileMenu links={links} />
            <nav className="hidden md:flex items-center gap-6 h-full min-h-[96px]">
              {/* Areas dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Areas
                </button>
                <div className="hidden group-hover:block absolute left-0 top-full -mt-6 w-44 bg-white border shadow-lg rounded-md z-50">
                  <a href="/losangeles" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Los Angeles
                  </a>
                  <a href="/ventura" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Ventura
                  </a>
                </div>
              </div>

              {/* Services dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Services
                </button>
                <div className="hidden group-hover:block absolute left-0 top-full -mt-6 w-64 bg-white border shadow-lg rounded-md z-50 p-3">
                  <div className="grid grid-cols-1 gap-1">
                    <a href="/services/drain-cleaning" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Drain Cleaning
                    </a>
                    <a href="/services/sewer-repair" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Sewer Repair
                    </a>
                    <a href="/services/hydro-jetting" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Hydro Jetting
                    </a>
                    <a href="/services/camera-inspection" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Camera Inspection
                    </a>
                    <a href="/services/trenchless-replacement" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Trenchless Replacement
                    </a>
                    <a href="/services/pipe-lining" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Pipe Lining
                    </a>
                    <a href="/services/water-heater" className="block px-3 py-2 text-sm text-brand-navy hover:bg-brand-sky-light rounded">
                      Water Heater Replacement
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Contact
                </button>
                <div className="hidden group-hover:block absolute left-0 top-full -mt-6 w-64 bg-white border shadow-lg rounded-md z-50">
                  <a href="/schedule" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Schedule a Service
                  </a>
                  <a href="/search" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Find a Plumbing Star Nearby
                  </a>
                  <a href="/leave-review" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Leave a Review
                  </a>
                </div>
              </div>

              {/* Resources dropdown */}
              <div className="relative group h-[96px]">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Resources
                </button>
                <div className="hidden group-hover:block absolute left-0 top-full -mt-6 w-44 bg-white border shadow-lg rounded-md z-50">
                  <a href="/coupons" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Coupons
                  </a>
                  <a href="/faq" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    FAQ
                  </a>
                  <a href="/reviews" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Reviews
                  </a>
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
            <a href="tel:+17474631853" className="hidden md:block text-right leading-tight">
              <span className="block text-xs font-bold uppercase tracking-[0.1em] text-brand-navy/50">
                24/7 Hotline
              </span>
              <span className="block text-xl font-bold text-brand-navy">(747) 463-1853</span>
            </a>
            <a
              href="/#service-areas"
              className="hidden md:inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm uppercase tracking-[0.12em] px-6 py-4 rounded-[3px] transition-colors"
            >
              Book Now
            </a>
            {/* Mobile call button */}
            <a
              href="tel:+17474631853"
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
    </header>
  );
}
