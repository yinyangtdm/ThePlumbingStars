"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Coupon } from "@/lib/coupons";
import { coupons, scheduleUrlForCoupon } from "@/lib/coupons";

function expiryDateOneMonthOut(): string {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 1);
  return expiry.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function CouponCard({
  coupon,
  onView,
}: {
  coupon: Coupon;
  onView: (coupon: Coupon) => void;
}) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col">
      <p className="font-display text-2xl font-bold text-brand-red leading-none mb-1">{coupon.offer}</p>
      <h2 className="font-sans normal-case text-base font-bold text-gray-900 leading-tight mb-3">
        {coupon.title}
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={scheduleUrlForCoupon(coupon.id)}
          className="text-center bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold px-2 py-2 rounded-[3px] transition-colors"
        >
          Schedule Online
        </Link>
        <button
          type="button"
          onClick={() => onView(coupon)}
          className="text-center bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-bold px-2 py-2 rounded-[3px] transition-colors"
        >
          View
        </button>
      </div>
    </article>
  );
}

function CouponOverlay({
  coupon,
  onClose,
}: {
  coupon: Coupon;
  onClose: () => void;
}) {
  const expiry = expiryDateOneMonthOut();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coupon-dialog-title"
        className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="font-display text-4xl font-bold text-brand-red leading-none mb-2">{coupon.offer}</p>
            <h2 id="coupon-dialog-title" className="font-sans normal-case text-2xl font-bold text-gray-900">
              {coupon.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close coupon details"
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed sm:max-w-[65%]">
            This coupon is only valid for the service indicated on the coupon. It cannot be
            combined with another discount or promotion, and is valid until {expiry}.
          </p>
          <Link
            href={scheduleUrlForCoupon(coupon.id)}
            className="shrink-0 text-center bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold px-5 py-3 rounded-[3px] transition-colors whitespace-nowrap"
          >
            Schedule Service Online
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CouponGrid() {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} onView={setActiveCoupon} />
        ))}
      </div>

      {activeCoupon && (
        <CouponOverlay coupon={activeCoupon} onClose={() => setActiveCoupon(null)} />
      )}
    </>
  );
}
