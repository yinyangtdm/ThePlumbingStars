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
      <main className="bg-brand-light min-h-[60vh]">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />

        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Got Questions?
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Frequently Asked Questions</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <FaqTabs groups={faqGroups} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
