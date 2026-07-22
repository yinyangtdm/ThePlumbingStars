import { redirect } from "next/navigation";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

/** Legacy route — reviews are collected on Google. */
export default function LeaveReviewPage() {
  redirect(GOOGLE_REVIEW_URL);
}
