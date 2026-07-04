export type Coupon = {
  id: string;
  offer: string;
  title: string;
  service: string;
};

export const coupons: Coupon[] = [
  {
    id: "drain-cleaning",
    offer: "$63",
    title: "Drain Cleaning",
    service: "Drain Cleaning",
  },
  {
    id: "sewer-repair",
    offer: "SAVE $100",
    title: "Sewer Line Repair",
    service: "Sewer Line Repair",
  },
  {
    id: "sewer-replacement",
    offer: "SAVE $200",
    title: "Sewer Line Replacement",
    service: "Trenchless Replacement",
  },
  {
    id: "water-heater",
    offer: "SAVE $50",
    title: "New Water Heater",
    service: "Water Heater Replacement",
  },
];

export function getCouponById(id: string): Coupon | undefined {
  return coupons.find((coupon) => coupon.id === id);
}

export function scheduleUrlForCoupon(couponId: string): string {
  return `/schedule?coupon=${encodeURIComponent(couponId)}`;
}
