import { Star, Quote } from "lucide-react";

const items = [
  { name: "Amina K.", role: "Owner, Bella Cafe", quote: "Our online orders doubled within the first month. The site looks amazing and was delivered fast." },
  { name: "James M.", role: "Director, Acacia Realty", quote: "Clients now take us seriously before they even call. The listings page converts visitors into inquiries." },
  { name: "Grace W.", role: "Founder, Glow Salon", quote: "The booking system saves me hours every week. WebMakers truly understood my brand." },
  { name: "Daniel O.", role: "CEO, Swift Logistics", quote: "Professional, fast, and affordable. Our quote requests went up 3x after launch." },
  { name: "Wanjiku N.", role: "Principal, Rising Star Academy", quote: "Beautiful design, easy admin updates, and parents love how clear our website feels." },
  { name: "Brian T.", role: "Owner, FitForge Gym", quote: "Membership sign-ups are flowing in. Best investment for my business this year." },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Trusted by business owners</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="card-elevated relative p-7">
              <Quote className="absolute right-5 top-5 h-7 w-7 opacity-15" style={{ color: "var(--royal)" }} />
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: "var(--gold)" }} />)}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full font-bold text-white" style={{ background: "var(--gradient-royal)" }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
