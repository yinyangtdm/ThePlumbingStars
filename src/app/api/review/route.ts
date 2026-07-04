import { NextRequest, NextResponse } from "next/server";
import { isEmailConfigured, sendReviewEmail, type ReviewData } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, city, rating, review } = body as Partial<ReviewData>;

  if (!name?.trim() || !city?.trim() || !review?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  const reviewData: ReviewData = {
    name: name.trim(),
    city: city.trim(),
    rating: numericRating,
    review: review.trim(),
  };

  let emailed = false;
  if (isEmailConfigured()) {
    await sendReviewEmail(reviewData);
    emailed = true;
  }

  if (!emailed) {
    console.warn("[review] Email not configured — review received but not sent:", reviewData);
  }

  return NextResponse.json({ ok: true });
}
