import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Camera,
  Check,
  Cloud,
  Code2,
  GraduationCap,
  Megaphone,
  MonitorCog,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

const serviceGroups: Array<{
  title: string;
  summary: string;
  icon: LucideIcon;
  tone: string;
  services: string[];
}> = [
  {
    title: "Website Creation Services",
    summary:
      "Premium business websites that make a brand look serious, trusted, and ready to sell.",
    icon: Code2,
    tone: "from-blue-600 to-cyan-500",
    services: [
      "Business websites",
      "Landing pages",
      "Booking websites",
      "Portfolio websites",
      "School and clinic websites",
      "Restaurant, real estate, salon, travel, and dealership websites",
    ],
  },
  {
    title: "Custom Software for Business",
    summary: "Operational systems that help businesses reduce manual work and manage growth.",
    icon: MonitorCog,
    tone: "from-slate-950 to-blue-700",
    services: [
      "Enterprise dashboards",
      "CRM systems",
      "Booking systems",
      "Inventory systems",
      "POS systems",
      "Invoice and payroll systems",
      "HR, school, and Sacco systems",
    ],
  },
  {
    title: "Digital Marketing",
    summary:
      "Monthly growth services for visibility, lead generation, and recurring brand momentum.",
    icon: Megaphone,
    tone: "from-red-500 to-blue-700",
    services: [
      "Social media management",
      "Facebook and Instagram ads",
      "Google Ads",
      "TikTok marketing",
      "SEO optimization",
      "Google Business Profile setup",
      "Email and content marketing",
    ],
  },
  {
    title: "AI Services",
    summary: "Modern AI tools that help companies respond faster, automate work, and sell smarter.",
    icon: Bot,
    tone: "from-violet-600 to-blue-600",
    services: [
      "AI chatbots",
      "AI customer support",
      "AI automation",
      "AI appointment booking",
      "AI WhatsApp assistants",
      "AI content generation",
      "AI sales agents",
    ],
  },
  {
    title: "Business Automation",
    summary: "Premium automation for companies that need systems, not spreadsheets and guesswork.",
    icon: Workflow,
    tone: "from-emerald-600 to-slate-900",
    services: [
      "Workflow automation",
      "Customer follow-up systems",
      "Payment and reporting automation",
      "Staff and operations tools",
      "Approval workflows",
      "Data dashboards",
      "API integrations",
    ],
  },
  {
    title: "E-Commerce Services",
    summary:
      "Online stores and sales systems built to handle products, payments, and orders properly.",
    icon: ShoppingCart,
    tone: "from-orange-500 to-red-600",
    services: [
      "Online stores",
      "Payment integration",
      "M-Pesa integration",
      "Delivery tracking",
      "Product management",
      "WhatsApp ordering systems",
      "Sales dashboards",
    ],
  },
  {
    title: "Mobile App Development",
    summary:
      "Mobile-first products for companies that need customer apps or internal business tools.",
    icon: Smartphone,
    tone: "from-cyan-600 to-blue-800",
    services: [
      "Android apps",
      "iOS apps",
      "Progressive Web Apps",
      "Delivery apps",
      "Booking apps",
      "Business apps",
      "Customer dashboards",
    ],
  },
  {
    title: "Hosting & Maintenance",
    summary:
      "Recurring support that keeps websites secure, updated, backed up, and performing well.",
    icon: Cloud,
    tone: "from-slate-700 to-slate-950",
    services: [
      "Website hosting",
      "Domain management",
      "Monthly maintenance",
      "Security monitoring",
      "Backups",
      "Updates",
      "Performance optimization",
    ],
  },
  {
    title: "Cybersecurity Services",
    summary: "Protection for websites, admin areas, servers, and business-critical digital assets.",
    icon: ShieldCheck,
    tone: "from-green-600 to-blue-800",
    services: [
      "Website security",
      "Malware cleanup",
      "Security audits",
      "SSL setup",
      "Backup systems",
      "Admin protection",
      "Server hardening",
    ],
  },
  {
    title: "Photography & Media",
    summary:
      "Better visual content for websites, product pages, restaurants, real estate, and campaigns.",
    icon: Camera,
    tone: "from-pink-500 to-slate-900",
    services: [
      "Business photography",
      "Product photography",
      "Promo videos",
      "Drone shots",
      "Restaurant media",
      "Real estate media",
      "Website content shoots",
    ],
  },
  {
    title: "SEO & Visibility Packages",
    summary: "Search visibility work for businesses that want to be found and trusted online.",
    icon: Search,
    tone: "from-blue-700 to-emerald-600",
    services: [
      "SEO setup",
      "Google indexing",
      "Blog optimization",
      "Local SEO",
      "Search ranking",
      "Website speed optimization",
      "Metadata and content structure",
    ],
  },
  {
    title: "Training & Consultation",
    summary: "Guidance for founders, teams, and businesses adopting digital systems and AI.",
    icon: GraduationCap,
    tone: "from-amber-500 to-blue-700",
    services: [
      "Tech consultation",
      "Business digitization consultation",
      "Website training",
      "AI adoption consulting",
      "Freelancing mentorship",
      "Digital operations strategy",
      "System planning sessions",
    ],
  },
];

const revenuePillars = [
  {
    title: "Core Services",
    items: ["Websites", "E-commerce", "Branding", "SEO", "AI automation", "Business systems"],
  },
  {
    title: "Premium Services",
    items: [
      "Custom software",
      "Mobile apps",
      "Enterprise dashboards",
      "Payment integrations",
      "Cloud infrastructure",
    ],
  },
  {
    title: "Recurring Revenue",
    items: [
      "Hosting",
      "Maintenance",
      "SEO management",
      "Social media management",
      "AI support systems",
    ],
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "WebMakers Services — Websites, Software, AI & Digital Growth" },
      {
        name: "description",
        content:
          "Explore WebMakers services: website creation, custom business software, AI automation, digital marketing, ecommerce, mobile apps, hosting, SEO, cybersecurity, and consultation.",
      },
      { property: "og:title", content: "WebMakers Services" },
      {
        property: "og:description",
        content:
          "Websites, software, AI automation, marketing, ecommerce, hosting, SEO, and business systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#07111f] text-white">
          <div className="absolute inset-0 grid-bg opacity-15" />
          <div className="container-x relative grid gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:py-24">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/72">
                WebMakers services
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                We help businesses establish, automate, and grow their digital presence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
                WebMakers is more than a website studio. We build websites, software, AI tools,
                marketing systems, ecommerce platforms, and business automation that help serious
                businesses move faster.
              </p>
            </div>
            <div className="border border-white/12 bg-white/6 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-gold">
                Strongest long-term offers
              </p>
              <div className="mt-5 grid gap-3">
                {[
                  "SaaS systems",
                  "Automation",
                  "AI solutions",
                  "Marketing retainers",
                  "Hosting & maintenance",
                  "Enterprise systems",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-bold text-white/86"
                  >
                    <Check className="h-4 w-4 text-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Full digital transformation</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Services built for launch, growth, and monthly recurring support.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceGroups.map((group) => (
              <ServiceCard key={group.title} {...group} />
            ))}
          </div>
        </section>

        <section className="bg-secondary/70 py-16 lg:py-24">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <span className="eyebrow">Smart packages</span>
                <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
                  Business starter packages are easier to buy.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Instead of selling one small item at a time, WebMakers can bundle the essentials a
                  small business needs to look professional from day one.
                </p>
              </div>
              <div className="border border-border bg-white p-6 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-royal">
                      Business Launch Package
                    </p>
                    <h3 className="mt-3 text-2xl font-extrabold text-navy">
                      Everything an SME needs to start online.
                    </h3>
                  </div>
                  <Sparkles className="h-10 w-10 text-gold" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Logo",
                    "Website",
                    "Business email",
                    "SEO setup",
                    "Social media setup",
                    "Posters/flyers",
                    "Hosting",
                    "Launch guidance",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold text-navy">
                      <Check className="h-4 w-4 text-emerald-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-x py-16 lg:py-24">
          <div className="grid gap-5 lg:grid-cols-3">
            {revenuePillars.map((pillar) => (
              <article key={pillar.title} className="border border-border bg-white p-6 shadow-soft">
                <h3 className="text-xl font-extrabold text-navy">{pillar.title}</h3>
                <div className="mt-5 grid gap-3">
                  {pillar.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-xl bg-secondary px-3 py-2 text-sm font-bold text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container-x pb-20">
          <div className="overflow-hidden bg-[#07111f] p-8 text-white sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-gold">
                  Ready to grow digitally?
                </span>
                <h2 className="mt-4 max-w-3xl text-3xl font-extrabold sm:text-4xl">
                  Let WebMakers build the website, system, automation, or growth plan your business
                  needs next.
                </h2>
              </div>
              <a
                href="/describe-your-idea"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-black text-navy shadow-soft transition hover:-translate-y-1"
              >
                Start My Project <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ServiceCard({
  title,
  summary,
  icon: Icon,
  tone,
  services,
}: {
  title: string;
  summary: string;
  icon: LucideIcon;
  tone: string;
  services: string[];
}) {
  return (
    <article className="group flex h-full flex-col border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-navy">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-2">
        {services.map((service) => (
          <li key={service} className="flex gap-2 text-sm font-semibold text-navy/82">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            {service}
          </li>
        ))}
      </ul>
    </article>
  );
}
