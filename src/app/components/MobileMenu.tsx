"use client";

import { useState } from "react";
import type { NavItem, NavLink } from "@/lib/navLinks";
import { defaultNavItems, isNavDropdown } from "@/lib/navLinks";

export default function MobileMenu({ items = defaultNavItems }: { items?: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [areasExpanded, setAreasExpanded] = useState(false);

  const close = () => {
    setOpen(false);
    setAreasExpanded(false);
  };

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
            {items.map((item) =>
              isNavDropdown(item) ? (
                <div key={item.label} className="border-b border-blue-800">
                  <button
                    type="button"
                    onClick={() => setAreasExpanded(!areasExpanded)}
                    className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-brand-navy-dark font-medium text-left"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${areasExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {areasExpanded && (
                    <div className="bg-brand-navy-dark">
                      {item.children.map((child: NavLink) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={close}
                          className="block px-8 py-3 text-white/90 hover:bg-brand-navy text-sm border-t border-blue-800/50"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="px-6 py-4 text-white hover:bg-brand-navy-dark border-b border-blue-800 font-medium"
                >
                  {item.label}
                </a>
              ),
            )}
            <div className="px-6 py-4">
              <a
                href="tel:+17474631853"
                onClick={close}
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
