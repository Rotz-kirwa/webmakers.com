import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const tiers = [
  {
    name: "Starter Website",
    price: "KSh 15,000",
    blurb:
      "A clean, professional website for small businesses that need to stop looking invisible online and start building trust.",
    bestFor: [
      "New businesses",
      "Personal brands",
      "Small service providers",
      "Side hustles",
      "Simple company profiles",
    ],
    outcome:
      "Helps customers find your business, understand what you offer, and contact you quickly through WhatsApp or phone.",
    features: [
      "1–3 core pages",
      "Mobile responsive design",
      "Home, about, services/contact structure",
      "Professional brand colors & layout",
      "Contact section with clear call-to-action",
      "WhatsApp click-to-chat button",
      "Basic SEO setup",
      "Fast delivery",
      "Social media links",
      "Google-ready business information",
    ],
    cta: "Start with Starter",
    detailGradient: "linear-gradient(135deg, #0ea5e9, #0369a1)",
    detailShadow: "0 16px 30px -18px rgba(14,165,233,0.8)",
    buttonGradient: "linear-gradient(135deg, #10b981, #047857)",
    buttonShadow: "0 18px 34px -18px rgba(16,185,129,0.82)",
    featured: false,
  },
  {
    name: "Business Website",
    price: "KSh 30,000",
    blurb:
      "A stronger website for businesses that want to look established, explain their services clearly, and convert visitors into serious inquiries.",
    bestFor: [
      "Growing businesses",
      "Clinics & salons",
      "Agencies & consultants",
      "Schools & institutions",
      "Restaurants, hotels & local brands",
    ],
    outcome:
      "Gives your business a fuller online presence with more pages, better trust sections, maps, forms, and content that makes customers confident.",
    features: [
      "4–7 professionally written pages",
      "Premium custom design direction",
      "Service/category pages",
      "Contact form",
      "Google Maps location section",
      "WhatsApp integration",
      "Testimonials/trust section",
      "Photo/gallery section",
      "Basic admin updates",
      "SEO setup for key pages",
      "Speed & mobile optimization",
    ],
    cta: "Choose Business",
    detailGradient: "linear-gradient(135deg, #8b5cf6, #5b21b6)",
    detailShadow: "0 16px 32px -18px rgba(139,92,246,0.85)",
    buttonGradient: "linear-gradient(135deg, #2563eb, #153e91)",
    buttonShadow: "0 18px 38px -18px rgba(37,99,235,0.9)",
    featured: true,
  },
  {
    name: "Premium Website",
    price: "KSh 50,000+",
    blurb:
      "A high-converting website for businesses that need bookings, payments, product selling, dashboards, or more advanced customer workflows.",
    bestFor: [
      "Online stores",
      "Hotels & bookings",
      "Real estate brands",
      "Training platforms",
      "Businesses that need admin control",
    ],
    outcome:
      "Turns your website into a working business tool with systems for selling, booking, managing content, collecting leads, and tracking performance.",
    features: [
      "E-commerce or catalog setup",
      "Booking/reservation system",
      "Admin dashboard",
      "M-Pesa integration",
      "Product/service management",
      "Blog/news section",
      "Advanced SEO structure",
      "Analytics setup",
      "Lead capture forms",
      "Customer inquiry workflows",
      "Conversion-focused landing sections",
      "Launch support & basic training",
    ],
    cta: "Go Premium",
    detailGradient: "linear-gradient(135deg, #f59e0b, #b45309)",
    detailShadow: "0 16px 32px -18px rgba(245,158,11,0.82)",
    buttonGradient: "linear-gradient(135deg, #db2777, #7e1d55)",
    buttonShadow: "0 18px 38px -18px rgba(219,39,119,0.82)",
    featured: false,
  },
  {
    name: "Enterprise Website",
    price: "KSh 100,000+",
    blurb:
      "Advanced websites and systems for companies that need automation, AI integration, dashboards, payments, analytics, and enterprise-level scalability.",
    bestFor: [
      "Established companies",
      "Large brands",
      "Platforms & marketplaces",
      "Multi-branch businesses",
      "Businesses ready to automate operations",
    ],
    outcome:
      "Creates a complete digital system that can handle customers, teams, payments, dashboards, automation, analytics, and scalable operations.",
    message:
      "Built for businesses that are ready to scale, automate, dominate, and operate professionally at the highest level.",
    features: [
      "Fully custom premium UI/UX design",
      "Unlimited core pages",
      "Advanced admin dashboard",
      "AI chatbot/customer support integration",
      "Full e-commerce system",
      "Booking & reservation system",
      "M-Pesa & global payment integration",
      "Customer accounts & authentication",
      "Role-based admin/staff management",
      "Advanced analytics & reporting",
      "Inventory/order management system",
      "API integrations",
      "CRM integration",
      "Email marketing integration",
      "Blog/news management system",
      "Advanced SEO optimization",
      "High-performance optimization",
      "Security hardening & protection",
      "Cloud deployment setup",
      "Database architecture setup",
      "Custom automation workflows",
      "Multi-branch/business support",
      "Live chat integration",
      "SMS notification integration",
      "Google Business/Profile optimization",
      "Training & onboarding support",
      "Priority support & maintenance",
      "Scalable enterprise architecture",
    ],
    cta: "Build a powerful digital system that runs your business like a modern enterprise",
    detailGradient: "linear-gradient(135deg, #14b8a6, #0f766e)",
    detailShadow: "0 16px 34px -18px rgba(20,184,166,0.85)",
    buttonGradient: "linear-gradient(135deg, var(--gold), #f97316)",
    buttonShadow: "0 18px 42px -18px rgba(249,115,22,0.9)",
    featured: false,
    enterprise: true,
  },
];

const planThemes = [
  {
    discount: "Save 40%",
    note: "Ideal starter launch",
    ctaColor: "#a32317",
    badgeColor: "#dc2f20",
    mutedPrice: "Then upgrade when ready",
  },
  {
    discount: "Best value",
    note: "Most popular",
    ctaColor: "#ef3525",
    badgeColor: "#dc2f20",
    mutedPrice: "Built for growing brands",
  },
  {
    discount: "Pro build",
    note: "Advanced features",
    ctaColor: "#ef3525",
    badgeColor: "#dc2f20",
    mutedPrice: "For conversion systems",
  },
  {
    discount: "Enterprise",
    note: "Custom architecture",
    ctaColor: "linear-gradient(135deg,#ef3525,#1d4ed8)",
    badgeColor: "#ef3525",
    mutedPrice: "Strategy call required",
  },
];

export function Packages() {
  const [openPackages, setOpenPackages] = useState<Record<string, boolean>>({});

  return (
    <section id="packages" className="relative overflow-hidden bg-[#f7f8fb] py-24">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(37,99,235,0.12),transparent)]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Packages</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Choose the website plan that fits</h2>
          <p className="mt-3 text-muted-foreground">
            Clear packages, serious value, and a path to upgrade as your business grows.
          </p>
        </div>
        <div className="mx-auto mt-8 flex w-fit rounded-full bg-white p-1 shadow-soft">
          {["Starter", "Growth", "Scale"].map((item, index) => (
            <span
              key={item}
              className={`rounded-full px-5 py-2 text-sm font-black ${
                index === 1 ? "bg-[#ef3525] text-white" : "text-muted-foreground"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, index) => {
            const isEnterprise = Boolean(t.enterprise);
            const isOpen = isEnterprise || Boolean(openPackages[t.name]);
            const previewCount = isEnterprise ? t.features.length : 4;
            const previewFeatures = t.features.slice(0, previewCount);
            const hiddenFeatures = t.features.slice(previewCount);
            const detailsId = `package-details-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            const theme = planThemes[index];

            return (
              <div
                key={t.name}
                className={`relative flex flex-col overflow-hidden rounded-[1.1rem] border p-5 shadow-[0_18px_55px_-34px_rgba(15,23,42,0.55)] transition hover:-translate-y-1 hover:shadow-[0_32px_80px_-42px_rgba(15,23,42,0.75)] sm:p-6 ${
                  isEnterprise
                    ? "border-[#1d4ed8]/35 bg-white text-navy ring-2 ring-[#ef3525]/20"
                    : "border-slate-200 bg-white"
                } ${
                  t.featured ? "ring-2 ring-[#ef3525]/20 lg:-translate-y-3" : ""
                } ${isEnterprise ? "lg:col-span-3" : ""}`}
              >
                {isEnterprise ? (
                  <>
                    <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#ef3525]/10 blur-3xl" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ef3525,#1d4ed8,#ef3525)]" />
                  </>
                ) : null}
                <div className="flex min-h-8 flex-wrap items-center gap-2">
                  <span
                    className="relative rounded-md px-2 py-1 text-sm font-black text-white"
                    style={{ background: theme.badgeColor }}
                  >
                    {theme.discount}
                  </span>
                  {t.featured || isEnterprise ? (
                    <span
                      className={`relative rounded-md px-2 py-1 text-sm font-black text-white ${
                        isEnterprise ? "bg-[#1d4ed8]" : "bg-[#5b8f8d]"
                      }`}
                    >
                      {theme.note}
                    </span>
                  ) : null}
                </div>

                <div className={isEnterprise ? "mt-4 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]" : ""}>
                  <div>
                    <h3
                      className={`relative mt-4 text-2xl font-black tracking-tight ${
                        isEnterprise ? "text-[#141820]" : "text-[#141820]"
                      }`}
                    >
                      {t.name}
                    </h3>
                    <p
                      className={`relative mt-2 min-h-16 text-sm leading-relaxed ${
                        isEnterprise ? "text-slate-600" : "text-slate-600"
                      }`}
                    >
                      {t.blurb}
                    </p>

                    <div className="relative mt-5 flex items-center gap-2">
                      <span
                        className={`h-6 w-11 rounded-full p-1 ${
                          isEnterprise ? "bg-[#1d4ed8]" : "bg-[#6a9a9b]"
                        }`}
                      >
                        <span className="block h-4 w-4 translate-x-5 rounded-full bg-white" />
                      </span>
                      <span
                        className={`text-sm font-black ${
                          isEnterprise ? "text-slate-700" : "text-slate-700"
                        }`}
                      >
                        Free strategy call
                      </span>
                    </div>

                    <div className="relative mt-4">
                      <span
                        className={`text-5xl font-black tracking-tight ${
                          isEnterprise ? "text-[#141820]" : "text-[#141820]"
                        }`}
                      >
                        {t.price}
                      </span>
                      <p
                        className={`mt-2 text-sm font-bold ${
                          isEnterprise ? "text-slate-700" : "text-slate-700"
                        }`}
                      >
                        {theme.mutedPrice}
                      </p>
                    </div>

                    <div
                      className={`relative mt-7 grid grid-cols-3 rounded-lg p-1 text-center text-sm font-black ${
                        isEnterprise
                          ? "bg-[linear-gradient(135deg,rgba(239,53,37,0.08),rgba(29,78,216,0.08))] text-slate-500"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span className="rounded-md px-2 py-2">Plan</span>
                      <span
                        className={`rounded-md px-2 py-2 shadow-sm ${
                          isEnterprise ? "bg-white text-[#141820]" : "bg-white text-[#141820]"
                        }`}
                      >
                        Website
                      </span>
                      <span className="rounded-md px-2 py-2">Growth</span>
                    </div>

                    <a
                      href="/describe-your-idea"
                      className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md px-5 py-3 text-center text-base font-black text-white transition hover:-translate-y-0.5 hover:brightness-105"
                      style={{ background: theme.ctaColor }}
                    >
                      {t.cta}
                    </a>
                    <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                      Custom quote after project review
                    </p>
                  </div>

                  {isEnterprise ? (
                    <div>
                      <div id={detailsId} className="grid gap-4 lg:grid-cols-2">
                        {t.message ? (
                          <p className="border-l-4 border-[#ef3525] bg-[linear-gradient(135deg,rgba(239,53,37,0.08),rgba(29,78,216,0.06))] px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
                            “{t.message}”
                          </p>
                        ) : null}
                        <div className="border border-[#1d4ed8]/18 bg-[linear-gradient(135deg,rgba(29,78,216,0.07),rgba(239,53,37,0.05))] px-4 py-4">
                          <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#1d4ed8]">
                            Best for
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {t.bestFor.map((item) => (
                              <span
                                key={`${t.name}-${item}`}
                                className="rounded-full border border-[#1d4ed8]/15 bg-white px-3 py-1 text-xs font-bold text-slate-700"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.outcome}</p>
                        </div>
                      </div>
                      <p className="mt-6 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#1d4ed8]">
                        Everything included
                      </p>
                    </div>
                  ) : null}
                </div>
                <ul
                  className={`mt-6 ${
                    isEnterprise ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"
                  }`}
                >
                  {previewFeatures.map((f) => (
                    <li
                      key={f}
                      className={`relative flex items-start gap-2 text-sm leading-relaxed ${
                        isEnterprise ? "text-slate-700" : "text-slate-700"
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center ${
                          isEnterprise ? "text-[#60a5fa]" : "text-[#008744]"
                        }`}
                      >
                        <Check className="h-5 w-5 stroke-[3]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {isOpen && !isEnterprise ? (
                  <div id={detailsId} className="mt-5">
                    {t.message ? (
                      <p className="max-w-4xl border-l-4 border-[#ef3525] bg-slate-50 px-4 py-3 text-sm font-semibold leading-relaxed text-slate-700">
                        “{t.message}”
                      </p>
                    ) : null}
                    <div className="mt-5 border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#ef3525]">
                        Best for
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {t.bestFor.map((item) => (
                          <span
                            key={`${t.name}-${item}`}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.outcome}</p>
                    </div>
                    {hiddenFeatures.length > 0 ? (
                      <div className="mt-5">
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#ef3525]">
                          More included
                        </p>
                        <ul className="mt-3 space-y-3">
                          {hiddenFeatures.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-[#008744]">
                                <Check className="h-5 w-5 stroke-[3]" />
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {!isEnterprise ? (
                  <button
                    type="button"
                    aria-controls={detailsId}
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenPackages((current) => ({
                        ...current,
                        [t.name]: !current[t.name],
                      }))
                    }
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:-translate-y-0.5 hover:border-[#ef3525] hover:text-[#ef3525]"
                  >
                    {isOpen ? "Show less details" : "Show more details"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
