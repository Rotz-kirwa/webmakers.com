import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Bot,
  Boxes,
  CalendarCheck,
  Cloud,
  CreditCard,
  Database,
  Globe2,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Store,
  Users,
  WandSparkles,
  Workflow,
} from "lucide-react";

const themes = {
  red: {
    label: "Conversion tools",
    color: "#ef3525",
    soft: "rgba(239,53,37,0.08)",
  },
  blue: {
    label: "Growth systems",
    color: "#1d4ed8",
    soft: "rgba(29,78,216,0.08)",
  },
  navy: {
    label: "Automation & trust",
    color: "#07111f",
    soft: "rgba(7,17,31,0.06)",
  },
};

const addons: {
  icon: LucideIcon;
  name: string;
  category: string;
  whatItDoes: string;
  businessImpact: string[];
  perfectFor: string;
  theme: keyof typeof themes;
}[] = [
  {
    icon: Bot,
    name: "AI Chatbot Integration",
    category: "24/7 customer support",
    whatItDoes:
      "An intelligent chatbot that responds to customers, answers questions, guides visitors, collects leads, and provides support even when your team is offline.",
    businessImpact: [
      "Responds instantly even after business hours",
      "Increases inquiries and lead capture",
      "Makes the business feel modern and professional",
    ],
    perfectFor: "E-commerce, real estate, clinics, schools, agencies, logistics, finance, hotels.",
    theme: "blue",
  },
  {
    icon: Smartphone,
    name: "M-Pesa Payment Integration",
    category: "Faster payments",
    whatItDoes: "Allows customers to make direct M-Pesa payments from the website.",
    businessImpact: [
      "Reduces payment friction",
      "Builds customer trust at checkout",
      "Increases sales, bookings, and deposits",
    ],
    perfectFor: "Shops, hotels, schools, bookings, subscriptions, delivery businesses.",
    theme: "red",
  },
  {
    icon: CalendarCheck,
    name: "Booking & Reservation System",
    category: "Automated scheduling",
    whatItDoes:
      "Allows customers to schedule appointments, reserve services, or book rooms and experiences online.",
    businessImpact: [
      "Reduces calls and WhatsApp back-and-forth",
      "Improves customer convenience",
      "Helps manage availability professionally",
    ],
    perfectFor: "Hotels, Airbnbs, salons, clinics, lawyers, tours, gyms.",
    theme: "red",
  },
  {
    icon: LayoutDashboard,
    name: "Admin Dashboard",
    category: "Business control",
    whatItDoes:
      "A private management system for users, products, orders, content, bookings, analytics, and operations.",
    businessImpact: [
      "Gives the owner full business control",
      "Saves operational time",
      "Enables the business to scale with better organization",
    ],
    perfectFor: "E-commerce, logistics, finance, schools, SaaS platforms.",
    theme: "navy",
  },
  {
    icon: Bell,
    name: "SMS Notifications",
    category: "Customer updates",
    whatItDoes:
      "Automatically sends SMS alerts for payments, bookings, deliveries, confirmations, and updates.",
    businessImpact: [
      "Keeps customers informed",
      "Reduces missed updates",
      "Improves trust and customer experience",
    ],
    perfectFor: "Delivery services, finance, bookings, e-commerce, SACCOs.",
    theme: "navy",
  },
  {
    icon: Mail,
    name: "Email Marketing Integration",
    category: "Repeat customers",
    whatItDoes:
      "Collects customer emails and sends newsletters, promotions, updates, and automated campaigns.",
    businessImpact: [
      "Increases repeat customers",
      "Builds long-term customer relationships",
      "Boosts brand awareness and sales campaigns",
    ],
    perfectFor: "E-commerce, hotels, agencies, restaurants, startups.",
    theme: "blue",
  },
  {
    icon: MessageCircle,
    name: "Live Chat Integration",
    category: "Real-time support",
    whatItDoes: "Allows real-time customer communication directly from the website.",
    businessImpact: [
      "Improves response speed",
      "Increases inquiries and engagement",
      "Builds trust before a customer leaves the page",
    ],
    perfectFor: "Businesses that rely on consultations, quick support, or fast responses.",
    theme: "red",
  },
  {
    icon: Search,
    name: "Advanced SEO Optimization",
    category: "Google visibility",
    whatItDoes:
      "Optimizes the website structure and pages to rank better on Google search results.",
    businessImpact: [
      "Brings more organic website traffic",
      "Improves online visibility",
      "Supports long-term customer growth",
    ],
    perfectFor: "Every business that wants to be found online.",
    theme: "blue",
  },
  {
    icon: BarChart3,
    name: "Analytics & Visitor Tracking",
    category: "Smarter decisions",
    whatItDoes:
      "Tracks visitors, traffic sources, customer behavior, conversions, and best-performing pages.",
    businessImpact: [
      "Shows what customers actually do",
      "Improves marketing decisions",
      "Helps measure business growth",
    ],
    perfectFor: "Growing businesses and enterprises.",
    theme: "blue",
  },
  {
    icon: Users,
    name: "Customer Account System",
    category: "User experience",
    whatItDoes:
      "Allows customers to create accounts, track orders, save data, and manage their activity.",
    businessImpact: [
      "Improves customer retention",
      "Makes order tracking easier",
      "Creates a more professional platform experience",
    ],
    perfectFor: "E-commerce, finance, logistics, SaaS platforms.",
    theme: "navy",
  },
  {
    icon: Boxes,
    name: "Inventory Management System",
    category: "Stock control",
    whatItDoes: "Tracks products, stock levels, orders, and inventory movement automatically.",
    businessImpact: [
      "Prevents stock confusion",
      "Saves management time",
      "Reduces losses from poor inventory tracking",
    ],
    perfectFor: "Shops, electronics, supermarkets, imports businesses.",
    theme: "navy",
  },
  {
    icon: WandSparkles,
    name: "AI Content Generation",
    category: "Content engine",
    whatItDoes:
      "Uses AI to help generate blog posts, product descriptions, captions, and website content faster.",
    businessImpact: [
      "Saves content creation time",
      "Improves SEO consistency",
      "Keeps marketing and website content active",
    ],
    perfectFor: "Agencies, blogs, e-commerce, startups.",
    theme: "blue",
  },
  {
    icon: Store,
    name: "Multi-Vendor Marketplace System",
    category: "Platform revenue",
    whatItDoes: "Allows multiple sellers or vendors to sell products or services on one platform.",
    businessImpact: [
      "Expands business opportunities",
      "Creates commission revenue potential",
      "Builds a scalable marketplace model",
    ],
    perfectFor: "Marketplace platforms and large commerce systems.",
    theme: "red",
  },
  {
    icon: MapPin,
    name: "Google Maps & Location Integration",
    category: "Local trust",
    whatItDoes: "Shows the business location interactively on the website.",
    businessImpact: [
      "Makes customer navigation easier",
      "Improves local trust",
      "Supports better local visibility",
    ],
    perfectFor: "Hotels, restaurants, offices, clinics, schools.",
    theme: "blue",
  },
  {
    icon: Share2,
    name: "Social Media Integration",
    category: "Brand reach",
    whatItDoes: "Connects the website with Facebook, Instagram, TikTok, LinkedIn, and WhatsApp.",
    businessImpact: [
      "Improves brand engagement",
      "Increases followers and reach",
      "Makes communication easier across channels",
    ],
    perfectFor: "All businesses.",
    theme: "red",
  },
  {
    icon: ShieldCheck,
    name: "Security & Protection System",
    category: "Trust builder",
    whatItDoes:
      "Adds advanced website security against attacks, spam, unauthorized access, and unsafe forms.",
    businessImpact: [
      "Protects customer data",
      "Reduces hacking risks",
      "Improves reliability and customer confidence",
    ],
    perfectFor: "Finance, e-commerce, admin systems, enterprise websites.",
    theme: "navy",
  },
  {
    icon: Languages,
    name: "Multi-Language Support",
    category: "Wider audience",
    whatItDoes: "Allows the website to support multiple languages for different audiences.",
    businessImpact: [
      "Reaches wider audiences",
      "Improves accessibility",
      "Creates a better experience for international users",
    ],
    perfectFor: "Travel, hotels, global businesses, ministries.",
    theme: "blue",
  },
  {
    icon: Cloud,
    name: "Cloud Backup & Recovery",
    category: "Business continuity",
    whatItDoes: "Automatically backs up website data and allows recovery if something goes wrong.",
    businessImpact: [
      "Prevents data loss",
      "Improves reliability",
      "Gives serious businesses peace of mind",
    ],
    perfectFor: "Every serious business.",
    theme: "navy",
  },
  {
    icon: Globe2,
    name: "Push Notifications",
    category: "Return visits",
    whatItDoes: "Sends instant notifications to users about offers, updates, or news.",
    businessImpact: [
      "Increases engagement",
      "Drives repeat visits",
      "Boosts promotions, offers, and announcements",
    ],
    perfectFor: "E-commerce, blogs, media, SaaS platforms.",
    theme: "red",
  },
  {
    icon: Workflow,
    name: "AI Business Automation",
    category: "Scale faster",
    whatItDoes:
      "Automates repetitive business tasks using AI, smart workflows, and connected systems.",
    businessImpact: [
      "Saves time and manual work",
      "Improves efficiency",
      "Helps businesses scale faster with fewer bottlenecks",
    ],
    perfectFor: "Enterprise businesses, logistics, finance, agencies.",
    theme: "navy",
  },
  {
    icon: CreditCard,
    name: "Global Payment Gateway",
    category: "International checkout",
    whatItDoes: "Adds secure card and global payment options for customers beyond M-Pesa.",
    businessImpact: [
      "Supports international customers",
      "Improves checkout flexibility",
      "Helps premium businesses sell beyond one payment channel",
    ],
    perfectFor: "SaaS, e-commerce, travel, digital products, premium services.",
    theme: "red",
  },
  {
    icon: Database,
    name: "CRM Integration",
    category: "Lead management",
    whatItDoes:
      "Connects website forms and customer actions to a CRM for better lead tracking and follow-up.",
    businessImpact: [
      "Organizes leads automatically",
      "Improves follow-up speed",
      "Helps sales teams avoid losing opportunities",
    ],
    perfectFor: "Agencies, real estate, finance, schools, enterprise teams.",
    theme: "blue",
  },
];

export function Addons() {
  return (
    <section id="addons" className="relative overflow-hidden bg-[#f7f8fb] py-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[rgba(29,78,216,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[rgba(239,53,37,0.08)] blur-3xl" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Powerful Website Add-ons</span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            More than features. Business growth tools.
          </h2>
          <p className="mt-3 text-muted-foreground">
            These premium add-ons turn a website into a conversion tool, automation system, trust
            builder, and time-saving business engine.
          </p>
        </div>

        <div className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-2 rounded-full bg-white p-1 shadow-soft">
          {Object.values(themes).map((theme) => (
            <span
              key={theme.label}
              className="rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.14em]"
              style={{ background: theme.soft, color: theme.color }}
            >
              {theme.label}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {addons.map((addon) => {
            const theme = themes[addon.theme];
            const Icon = addon.icon;

            return (
              <article
                key={addon.name}
                className="group relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-36px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-44px_rgba(15,23,42,0.7)]"
              >
                <div
                  className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-70 blur-3xl"
                  style={{ background: theme.soft }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${theme.color}, var(--royal))` }}
                />

                <div className="relative flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-soft"
                    style={{ background: `linear-gradient(135deg, ${theme.color}, var(--royal))` }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p
                      className="text-[0.66rem] font-black uppercase tracking-[0.16em]"
                      style={{ color: theme.color }}
                    >
                      {addon.category}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-navy">{addon.name}</h3>
                  </div>
                </div>

                <div className="relative mt-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    What it does
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                    {addon.whatItDoes}
                  </p>
                </div>

                <div className="relative mt-5 border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Business impact
                  </p>
                  <ul className="mt-3 space-y-2">
                    {addon.businessImpact.map((impact) => (
                      <li
                        key={impact}
                        className="flex gap-2 text-sm leading-relaxed text-slate-700"
                      >
                        <span
                          className="mt-1 h-2 w-2 shrink-0 rounded-full"
                          style={{ background: theme.color }}
                        />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Perfect for
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{addon.perfectFor}</p>
                </div>

                <a
                  href="/describe-your-idea"
                  className="relative mt-5 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 hover:brightness-105"
                  style={{ background: `linear-gradient(135deg, ${theme.color}, var(--royal))` }}
                >
                  Add to my project
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
