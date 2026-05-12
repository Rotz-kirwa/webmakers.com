import { type ReactNode, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Crown,
  Database,
  GraduationCap,
  Headphones,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
  Lock,
  MessageCircle,
  PackageCheck,
  Palette,
  Plane,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Upload,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const phoneNumber = "254791260817";

const projectTypes = [
  {
    name: "E-commerce",
    desc: "Products, checkout, payments, inventory, and orders.",
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg,#0f766e,#14b8a6)",
  },
  {
    name: "Real Estate",
    desc: "Property listings, lead forms, maps, and agent trust.",
    icon: Home,
    gradient: "linear-gradient(135deg,#1d4ed8,#06b6d4)",
  },
  {
    name: "Tours & Travel",
    desc: "Packages, destinations, inquiry flows, and booking prompts.",
    icon: Plane,
    gradient: "linear-gradient(135deg,#0891b2,#2563eb)",
  },
  {
    name: "School",
    desc: "Admissions, programs, announcements, and parent confidence.",
    icon: GraduationCap,
    gradient: "linear-gradient(135deg,#7c3aed,#2563eb)",
  },
  {
    name: "Restaurant",
    desc: "Menus, orders, reservations, galleries, and local search.",
    icon: Store,
    gradient: "linear-gradient(135deg,#ef3525,#1d4ed8)",
  },
  {
    name: "Logistics",
    desc: "Routes, parcels, booking forms, tracking, and service pages.",
    icon: Truck,
    gradient: "linear-gradient(135deg,#334155,#0f766e)",
  },
  {
    name: "Finance",
    desc: "Loan applications, calculators, trust pages, and support.",
    icon: Landmark,
    gradient: "linear-gradient(135deg,#1d4ed8,#ef3525)",
  },
  {
    name: "Portfolio",
    desc: "Personal brand, work, case studies, and opportunity capture.",
    icon: UserRound,
    gradient: "linear-gradient(135deg,#ef3525,#1d4ed8)",
  },
  {
    name: "SaaS Platform",
    desc: "Landing pages, dashboards, subscriptions, and accounts.",
    icon: Rocket,
    gradient: "linear-gradient(135deg,#1d4ed8,#4f46e5)",
  },
  {
    name: "Custom System",
    desc: "Automation, admin panels, workflows, APIs, and operations.",
    icon: Database,
    gradient: "linear-gradient(135deg,#020617,#475569)",
  },
];

const featureOptions = [
  { name: "M-Pesa Integration", icon: Wallet },
  { name: "Booking System", icon: Clock3 },
  { name: "AI Chatbot", icon: Bot },
  { name: "Admin Dashboard", icon: LayoutDashboard },
  { name: "Analytics", icon: BarChart3 },
  { name: "Live Chat", icon: MessageCircle },
  { name: "E-commerce", icon: ShoppingBag },
  { name: "User Accounts", icon: Users },
  { name: "SMS Notifications", icon: Headphones },
  { name: "SEO Optimization", icon: Search },
  { name: "Security Hardening", icon: ShieldCheck },
  { name: "CRM / API Integration", icon: PackageCheck },
];

const designStyles = [
  "Minimal",
  "Luxury",
  "Corporate",
  "Futuristic",
  "Bold",
  "Elegant",
  "Dark Modern",
  "Light Clean",
];

const budgetOptions = [
  {
    name: "Starter",
    price: "KSh 15k - 30k",
    desc: "Clean business presence and fast launch.",
  },
  {
    name: "Business",
    price: "KSh 30k - 50k",
    desc: "More pages, better trust, stronger conversion.",
  },
  {
    name: "Premium",
    price: "KSh 50k - 100k",
    desc: "Bookings, payments, commerce, and advanced workflows.",
  },
  {
    name: "Enterprise",
    price: "KSh 100k+",
    desc: "Automation, dashboards, integrations, and scalable systems.",
  },
  {
    name: "Custom Budget",
    price: "Guide me",
    desc: "You explain the goal. We recommend the best scope.",
  },
];

const timelines = ["ASAP", "1 - 2 weeks", "2 - 4 weeks", "1 - 2 months", "Flexible"];

const steps = ["Business", "Website Type", "Features", "Design", "Budget", "Vision"] as const;

type FormState = {
  businessName: string;
  industry: string;
  phone: string;
  email: string;
  projectType: string;
  selectedFeatures: string[];
  designStyle: string;
  references: string;
  inspirationFiles: string;
  logoFiles: string;
  budget: string;
  timeline: string;
  idea: string;
  goals: string;
};

export const Route = createFileRoute("/describe-your-idea")({
  head: () => ({
    meta: [
      { title: "Describe Your Idea - Premium Website Project Planner | WebMakers" },
      {
        name: "description",
        content:
          "Describe your business, features, design style, budget, and goals. WebMakers will review your vision and send a custom website strategy and quotation.",
      },
      { property: "og:title", content: "Describe Your Idea to WebMakers" },
      {
        property: "og:description",
        content:
          "A premium project discovery experience for custom websites, booking platforms, e-commerce stores, and business systems.",
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
  component: DescribeYourIdea,
});

function DescribeYourIdea() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    businessName: "",
    industry: "",
    phone: "",
    email: "",
    projectType: projectTypes[0].name,
    selectedFeatures: ["M-Pesa Integration", "SEO Optimization"],
    designStyle: "Luxury",
    references: "",
    inspirationFiles: "",
    logoFiles: "",
    budget: budgetOptions[1].name,
    timeline: timelines[2],
    idea: "",
    goals: "",
  });

  const progress = ((activeStep + 1) / steps.length) * 100;

  const whatsappHref = useMemo(() => {
    const message = [
      "Hello WebMakers, I want a custom website quote and strategy.",
      "",
      "BUSINESS",
      `Business name: ${form.businessName || "-"}`,
      `Industry: ${form.industry || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Email: ${form.email || "-"}`,
      "",
      "PROJECT",
      `Website type: ${form.projectType}`,
      `Features: ${form.selectedFeatures.join(", ") || "-"}`,
      `Design style: ${form.designStyle}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      "VISION",
      `Idea: ${form.idea || "-"}`,
      `Goals: ${form.goals || "-"}`,
      `Reference links: ${form.references || "-"}`,
      `Inspiration files selected: ${form.inspirationFiles || "-"}`,
      `Logo files selected: ${form.logoFiles || "-"}`,
      "",
      "Please review this and send me a quotation plus website strategy.",
    ].join("\n");

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }, [form]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleFeature(name: string) {
    setForm((current) => ({
      ...current,
      selectedFeatures: current.selectedFeatures.includes(name)
        ? current.selectedFeatures.filter((feature) => feature !== name)
        : [...current.selectedFeatures, name],
    }));
  }

  function goNext() {
    setActiveStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    setActiveStep((current) => Math.max(current - 1, 0));
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-navy">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#050b17]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(239,53,37,0.3),transparent_28%),radial-gradient(circle_at_76%_12%,rgba(29,78,216,0.38),transparent_30%),radial-gradient(circle_at_58%_78%,rgba(239,53,37,0.12),transparent_28%),linear-gradient(135deg,#050b17,#0b1325_54%,#101827)]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="container-x relative grid gap-10 pb-16 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:pb-20 lg:pt-14">
            <div className="self-center">
              <div className="inline-flex items-center gap-2 border border-white/18 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-soft backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Premium project discovery
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.03] text-white sm:text-5xl lg:text-6xl">
                Turn Your Vision Into a Website People Instantly Trust
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg">
                Describe your business, ideal website, features, style, budget, and goals. We
                analyze your vision, shape the strategy, send a quotation, then build it with a
                polished agency-level process.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Custom built for your business",
                  "Strategy before design",
                  "Quote after review",
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 border border-white/14 bg-white/9 px-4 py-2 text-sm font-bold text-white/88 backdrop-blur"
                  >
                    <CheckCircle2 className="h-4 w-4 text-gold" /> {label}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                <Metric value="24/7" label="digital presence" />
                <Metric value="4.9/5" label="client rating" />
                <Metric value="1 min" label="fast response" />
              </div>
            </div>

            <HeroMockup />
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050b17] to-transparent opacity-8" />
          <div className="container-x relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Project planner</span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                A guided brief that feels like a strategy session
              </h2>
              <p className="mt-3 text-muted-foreground">
                No long, cold form. Just focused steps that help us understand what you want to
                build and how it should help your business grow.
              </p>
            </div>

            <form
              className="mt-10 overflow-hidden border border-white/70 bg-white/80 shadow-[0_40px_100px_-45px_rgba(15,23,42,0.45)] backdrop-blur-xl"
              onSubmit={(event) => {
                event.preventDefault();
                window.location.href = whatsappHref;
              }}
            >
              <div className="grid min-h-[680px] lg:grid-cols-[18rem_1fr]">
                <aside className="border-b border-slate-200 bg-[#08111f] p-5 text-white lg:border-b-0 lg:border-r lg:border-white/10 lg:p-6">
                  <div className="flex items-center justify-between gap-4 lg:block">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
                        Discovery progress
                      </p>
                      <p className="mt-2 text-2xl font-black">{Math.round(progress)}%</p>
                    </div>
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-white/12 lg:mt-5 lg:w-full">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(135deg,var(--gold),var(--royal))] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-7 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    {steps.map((step, index) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setActiveStep(index)}
                        className={`flex items-center gap-3 border px-3 py-3 text-left text-sm font-bold transition ${
                          activeStep === index
                            ? "border-gold bg-gold text-white shadow-[0_16px_40px_-22px_rgba(239,53,37,1)]"
                            : "border-white/10 bg-white/5 text-white/72 hover:border-white/24 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/18 text-xs">
                          {index + 1}
                        </span>
                        <span className="hidden sm:block lg:block">{step}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-7 hidden border border-white/10 bg-white/6 p-4 text-sm leading-relaxed text-white/72 lg:block">
                    <p className="font-bold text-white">What happens next?</p>
                    <p className="mt-2">
                      We review the brief, identify the right pages and systems, then send a
                      practical quote and build strategy.
                    </p>
                  </div>
                </aside>

                <div className="p-5 sm:p-7 lg:p-9">
                  <StepHeader activeStep={activeStep} />

                  <div className="mt-7">
                    {activeStep === 0 ? (
                      <BusinessStep form={form} updateField={updateField} />
                    ) : null}
                    {activeStep === 1 ? (
                      <ProjectTypeStep form={form} updateField={updateField} />
                    ) : null}
                    {activeStep === 2 ? (
                      <FeaturesStep form={form} toggleFeature={toggleFeature} />
                    ) : null}
                    {activeStep === 3 ? <DesignStep form={form} updateField={updateField} /> : null}
                    {activeStep === 4 ? <BudgetStep form={form} updateField={updateField} /> : null}
                    {activeStep === 5 ? (
                      <VisionStep
                        form={form}
                        updateField={updateField}
                        whatsappHref={whatsappHref}
                      />
                    ) : null}
                  </div>

                  <div className="mt-9 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      disabled={activeStep === 0}
                      className="h-11 rounded-xl"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                      <Button
                        type="button"
                        onClick={goNext}
                        className="h-11 rounded-xl bg-navy px-6 text-white hover:bg-royal"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="h-11 rounded-xl bg-[linear-gradient(135deg,var(--gold),var(--royal))] px-6 font-black text-white hover:brightness-105"
                      >
                        Submit Project <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="container-x pb-20">
          <div className="relative overflow-hidden bg-[#07111f] p-8 text-white sm:p-12">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute -bottom-16 left-8 h-64 w-64 rounded-full bg-royal/30 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-gold">
                  Ready when your idea is ready
                </span>
                <h2 className="mt-4 max-w-3xl text-3xl font-extrabold sm:text-4xl">
                  Your business deserves more than just a website.
                </h2>
                <p className="mt-4 max-w-2xl text-white/76">
                  Let us create a digital experience that makes people trust your brand instantly,
                  understand your offer, and take action with confidence.
                </p>
              </div>
              <a
                href="#top"
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

function HeroMockup() {
  return (
    <div className="relative min-h-[430px] self-center">
      <div className="absolute inset-x-8 top-8 h-72 rotate-2 border border-white/14 bg-white/8 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl" />
      <div className="absolute inset-x-0 top-0 border border-white/16 bg-white/12 p-5 shadow-[0_36px_90px_-38px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/12 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">
              Strategy console
            </p>
            <p className="mt-1 text-lg font-black text-white">Website blueprint</p>
          </div>
          <span className="rounded-full bg-emerald-400/16 px-3 py-1 text-xs font-bold text-emerald-200">
            Live review
          </span>
        </div>
        <div className="mt-5 grid gap-3">
          <MockupRow label="Brand trust" value="92%" color="#ef3525" />
          <MockupRow label="Conversion paths" value="8 flows" color="#38bdf8" />
          <MockupRow label="Automation ideas" value="12" color="#ef3525" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            ["Quote", "Ready"],
            ["Pages", "Mapped"],
            ["Launch", "Planned"],
          ].map(([label, value]) => (
            <div key={label} className="border border-white/12 bg-black/18 p-4">
              <p className="text-xs text-white/52">{label}</p>
              <p className="mt-2 text-sm font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 border border-white/14 bg-white/10 p-4 text-white shadow-soft backdrop-blur-xl">
        <Palette className="h-5 w-5 text-gold" />
        <p className="mt-2 text-sm font-bold">Premium UI direction</p>
      </div>
      <div className="absolute bottom-16 right-0 border border-white/14 bg-white/10 p-4 text-white shadow-soft backdrop-blur-xl">
        <Lock className="h-5 w-5 text-emerald-300" />
        <p className="mt-2 text-sm font-bold">Secure build plan</p>
      </div>
    </div>
  );
}

function BusinessStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Business name">
        <Input
          required
          value={form.businessName}
          onChange={(event) => updateField("businessName", event.target.value)}
          placeholder="Your business name"
          className="h-12 bg-white"
        />
      </Field>
      <Field label="Industry / business type">
        <Input
          required
          value={form.industry}
          onChange={(event) => updateField("industry", event.target.value)}
          placeholder="Hotel, school, real estate, SaaS..."
          className="h-12 bg-white"
        />
      </Field>
      <Field label="Phone number">
        <Input
          required
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="+254..."
          className="h-12 bg-white"
        />
      </Field>
      <Field label="Email address">
        <Input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@example.com"
          className="h-12 bg-white"
        />
      </Field>
    </div>
  );
}

function ProjectTypeStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projectTypes.map((type) => (
        <ChoiceCard
          key={type.name}
          title={type.name}
          desc={type.desc}
          icon={type.icon}
          selected={form.projectType === type.name}
          gradient={type.gradient}
          onClick={() => updateField("projectType", type.name)}
        />
      ))}
    </div>
  );
}

function FeaturesStep({
  form,
  toggleFeature,
}: {
  form: FormState;
  toggleFeature: (name: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {featureOptions.map((feature) => {
        const selected = form.selectedFeatures.includes(feature.name);
        const Icon = feature.icon;

        return (
          <button
            key={feature.name}
            type="button"
            onClick={() => toggleFeature(feature.name)}
            className={`group flex items-center gap-3 border p-4 text-left transition hover:-translate-y-1 ${
              selected
                ? "border-royal bg-[linear-gradient(135deg,#0f1f3d,#183b78)] text-white shadow-[0_24px_60px_-34px_rgba(37,99,235,0.95)]"
                : "border-slate-200 bg-white text-navy hover:border-royal/40 hover:shadow-soft"
            }`}
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                selected ? "bg-white/14" : "bg-secondary"
              }`}
            >
              <Icon className={`h-5 w-5 ${selected ? "text-gold" : "text-royal"}`} />
            </span>
            <span className="font-bold">{feature.name}</span>
            {selected ? <Check className="ml-auto h-5 w-5 text-gold" /> : null}
          </button>
        );
      })}
    </div>
  );
}

function DesignStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-bold text-navy">Choose the visual direction</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {designStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => updateField("designStyle", style)}
              className={`border px-4 py-4 text-left text-sm font-black transition hover:-translate-y-0.5 ${
                form.designStyle === style
                  ? "border-gold bg-[#101827] text-white shadow-soft"
                  : "border-slate-200 bg-white hover:border-gold/60"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <Field label="Reference websites or inspiration links">
          <Textarea
            value={form.references}
            onChange={(event) => updateField("references", event.target.value)}
            placeholder="Paste links to websites, Pinterest boards, or styles you like."
            className="min-h-28 resize-none bg-white"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <UploadField
            label="Inspiration files"
            value={form.inspirationFiles}
            onChange={(value) => updateField("inspirationFiles", value)}
          />
          <UploadField
            label="Logo / brand files"
            value={form.logoFiles}
            onChange={(value) => updateField("logoFiles", value)}
          />
        </div>
      </div>
    </div>
  );
}

function BudgetStep({
  form,
  updateField,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {budgetOptions.map((budget) => (
          <button
            key={budget.name}
            type="button"
            onClick={() => updateField("budget", budget.name)}
            className={`border p-5 text-left transition hover:-translate-y-1 ${
              form.budget === budget.name
                ? "border-gold bg-[linear-gradient(135deg,rgba(239,53,37,0.08),rgba(29,78,216,0.08),#ffffff)] shadow-[0_28px_70px_-40px_rgba(29,78,216,0.75)]"
                : "border-slate-200 bg-white hover:border-gold/50 hover:shadow-soft"
            }`}
          >
            <p className="text-lg font-black">{budget.name}</p>
            <p className="mt-1 text-sm font-black text-royal">{budget.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{budget.desc}</p>
          </button>
        ))}
      </div>
      <div className="border border-slate-200 bg-white p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-royal">Timeline</p>
        <div className="mt-4 grid gap-2">
          {timelines.map((timeline) => (
            <button
              key={timeline}
              type="button"
              onClick={() => updateField("timeline", timeline)}
              className={`border px-3 py-3 text-left text-sm font-bold transition ${
                form.timeline === timeline
                  ? "border-royal bg-royal text-white"
                  : "border-slate-200 bg-white hover:border-royal/40"
              }`}
            >
              {timeline}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisionStep({
  form,
  updateField,
  whatsappHref,
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  whatsappHref: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="grid gap-4">
        <Field label="Describe your dream website">
          <Textarea
            required
            value={form.idea}
            onChange={(event) => updateField("idea", event.target.value)}
            placeholder="Explain what you want, how it should work, and what clients should be able to do."
            className="min-h-36 resize-none bg-white"
          />
        </Field>
        <Field label="Business goals">
          <Textarea
            value={form.goals}
            onChange={(event) => updateField("goals", event.target.value)}
            placeholder="More bookings, more sales, better trust, applications, automation, leads..."
            className="min-h-28 resize-none bg-white"
          />
        </Field>
        <p className="border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold leading-relaxed text-amber-900">
          When you submit, WhatsApp opens with your full brief. If you selected files, attach them
          directly in the chat so we can review everything together.
        </p>
      </div>
      <div className="border border-slate-200 bg-[#07111f] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">Brief summary</p>
        <SummaryItem label="Project" value={form.projectType} />
        <SummaryItem label="Features" value={`${form.selectedFeatures.length} selected`} />
        <SummaryItem label="Style" value={form.designStyle} />
        <SummaryItem label="Budget" value={form.budget} />
        <SummaryItem label="Timeline" value={form.timeline} />
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--gold),var(--royal))] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:brightness-105"
        >
          Get Custom Quote <Send className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function StepHeader({ activeStep }: { activeStep: number }) {
  const titles = [
    "First, tell us who we are building for.",
    "What kind of digital experience do you need?",
    "Select the systems and features your business needs.",
    "Choose the look, mood, and references.",
    "Set the investment range and deadline.",
    "Finish with the vision and growth goals.",
  ];
  const subtitles = [
    "This helps us understand the brand, market, and best website structure.",
    "Pick the closest fit. We can still customize the final strategy.",
    "Choose everything you want now or might need soon.",
    "A strong visual direction helps us quote and design more accurately.",
    "We use this to recommend the right scope, package, and timeline.",
    "This is where your idea becomes a clear build direction.",
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-royal">
          Step {activeStep + 1} of {steps.length}
        </p>
        <h3 className="mt-2 max-w-3xl text-2xl font-black sm:text-3xl">{titles[activeStep]}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {subtitles[activeStep]}
        </p>
      </div>
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-black text-royal">
        <Sparkles className="h-4 w-4" /> Premium brief
      </div>
    </div>
  );
}

function ChoiceCard({
  title,
  desc,
  icon: Icon,
  selected,
  gradient,
  onClick,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  selected: boolean;
  gradient: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden border p-5 text-left transition hover:-translate-y-1 ${
        selected
          ? "border-transparent text-white shadow-[0_26px_70px_-38px_rgba(15,23,42,0.9)]"
          : "border-slate-200 bg-white hover:border-royal/40 hover:shadow-soft"
      }`}
      style={selected ? { background: gradient } : undefined}
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-xl ${
          selected ? "bg-white/16" : "bg-secondary"
        }`}
      >
        <Icon className={`h-6 w-6 ${selected ? "text-white" : "text-royal"}`} />
      </div>
      <h4 className="mt-4 text-base font-black">{title}</h4>
      <p
        className={`mt-2 text-sm leading-relaxed ${selected ? "text-white/78" : "text-muted-foreground"}`}
      >
        {desc}
      </p>
      {selected ? (
        <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-royal">
          <Check className="h-4 w-4" />
        </span>
      ) : null}
    </button>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold text-navy">{label}</span>
      {children}
    </label>
  );
}

function UploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block border border-dashed border-[color-mix(in_oklab,var(--royal)_28%,var(--border))] bg-white p-4 transition hover:border-royal">
      <span className="flex items-center gap-2 text-sm font-black text-navy">
        <Upload className="h-4 w-4 text-royal" /> {label}
      </span>
      <input
        type="file"
        multiple
        className="mt-3 w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs file:font-bold file:text-navy"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
            .map((file) => file.name)
            .join(", ");
          onChange(files);
        }}
      />
      <span className="mt-2 block text-xs text-muted-foreground">
        {value || "Images, PDFs, screenshots, or brand files"}
      </span>
    </label>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-white/14 bg-white/9 p-4 text-white backdrop-blur">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/56">{label}</p>
    </div>
  );
}

function MockupRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border border-white/10 bg-black/18 p-4">
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full" style={{ width: "78%", background: color }} />
        </div>
      </div>
      <p className="text-sm font-black text-white">{value}</p>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 border-b border-white/10 pb-3">
      <p className="text-xs uppercase tracking-[0.14em] text-white/42">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{value}</p>
    </div>
  );
}
