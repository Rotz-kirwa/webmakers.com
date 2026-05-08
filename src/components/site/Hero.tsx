import heroImg from "@/assets/hero-mockup.jpg";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="animate-fade-up">
          <span className="eyebrow"><Star className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} /> Premium web design agency</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Your Business Looks More <span className="gradient-text">Trustworthy</span> With a Powerful Website
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            WebMakers builds stunning websites for restaurants, real estate agencies, salons, schools, online stores,
            travel agencies, clinics, service businesses, and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="btn-primary">Get a Website <ArrowRight className="h-4 w-4" /></a>
            <a href="#categories" className="btn-ghost">View Website Categories</a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["#1e3a8a", "#2563eb", "#0ea5e9", "#f59e0b"].map((c) => (
                  <div key={c} className="h-8 w-8 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <span><b className="text-navy">200+</b> businesses online</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: "var(--gold)" }} />)}
              <span className="ml-1"><b className="text-navy">4.9/5</b> client rating</span>
            </div>
          </div>
        </div>
        <div className="relative animate-float">
          <div className="absolute -inset-6 rounded-[2rem] opacity-40 blur-3xl" style={{ background: "var(--gradient-royal)" }} />
          <img
            src={heroImg}
            alt="WebMakers website mockups across devices"
            width={1280}
            height={960}
            className="relative w-full rounded-3xl shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]"
          />
        </div>
      </div>
    </section>
  );
}
