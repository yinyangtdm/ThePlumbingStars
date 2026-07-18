import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { BUSINESS_EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const title = "Contact Us";
const description =
  "Have a question for The Plumbing Stars? Send us a message or call for 24/7 emergency plumbing help in Los Angeles and Ventura County.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }]} />

        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Get In Touch
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
          </div>
        </section>

        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-2">
              Questions about our services, pricing, or coverage area? Send a message below and
              we&apos;ll get back to you soon.
            </p>
            <p className="text-gray-600 mb-8">
              Prefer to talk? Call{" "}
              <a href={`tel:${PHONE_TEL}`} className="text-brand-navy font-bold hover:underline">
                {PHONE_DISPLAY}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="text-brand-navy font-bold hover:underline"
              >
                {BUSINESS_EMAIL}
              </a>
              .
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
