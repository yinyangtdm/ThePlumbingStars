import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import {
  cityHubPath,
  orderedServicesForHub,
  type CityHub,
} from "@/lib/cityHubs";
import { services, servicePath } from "@/lib/services";
import { citySchema, faqPageSchema } from "@/lib/structuredData";
import { LICENSE_NUMBER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import type { ServiceRegion } from "@/lib/serviceLocations";

const COUNTY_LABEL: Record<ServiceRegion, string> = {
  losangeles: "Los Angeles County",
  ventura: "Ventura County",
};

const COUNTY_PATH: Record<ServiceRegion, string> = {
  losangeles: "/losangeles",
  ventura: "/ventura",
};

export default function CityHubShell({ hub }: { hub: CityHub }) {
  const path = cityHubPath(hub);
  const countyLabel = COUNTY_LABEL[hub.region];
  const countyPath = COUNTY_PATH[hub.region];
  const orderedSlugs = orderedServicesForHub(hub);
  const orderedServices = orderedSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <>
      <JsonLd
        data={citySchema({
          cityName: hub.name,
          countyName: countyLabel,
          description: hub.intro,
          path,
          latitude: hub.coords[0],
          longitude: hub.coords[1],
        })}
      />
      {hub.faqs.length > 0 && <JsonLd data={faqPageSchema(hub.faqs)} />}
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: countyLabel, path: countyPath },
            { name: hub.name, path },
          ]}
        />

        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              {countyLabel}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Expert Plumbing in {hub.name}, {countyLabel.replace(" County", "")}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mb-8">{hub.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/schedule?region=${hub.region}`}
                className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                Schedule in {hub.name}
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <div className="bg-brand-red-dark text-white py-2.5">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-center">
            <span>&#10003; CA Lic. #{LICENSE_NUMBER}</span>
            <span>&#10003; Flat-Rate Pricing</span>
            <span>&#10003; Written Guarantee</span>
            <span>&#10003; 24/7 Emergency Service</span>
          </div>
        </div>

        <section className="py-14 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Local know-how for {hub.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-brand-sky bg-brand-sky-light/50 p-5">
                <h3 className="font-bold text-brand-navy mb-2">Permitting</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{hub.permittingAuthority}</p>
              </div>
              <div className="rounded-lg border border-brand-sky bg-brand-sky-light/50 p-5">
                <h3 className="font-bold text-brand-navy mb-2">Housing &amp; pipe stock</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{hub.housingNote}</p>
              </div>
              <div className="rounded-lg border border-brand-sky bg-brand-sky-light/50 p-5">
                <h3 className="font-bold text-brand-navy mb-2">Terrain</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{hub.terrainNote}</p>
              </div>
              <div className="rounded-lg border border-brand-sky bg-brand-sky-light/50 p-5">
                <h3 className="font-bold text-brand-navy mb-2">Trees &amp; roots</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{hub.treeNote}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 sm:px-6 bg-brand-light">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Plumbing services in {hub.name}
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              All seven core services — ordered for what {hub.name} homeowners ask for most.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {orderedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug)}
                  className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-brand-navy hover:shadow-sm transition-colors"
                >
                  <h3 className="font-bold text-brand-navy mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {hub.faqs.length > 0 && (
          <section className="py-14 px-4 sm:px-6 bg-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Common questions about plumbing in {hub.name}
              </h2>
              <div className="space-y-6">
                {hub.faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 px-4 sm:px-6 bg-brand-navy text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Need a plumber in {hub.name}?
            </h2>
            <p className="text-white/80 mb-8">
              Flat-rate pricing, camera diagnostics, and 24/7 emergency response across {countyLabel}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/schedule?region=${hub.region}`}
                className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                Book Now
              </Link>
              <Link
                href={countyPath}
                className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                More {countyLabel} cities
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
