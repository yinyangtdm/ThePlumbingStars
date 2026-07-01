import Image from "next/image";
import Link from "next/link";
import MobileMenu, { type NavLink } from "./MobileMenu";

const defaultLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
];

export default function Header({ links = defaultLinks }: { links?: NavLink[] }) {
  return (
    <header className="bg-brand-navy sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg shrink-0">
          <Image src="/logo.svg" alt="" width={36} height={36} priority unoptimized />
          <span>The Plumbing Stars</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+17474631853"
          className="hidden md:inline-flex bg-brand-red hover:bg-brand-red-dark text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          (747) 463-1853
        </a>

        <MobileMenu links={links} />
      </div>
    </header>
  );
}
