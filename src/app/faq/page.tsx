import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqTabs from "@/components/FaqTabs";
import { faqGroups } from "@/lib/faqs";

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4 sm:px-6 bg-brand-light min-h-[60vh]">
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
