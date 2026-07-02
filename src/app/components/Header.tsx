import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { defaultNavItems, isNavDropdown, type NavItem } from "@/lib/navLinks";

export default function Header({ items = defaultNavItems }: { items?: NavItem[] }) {
  return (
    <header className="bg-[#eceff4] sticky top-0 z-40 border-b-2 border-brand-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between py-4 min-h-[144px]">

          <div className="flex items-center gap-6 flex-1">
            <MobileMenu items={items} />
            <nav className="hidden md:flex items-center gap-6">
              {items.map((item) =>
                isNavDropdown(item) ? (
                  <div key={item.label} className="relative group">
                    <button
                      type="button"
                      className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors flex items-center gap-1"
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 pt-2 hidden group-hover:block group-focus-within:block">
                      <div className="bg-white border-2 border-brand-navy rounded-[3px] shadow-lg min-w-[220px] py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-bold text-brand-navy hover:bg-brand-light hover:text-brand-red transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>
          </div>

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

          <div className="flex items-center gap-4 flex-1 justify-end">
            <a href="tel:+17474631853" className="hidden md:block text-right leading-tight">
              <span className="block text-xs font-bold uppercase tracking-[0.1em] text-brand-navy/50">
                24/7 Hotline
              </span>
              <span className="block text-xl font-bold text-brand-navy">(747) 463-1853</span>
            </a>
            <Link
              href="/#service-areas"
              className="hidden md:inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm uppercase tracking-[0.12em] px-6 py-4 rounded-[3px] transition-colors"
            >
              Book Now
            </Link>
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
