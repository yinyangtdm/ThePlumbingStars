"use client";

import { useState } from "react";

export interface NavLink {
  label: string;
  href: string;
}

const defaultLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Los Angeles", href: "/losangeles" },
  { label: "Ventura", href: "/ventura" },
  { label: "Contact", href: "#contact" },
];

export default function MobileMenu({ links = defaultLinks }: { links?: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="p-2 text-brand-navy"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-brand-navy border-t border-blue-800 z-50 shadow-lg">
          <nav className="flex flex-col">
            <a href="/service-areas" onClick={() => setOpen(false)} className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium">Areas</a>
            <a href="/services" onClick={() => setOpen(false)} className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium">Services</a>
            <a href="/resources" onClick={() => setOpen(false)} className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium">Resources</a>
            <a href="/contact" onClick={() => setOpen(false)} className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium">Contact</a>
            <div className="px-6 py-4">
              <a
                href="tel:+17474631853"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 px-4 rounded-lg"
              >
                Call Now: (747) 463-1853
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
