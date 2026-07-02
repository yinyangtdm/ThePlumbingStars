import Image from "next/image";
import Link from "next/link";

const footerNavClass =
  "text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-dark text-white/70 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-1 flex items-center gap-2">
            <Image src="/logo.svg" alt="" width={36} height={36} unoptimized />
            The Plumbing Stars
          </p>
          <p className="text-sm">Family-owned since 1998. Licensed &amp; bonded in California.</p>
          <p className="text-xs mt-1">License #998456</p>
        </div>

        <div className="space-y-2">
          <p className="text-white text-sm font-bold uppercase tracking-[0.1em] mb-2">Contact</p>
          <p>
            <a href="tel:+17474631853" className={footerNavClass}>
              (747) 463-1853
            </a>
          </p>
          <p>
            <a href="mailto:info@theplumbingstars.com" className={footerNavClass}>
              info@theplumbingstars.com
            </a>
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.1em] text-white/70">
            24/7 Emergency Service
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-white text-sm font-bold uppercase tracking-[0.1em] mb-2">Service Areas</p>
          <p>
            <Link href="/losangeles" className={footerNavClass}>
              Los Angeles County
            </Link>
          </p>
          <p>
            <Link href="/ventura" className={footerNavClass}>
              Ventura County
            </Link>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-xs text-center">
        © {new Date().getFullYear()} The Plumbing Stars. All rights reserved.
      </div>
    </footer>
  );
}
