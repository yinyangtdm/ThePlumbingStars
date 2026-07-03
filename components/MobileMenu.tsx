"use client";

import { useState } from "react";

export interface NavLink {
  label: string;
  href: string;
}

const defaultLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Areas", href: "/areas" },
  { label: "Contact", href: "#contact" },
];

export default function MobileMenu({ links = defaultLinks }: { links?: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen bg-brand-navy border-t border-blue-800 z-50 shadow-lg">
          <nav className="flex flex-col">
            {/* Areas dropdown */}
            <div className="border-b border-blue-800">
              <button
                onClick={() => {
                  setAreasOpen(!areasOpen);
                  setServicesOpen(false);
                }}
                className="w-full text-left px-6 py-4 text-white hover:bg-brand-navy-dark flex items-center justify-between"
                aria-expanded={areasOpen}
              >
                <span className="font-medium">Areas</span>
                <svg className={`w-4 h-4 transform ${areasOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {areasOpen && (
                <div className="bg-brand-navy-dark">
                  <a href="/losangeles" onClick={() => setOpen(false)} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    LA County
                  </a>
                  <a href="/ventura" onClick={() => setOpen(false)} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Ventura County
                  </a>
                </div>
              )}
            </div>

            {/* Services dropdown */}
            <div className="border-b border-blue-800">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setAreasOpen(false);
                }}
                className="w-full text-left px-6 py-4 text-white hover:bg-brand-navy-dark flex items-center justify-between"
                aria-expanded={servicesOpen}
              >
                <span className="font-medium">Services</span>
                <svg className={`w-4 h-4 transform ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="bg-brand-navy-dark p-3">
                  <div className="grid grid-cols-1 gap-1">
                    <a href="/services/drain-cleaning" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Drain Cleaning
                    </a>
                    <a href="/services/sewer-repair" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Sewer Repair
                    </a>
                    <a href="/services/hydro-jetting" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Hydro Jetting
                    </a>
                    <a href="/services/camera-inspection" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Camera Inspection
                    </a>
                    <a href="/services/trenchless-replacement" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Trenchless Replacement
                    </a>
                    <a href="/services/pipe-lining" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Pipe Lining
                    </a>
                    <a href="/services/water-heater" onClick={() => setOpen(false)} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Water Heater
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/resources" onClick={() => setOpen(false)} className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium">Resources</a>
            <a href="/contact" onClick={() => setOpen(false)} className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium">Contact</a>
          </nav>
        </div>
      )}
    </div>
  );
}
