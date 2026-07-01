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
        <div className="relative flex items-center justify-between py-4 min-h-[96px]">

          {/* Left: hamburger (mobile) + desktop nav */}
          <div className="flex items-center gap-6 flex-1">
            <MobileMenu links={links} />
            <nav className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-brand-navy text-sm font-bold uppercase tracking-[0.1em] hover:text-brand-red transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: logo (absolute so it doesn't affect flex layout) */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.svg"
              alt="The Plumbing Stars"
              width={96}
              height={96}
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
