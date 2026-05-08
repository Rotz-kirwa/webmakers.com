import restaurant from "@/assets/showcase-restaurant.jpg";
import realestate from "@/assets/showcase-realestate.jpg";
import fashion from "@/assets/showcase-fashion.jpg";
import travel from "@/assets/showcase-travel.jpg";
import salon from "@/assets/showcase-salon.jpg";
import clinic from "@/assets/showcase-clinic.jpg";

const items = [
  { img: restaurant, label: "Restaurant Website", tag: "Reservations · Menu" },
  { img: realestate, label: "Real Estate Website", tag: "Listings · Search" },
  { img: fashion, label: "Fashion Store", tag: "E-commerce · Checkout" },
  { img: travel, label: "Travel Booking Website", tag: "Tours · Booking" },
  { img: salon, label: "Salon & Spa Website", tag: "Services · Booking" },
  { img: clinic, label: "Healthcare Clinic Website", tag: "Doctors · Appointments" },
];

export function Showcase() {
  return (
    <section id="showcase" className="bg-secondary/40 py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Featured showcase</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Real designs. Real results.</h2>
            <p className="mt-3 text-muted-foreground">A glimpse of what we craft for businesses like yours — modern, on-brand, and conversion-ready.</p>
          </div>
          <a href="#cta" className="btn-ghost">Start your project</a>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <figure key={it.label} className="card-elevated group overflow-hidden p-0">
              <div className="overflow-hidden">
                <img
                  src={it.img}
                  alt={it.label}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-base font-semibold">{it.label}</h3>
                  <p className="text-sm text-muted-foreground">{it.tag}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "color-mix(in oklab, var(--gold) 25%, white)", color: "var(--ink)" }}>
                  Live
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
