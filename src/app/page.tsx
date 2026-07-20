import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCards from "@/components/ContactCards";
import ServiceCards from "@/components/ServiceCards";
import { PHONE_DISPLAY, PHONE_TEL, LICENSE_NUMBER, SITE_DESCRIPTION, SITE_TITLE_DEFAULT } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: SITE_TITLE_DEFAULT },
  description: SITE_DESCRIPTION,
};

const whyUs = [
  {
    title: "Flat-Rate Pricing",
    body: "You get the price in writing before the wrench comes out. No hourly billing, no surprises on the invoice.",
  },
  {
    title: "True 24/7 Response",
    body: "Real humans answer the phone around the clock. No surcharges for nights, weekends, or holidays.",
  },
  {
    title: "HD Camera Documentation",
    body: "You see exactly what we see — before, during, and after. Footage and photos are yours to keep.",
  },
  {
    title: "Written Guarantee",
    body: "Our workmanship guarantee is in writing. If something we fixed fails, we come back and fix it — no charge.",
  },
  {
    title: "No Trip Charges. Ever.",
    body: "We will never charge you just to show up. Free diagnosis, flat quote, work only begins when you approve.",
  },
  {
    title: "50% from Referrals",
    body: "Half our business comes from neighbors recommending us to neighbors. That number keeps us honest.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-navy chev-pattern text-white py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
              Los Angeles &amp; Ventura County
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Expert Drain &amp; Sewer Pros.
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Licensed technicians with 25+ years on the job. We show up fast, quote flat rates in
              writing, and back every job with a written guarantee.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href={`tel:${PHONE_TEL}`}
                className="bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-4 rounded-[3px] text-lg transition-colors"
              >
                Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/schedule"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-[3px] text-lg transition-colors border border-white/30"
              >
                Schedule a Service
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto text-center">
              <div>
                <p className="text-2xl font-bold text-brand-red">25+</p>
                <p className="text-white/60 text-xs mt-1">Years in Business</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-red">24/7</p>
                <p className="text-white/60 text-xs mt-1">Emergency Dispatch</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-red">$0</p>
                <p className="text-white/60 text-xs mt-1">Trip Charges</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-brand-red-dark text-white py-3">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm font-medium text-center">
            <span>&#10003; Licensed &amp; Bonded — CA Lic. #{LICENSE_NUMBER}</span>
            <span>&#10003; Written Guarantee</span>
            <span>&#10003; Flat-Rate Pricing</span>
            <span>&#10003; No Trip Charges</span>
          </div>
        </div>

        {/* Services */}
        <section id="services" className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Every drain &amp; sewer service you need.
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Same technicians, same flat rates, across both counties.
            </p>
            <ServiceCards />
          </div>
        </section>

        {/* Special offer */}
        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-brand-red text-6xl font-bold mb-2">$63</p>
            <h2 className="text-2xl font-bold mb-3">Main-line drain cleaning — flat rate.</h2>
            <p className="text-white/80 mb-6">
              And if we can&apos;t clear it, you owe us nothing.
            </p>
            <Link
              href="/schedule"
              className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-4 rounded-[3px] text-lg transition-colors"
            >
              Schedule a Service
            </Link>
          </div>
        </section>

        {/* Why Us */}
        <section id="why-us" className="py-16 px-4 sm:px-6 bg-brand-light">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
              A different kind of plumber.
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Considered, careful, and a little quieter than the competition.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map((reason) => (
                <div key={reason.title} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{reason.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 px-4 sm:px-6 bg-brand-light">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              How can we help?
            </h2>
            <ContactCards />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
