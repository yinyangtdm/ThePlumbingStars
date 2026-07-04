import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FaqTabs from "@/components/FaqTabs";
import { faqGroups } from "@/lib/faqs";
import { faqPageSchema } from "@/lib/structuredData";

const title = "Frequently Asked Questions";
const description =
  "Answers to common questions about drain cleaning, sewer repair, hydro jetting, camera inspection, trenchless replacement, pipe lining, and water heater service.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title, description },
};

const allFaqs = faqGroups.flatMap((group) => group.faqs);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(allFaqs)} />
      <Header />
      <main className="py-16 px-4 sm:px-6 bg-brand-light min-h-[60vh]">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-10">
            Frequently Asked Questions
          </h1>
          <FaqTabs groups={faqGroups} />
        </div>
      </main>
      <Footer />
    </>
  );
}
