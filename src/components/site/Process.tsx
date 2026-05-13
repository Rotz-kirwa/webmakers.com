import { ArrowRight, CheckCircle2, Rocket, Settings2, Sparkles, Target } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Target,
    t: "Tell us what your business needs",
    d: "We start with your goals, industry, customers, services, preferred style, and the kind of website that will help your business grow.",
  },
  {
    n: "02",
    icon: Settings2,
    t: "We customize the plan around your demand",
    d: "Every build is shaped around what you need: bookings, payments, dashboards, portfolios, product sales, lead capture, or automation.",
  },
  {
    n: "03",
    icon: Sparkles,
    t: "We design, build, and refine",
    d: "We create a professional website that looks trustworthy, works smoothly on mobile, and guides visitors toward action.",
  },
  {
    n: "04",
    icon: Rocket,
    t: "Launch with a growth mindset",
    d: "We help you go live with the right structure, calls-to-action, WhatsApp flow, SEO basics, and guidance to support business success.",
  },
];

const timelines = [
  {
    title: "Simple / Starter Website",
    time: "2-3 days",
    note: "Fast professional launch for businesses that need a clean online presence.",
    color: "#ef3525",
  },
  {
    title: "Business or Premium Website",
    time: "7-10 days",
    note: "More pages, stronger design, booking/payment workflows, and deeper business content.",
    color: "#1d4ed8",
  },
  {
    title: "Enterprise Website",
    time: "About 2 weeks",
    note: "Custom systems, dashboards, automation, integrations, and scalable architecture.",
    color: "#07111f",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-secondary/40 py-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[rgba(29,78,216,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-80 w-80 rounded-full bg-[rgba(239,53,37,0.08)] blur-3xl" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Process</span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            A modern website process built around your business goals
          </h2>
          <p className="mt-3 text-muted-foreground">
            We do not force every business into the same template. We customize based on your
            demand, your customers, your budget, and the kind of success you want the website to
            create.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {timelines.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-soft"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: item.color }}
              />
              <p className="text-sm font-black uppercase tracking-[0.14em] text-muted-foreground">
                {item.title}
              </p>
              <p className="mt-3 text-3xl font-black" style={{ color: item.color }}>
                {item.time}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, index) => (
            <div
              key={s.n}
              className="group relative overflow-hidden border border-slate-200 bg-white p-7 shadow-[0_18px_55px_-36px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-44px_rgba(15,23,42,0.7)]"
            >
              <span
                className="absolute -top-5 right-5 text-6xl font-black opacity-10"
                style={{ color: index % 2 === 0 ? "#ef3525" : "#1d4ed8" }}
              >
                {s.n}
              </span>
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-soft"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(135deg,#ef3525,#1d4ed8)"
                      : "linear-gradient(135deg,#1d4ed8,#ef3525)",
                }}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[#ef3525]">
                Step {s.n}
              </p>
              <h3 className="mt-2 text-lg font-black leading-snug">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden bg-[#07111f] p-6 text-white shadow-card sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ef3525]">
                Built for real business success
              </p>
              <h3 className="mt-3 text-2xl font-black text-white">
                We help you build more than pages. We help you build trust, action, and growth.
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/72">
                Your website can be customized to collect leads, receive payments, book clients,
                display proof, answer questions, and make your business look ready for serious
                customers.
              </p>
            </div>
            <a
              href="/describe-your-idea"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#ef3525,#1d4ed8)] px-6 py-3 font-black text-white transition hover:-translate-y-1 hover:brightness-105"
            >
              Start My Project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Customized to your demand",
              "Built to earn customer trust",
              "Designed to support growth",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 border border-white/12 bg-white/8 p-3"
              >
                <CheckCircle2 className="h-4 w-4 text-[#ef3525]" />
                <span className="text-sm font-bold text-white/86">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
