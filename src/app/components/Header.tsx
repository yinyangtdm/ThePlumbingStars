import Image from "next/image";
import Link from "next/link";
import MobileMenu, { type NavLink } from "./MobileMenu";

const defaultLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Areas", href: "/service-areas" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Header({ links = defaultLinks }: { links?: NavLink[] }) {
  return (
    <header className="bg-[#eceff4] sticky top-0 z-40 border-b-2 border-brand-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between py-4 min-h-[144px]">

          {/* Left: hamburger (mobile) + desktop nav */}
          <div className="flex items-center gap-6 flex-1 h-full">
            <MobileMenu links={links} />
            <nav className="hidden md:flex items-center gap-6 h-full">
              {/* Areas dropdown */}
              <div className="relative group h-full">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Areas
                </button>
                <div className="hidden group-hover:block absolute left-0 top-full mt-2 w-44 bg-white border shadow-lg rounded-md z-50">
                  <a href="/losangeles" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Los Angeles
                  </a>
                  <a href="/ventura" className="block px-4 py-2 text-sm text-brand-navy hover:bg-brand-sky-light">
                    Ventura
                  </a>
                </div>
              </div>

              {/* Services dropdown */}
              <div className="relative group h-full">
                <button className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors h-full flex items-center px-2">
                  Services
                </button>
                <div className="hidden group-hover:block absolute left-0 top-full mt-2 w-64 bg-white border shadow-lg rounded-md z-50 p-3">
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
                      Water Heater
                    </a>
                  </div>
                </div>
              </div>

              <a href="/contact" className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors">
                Contacts
              </a>
            </nav>
          </div>

          {/* Center: logo (absolute so it doesn't affect flex layout) */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.svg"
              alt="The Plumbing Stars"
              width={144}
              height={144}
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
              className="md:hidden bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-[3px] transition-colors"
            >
              Call Now
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
