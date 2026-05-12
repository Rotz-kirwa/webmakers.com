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
      { title: "WebMakers — Premium Websites for Every Business" },
      {
        name: "description",
        content:
          "WebMakers builds high-converting websites for restaurants, real estate, e-commerce, salons, clinics, schools and more. Premium design, fast delivery, affordable packages.",
      },
      { property: "og:title", content: "WebMakers — Premium Websites for Every Business" },
      {
        property: "og:description",
        content:
          "Stunning, mobile-first websites that make your business look trustworthy and sell more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
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
