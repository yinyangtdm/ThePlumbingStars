import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { ServiceExtraImages, ServiceHeroImage } from "./ServicePageImages";
import {
  cityHubPath,
  cityServicePath,
  hubPageIntro,
  hubServiceAreaPhrase,
  hubTitleArea,
  surroundingCitiesFor,
  type CityHub,
} from "@/lib/cityHubs";
import type { ServiceInfo } from "@/lib/services";
import { servicePath } from "@/lib/services";
import { getServiceExtraImages, getServiceHeroImage } from "@/lib/serviceImages";
import type { Faq } from "@/lib/faqs";
import { formatCityList } from "@/lib/surroundingCities";
import { cityServiceSchema, faqPageSchema } from "@/lib/structuredData";
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

export default function CityServiceShell({
  hub,
  service,
  faqs,
}: {
  hub: CityHub;
  service: ServiceInfo;
  faqs: Faq[];
}) {
  const path = cityServicePath(hub, service.slug);
  const hubPath = cityHubPath(hub);
  const countyLabel = COUNTY_LABEL[hub.region];
  const countyPath = COUNTY_PATH[hub.region];
  const nearby = surroundingCitiesFor(hub);
  const areaPhrase = hubServiceAreaPhrase(hub);
  const titleArea = hubTitleArea(hub);
  const title = `${service.name} in ${titleArea}`;
  const intro = `${hubPageIntro(hub)} Our ${service.name.toLowerCase()} work across ${areaPhrase} is camera-diagnosed when needed, quoted flat-rate in writing, and backed by a written guarantee.`;
  const heroImage = getServiceHeroImage(service.slug);
  const extraImages = getServiceExtraImages(service.slug);

  return (
    <>
      <JsonLd
        data={cityServiceSchema({
          serviceName: service.name,
          cityName: hub.name,
          countyName: countyLabel,
          description: intro,
          path,
          latitude: hub.coords[0],
          longitude: hub.coords[1],
          additionalCities: nearby,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: countyLabel, path: countyPath },
            { name: hub.name, path: hubPath },
            { name: service.name, path },
          ]}
        />

        <section className="bg-brand-navy chev-pattern text-white py-14 px-4 sm:px-6">
          <div
            className={`max-w-4xl mx-auto ${heroImage ? "lg:max-w-6xl lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center" : ""}`}
          >
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
                {hub.name}
                {nearby.length > 0 ? ` & nearby` : ""}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{title}</h1>
              <p className="text-white/80 text-lg max-w-2xl mb-8">{intro}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/schedule?region=${hub.region}`}
                  className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
                >
                  Schedule {service.name} in {hub.name}
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

        <div className="bg-brand-red-dark text-white py-2.5">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-center">
            <span>&#10003; CA Lic. #{LICENSE_NUMBER}</span>
            <span>&#10003; Flat-Rate Pricing</span>
            <span>&#10003; Written Guarantee</span>
            <span>&#10003; 24/7 Emergency Service</span>
          </div>
        </div>

        <ServiceExtraImages images={extraImages} />

        {nearby.length > 0 && (
          <section className="py-10 px-4 sm:px-6 bg-brand-sky-light/40 border-b border-brand-sky">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {service.name} near {hub.name}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                This page covers {service.name.toLowerCase()} for {hub.name} and surrounding
                communities including {formatCityList(nearby)}.
              </p>
            </div>
          </section>
        )}

        <section className="py-14 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Local know-how for {service.name.toLowerCase()} in {areaPhrase}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {service.name} for {areaPhrase}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Prefer the county-wide overview? See our{" "}
              <Link href={servicePath(service.slug)} className="text-brand-navy font-medium underline">
                {service.name.toLowerCase()} service page
              </Link>
              , or return to{" "}
              <Link href={hubPath} className="text-brand-navy font-medium underline">
                plumbing in {hub.name}
                {nearby.length > 0 ? ` and nearby areas` : ""}
              </Link>
              .
            </p>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="py-14 px-4 sm:px-6 bg-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Common questions about {service.name.toLowerCase()} in {hub.name}
                {nearby.length > 0 ? ` and nearby communities` : ""}
              </h2>
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
        )}

        <section className="py-14 px-4 sm:px-6 bg-brand-navy text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Need {service.name.toLowerCase()} in {titleArea}?
            </h2>
            <p className="text-white/80 mb-8">
              Flat-rate pricing, camera diagnostics, and 24/7 emergency response for {areaPhrase}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/schedule?region=${hub.region}`}
                className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                Book Now
              </Link>
              <Link
                href={hubPath}
                className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3 rounded-[3px] transition-colors"
              >
                More {hub.name} services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
