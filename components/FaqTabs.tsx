"use client";

import { useState } from "react";
import type { FaqGroup } from "@/lib/faqs";

interface Props {
  groups: FaqGroup[];
}

export default function FaqTabs({ groups }: Props) {
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");

  const activeGroup = groups.find((group) => group.id === activeId) ?? groups[0];

  if (!activeGroup) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="FAQ categories"
        className="flex flex-wrap gap-2 mb-8"
      >
        {groups.map((group) => {
          const isActive = group.id === activeId;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              id={`faq-tab-${group.id}`}
              aria-selected={isActive}
              aria-controls={`faq-panel-${group.id}`}
              onClick={() => setActiveId(group.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-navy text-white"
                  : "bg-white text-brand-navy border border-gray-200 hover:border-brand-navy"
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`faq-panel-${activeGroup.id}`}
        aria-labelledby={`faq-tab-${activeGroup.id}`}
        className="space-y-6"
      >
        {activeGroup.faqs.map((faq) => (
          <div
            key={faq.q}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="font-bold text-gray-900 mb-2">{faq.q}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
