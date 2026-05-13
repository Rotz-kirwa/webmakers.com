import {
  Palette,
  Smartphone,
  Zap,
  Search,
  Layout,
  MessageCircle,
  Tag,
  LifeBuoy,
} from "lucide-react";

const items = [
  { icon: Palette, t: "Clean premium designs" },
  { icon: Smartphone, t: "Mobile-first websites" },
  { icon: Zap, t: "Fast loading pages" },
  { icon: Search, t: "SEO-ready structure" },
  { icon: Layout, t: "Business-focused layouts" },
  { icon: MessageCircle, t: "WhatsApp & contact integration" },
  { icon: Tag, t: "Affordable packages" },
  { icon: LifeBuoy, t: "After-launch support" },
];

export function WhyUs() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why WebMakers</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Built to make your business win online
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.t} className="card-elevated p-6">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white"
                style={{ background: "var(--gradient-royal)" }}
              >
                <i.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-semibold text-navy">{i.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
