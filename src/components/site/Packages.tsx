import { Check, Crown } from "lucide-react";

const tiers = [
  {
    name: "Starter Website",
    price: "KSh 15,000",
    blurb: "For small businesses that need an online presence.",
    features: ["1–3 pages", "Mobile responsive design", "Contact section", "WhatsApp button", "Basic SEO", "Fast delivery"],
    cta: "Start with Starter",
    featured: false,
  },
  {
    name: "Business Website",
    price: "KSh 30,000",
    blurb: "For growing businesses that want a stronger online brand.",
    features: ["4–7 pages", "Premium design", "Contact form", "Google Maps", "WhatsApp integration", "Basic admin updates", "SEO setup"],
    cta: "Choose Business",
    featured: true,
  },
  {
    name: "Premium Website",
    price: "KSh 50,000+",
    blurb: "For businesses that need advanced features.",
    features: ["E-commerce", "Booking system", "Admin dashboard", "M-Pesa integration", "Blog/news section", "Advanced SEO", "Analytics setup"],
    cta: "Go Premium",
    featured: false,
  },
];

export function Packages() {
  return (
    <section id="packages" className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Packages</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Honest pricing, real value</h2>
          <p className="mt-3 text-muted-foreground">Pick the package that fits today — upgrade anytime as your business grows.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`card-elevated relative flex flex-col p-8 ${t.featured ? "lg:-translate-y-3" : ""}`}
              style={t.featured ? { borderColor: "transparent", boxShadow: "0 30px 60px -30px rgba(37,99,235,0.45)", background: "linear-gradient(180deg, white, color-mix(in oklab, var(--sky) 50%, white))" } : undefined}
            >
              {t.featured && (
                <span
                  className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ background: "var(--gradient-royal)" }}
                >
                  <Crown className="h-3 w-3" /> Most popular
                </span>
              )}
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-extrabold tracking-tight">{t.price}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full" style={{ background: "color-mix(in oklab, var(--royal) 15%, white)", color: "var(--royal)" }}>
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`mt-8 ${t.featured ? "btn-primary" : "btn-ghost"}`}>{t.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
