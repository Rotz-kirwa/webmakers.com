import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Packages } from "@/components/site/Packages";
import { Addons } from "@/components/site/Addons";
import { PromoBanner } from "@/components/site/PromoBanner";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { CTASection } from "@/components/site/CTASection";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Professional Website Design for Every Business | WebMakers" },
      {
        name: "description",
        content:
          "WebMakers builds stunning, high-converting websites for restaurants, real estate, e-commerce, salons, clinics, schools, and more. Premium design, fast delivery, affordable packages starting at KSh 15,000.",
      },
      { name: "keywords", content: "website design, web development company, professional website builder, e-commerce website, booking system website, business website Kenya, responsive web design, website services" },
      { property: "og:title", content: "Professional Website Design for Every Business | WebMakers" },
      {
        property: "og:description",
        content:
          "Stunning, mobile-first websites that make your business look trustworthy and sell more. 200+ businesses online, 4.9/5 rating.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webmakers.com" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://webmakers.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "WebMakers",
          description: "Professional website design and web development company",
          url: "https://webmakers.com",
          areaServed: "KE",
          priceRange: "KSh 15000 - 200000",
          rating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "200",
          },
          service: [
            {
              "@type": "Service",
              name: "Website Design",
              description: "Professional responsive website design for businesses",
              areaServed: "KE",
            },
            {
              "@type": "Service",
              name: "E-Commerce Websites",
              description: "Full e-commerce solutions with payment integration",
              areaServed: "KE",
            },
            {
              "@type": "Service",
              name: "Booking Systems",
              description: "Online reservation and appointment booking systems",
              areaServed: "KE",
            },
            {
              "@type": "Service",
              name: "SEO Services",
              description: "Search engine optimization for business visibility",
              areaServed: "KE",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <section id="services" className="container-x py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Services</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Services built for every business goal.
            </h2>
            <p className="mt-4 text-muted-foreground">
              WebMakers creates websites, business automation, AI tools, e-commerce, and marketing systems that help brands look serious and generate more leads.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Website creation",
                description:
                  "Business sites, landing pages, booking portals, e-commerce stores, and custom branded experiences.",
              },
              {
                title: "Digital systems",
                description:
                  "CRM dashboards, appointment tools, reporting portals, payments, and operations automation.",
              },
              {
                title: "AI & automation",
                description:
                  "Chatbots, scheduling assistants, follow-up workflows, and sales-support systems.",
              },
              {
                title: "Growth services",
                description:
                  "SEO, ads, social setup, Google optimization, hosting, and ongoing support.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <PromoBanner
          headline="Still running your business only on WhatsApp? You're losing customers who search on Google."
          sub="A website makes your business visible 24/7 — even while you sleep."
          variant="navy"
        />
        <Packages />
        <PromoBanner
          headline="Look professional. Get trusted. Sell more."
          sub="Your competitors are online. Your business should be too."
          variant="gold"
        />
        <Addons />
        <WhyUs />
        <Process />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
