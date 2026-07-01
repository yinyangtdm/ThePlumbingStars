import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-dark text-white/70 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-1 flex items-center gap-2">
            <Image src="/logo.svg" alt="" width={24} height={24} unoptimized />
            The Plumbing Stars
          </p>
          <p className="text-sm">Family-owned since 1998. Licensed &amp; bonded in California.</p>
          <p className="text-xs mt-1">License #998456</p>
        </div>

        <div className="text-sm space-y-1">
          <p className="text-white font-medium mb-1">Contact</p>
          <p>
            <a href="tel:+17474631853" className="hover:text-white transition-colors">
              (747) 463-1853
            </a>
          </p>
          <p>
            <a href="mailto:info@theplumbingstars.com" className="hover:text-white transition-colors">
              info@theplumbingstars.com
            </a>
          </p>
          <p>24/7 Emergency Service</p>
        </div>

        <div className="text-sm space-y-1">
          <p className="text-white font-medium mb-1">Service Areas</p>
          <p>
            <a href="/losangeles" className="hover:text-white transition-colors">
              Los Angeles County
            </a>
          </p>
          <p>
            <a href="/ventura" className="hover:text-white transition-colors">
              Ventura County
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-xs text-center">
        © {new Date().getFullYear()} The Plumbing Stars. All rights reserved.
      </div>
    </footer>
  );
}
