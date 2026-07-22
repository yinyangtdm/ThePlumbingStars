import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { ServiceExtraImages, ServiceHeroImage } from "./ServicePageImages";
import type { Faq } from "@/lib/faqs";
import { getServiceExtraImages, getServiceHeroImage } from "@/lib/serviceImages";
import { faqPageSchema, serviceSchema } from "@/lib/structuredData";
import { LICENSE_NUMBER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

interface ServiceShellProps {
  /** Short label used in the breadcrumb trail and structured data, e.g. "Drain Cleaning". */
  serviceName: string;
  /** URL slug for this service, e.g. "drain-cleaning" (matches `/services/[slug]`). */
  slug: string;
  title: string;
  intro: string;
  scheduleLabel: string;
  faqs: Faq[];
  children: React.ReactNode;
}

export default function ServiceShell({
  serviceName,
  slug,
  title,
  intro,
  scheduleLabel,
  faqs,
  children,
}: ServiceShellProps) {
  const path = `/services/${slug}`;
  const heroImage = getServiceHeroImage(slug);
  const extraImages = getServiceExtraImages(slug);

  return (
    <>
      <JsonLd data={serviceSchema({ name: serviceName, description: intro, path })} />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: serviceName, path },
          ]}
        />
        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div
            className={`max-w-4xl mx-auto ${heroImage ? "lg:max-w-6xl lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center" : ""}`}
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{title}</h1>
              <p className="text-white/80 text-lg max-w-2xl mb-8">{intro}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/schedule"
                  className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
                >
                  {scheduleLabel}
                </Link>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            {heroImage && (
              <div className="mt-10 lg:mt-0">
                <ServiceHeroImage image={heroImage} />
              </div>
            )}
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-brand-red-dark text-white py-2.5">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-center">
            <span>&#10003; CA Lic. #{LICENSE_NUMBER}</span>
            <span>&#10003; Flat-Rate Pricing</span>
            <span>&#10003; Written Guarantee</span>
            <span>&#10003; 24/7 Emergency Service</span>
          </div>
        </div>

        <ServiceExtraImages images={extraImages} />

        {/* Page-specific content */}
        {children}

        {/* FAQ */}
        <section className="py-14 px-4 sm:px-6 bg-brand-light">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
