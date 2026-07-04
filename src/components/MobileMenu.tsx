"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  function closeOthers(except?: "areas" | "services" | "contact" | "resources") {
    if (except !== "areas") setAreasOpen(false);
    if (except !== "services") setServicesOpen(false);
    if (except !== "contact") setContactOpen(false);
    if (except !== "resources") setResourcesOpen(false);
  }

  function closeMenu() {
    setOpen(false);
  }

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
            {/* Service Areas dropdown */}
            <div className="border-b border-blue-800">
              <button
                onClick={() => {
                  setAreasOpen(!areasOpen);
                  closeOthers(areasOpen ? undefined : "areas");
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
                  <Link href="/losangeles" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    LA County
                  </Link>
                  <Link href="/ventura" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Ventura County
                  </Link>
                  <Link href="/service-areas" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    All Service Areas
                  </Link>
                </div>
              )}
            </div>

            {/* Services dropdown */}
            <div className="border-b border-blue-800">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  closeOthers(servicesOpen ? undefined : "services");
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
                    <Link href="/services/drain-cleaning" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Drain Cleaning
                    </Link>
                    <Link href="/services/sewer-repair" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Sewer Repair
                    </Link>
                    <Link href="/services/hydro-jetting" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Hydro Jetting
                    </Link>
                    <Link href="/services/camera-inspection" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Camera Inspection
                    </Link>
                    <Link href="/services/trenchless-replacement" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Trenchless Replacement
                    </Link>
                    <Link href="/services/pipe-lining" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Pipe Lining
                    </Link>
                    <Link href="/services/water-heater" onClick={closeMenu} className="block px-3 py-2 text-white hover:bg-brand-navy-dark rounded">
                      Water Heater Replacement
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact dropdown */}
            <div className="border-b border-blue-800">
              <button
                onClick={() => {
                  setContactOpen(!contactOpen);
                  closeOthers(contactOpen ? undefined : "contact");
                }}
                className="w-full text-left px-6 py-4 text-white hover:bg-brand-navy-dark flex items-center justify-between"
                aria-expanded={contactOpen}
              >
                <span className="font-medium">Contact</span>
                <svg className={`w-4 h-4 transform ${contactOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {contactOpen && (
                <div className="bg-brand-navy-dark">
                  <Link href="/schedule" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Schedule a Service
                  </Link>
                  <Link href="/search" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Find a Plumbing Star Nearby
                  </Link>
                  <Link href="/leave-review" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Leave a Review
                  </Link>
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div className="border-b border-blue-800">
              <button
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  closeOthers(resourcesOpen ? undefined : "resources");
                }}
                className="w-full text-left px-6 py-4 text-white hover:bg-brand-navy-dark flex items-center justify-between"
                aria-expanded={resourcesOpen}
              >
                <span className="font-medium">Resources</span>
                <svg className={`w-4 h-4 transform ${resourcesOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="bg-brand-navy-dark">
                  <Link href="/coupons" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Coupons
                  </Link>
                  <Link href="/faq" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    FAQ
                  </Link>
                  <Link href="/reviews" onClick={closeMenu} className="block px-8 py-3 text-white hover:bg-brand-navy-dark border-t border-blue-800">
                    Reviews
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
