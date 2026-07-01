import Header from "./Header";
import Footer from "./Footer";
import ServiceAreaRouter from "./ServiceAreaRouter";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Service Areas", href: "/#service-areas" },
  { label: "Contact", href: "/#contact" },
];

interface FAQ {
  q: string;
  a: string;
}

interface ServiceShellProps {
  title: string;
  intro: string;
  faqs: FAQ[];
  children: React.ReactNode;
}

export default function ServiceShell({ title, intro, faqs, children }: ServiceShellProps) {
  return (
    <>
      <Header links={navLinks} />
      <main>
        {/* Hero */}
        <section className="bg-brand-navy text-white py-14 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{title}</h1>
            <p className="text-white/80 text-lg max-w-2xl mb-8">{intro}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                Book a Visit
              </a>
              <a
                href="tel:+17474631853"
                className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                Call (747) 463-1853
              </a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-brand-red-dark text-white py-2.5">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-center">
            <span>&#10003; CA Lic. #998456</span>
            <span>&#10003; Flat-Rate Pricing</span>
            <span>&#10003; 5-Year Written Guarantee</span>
            <span>&#10003; 24/7 Emergency Service</span>
          </div>
        </div>

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

        {/* Book CTA */}
        <section id="book" className="py-14 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to schedule?</h2>
            <p className="text-gray-500 mb-8">
              Enter your ZIP code to reach your area&apos;s booking page.
            </p>
            <ServiceAreaRouter />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
