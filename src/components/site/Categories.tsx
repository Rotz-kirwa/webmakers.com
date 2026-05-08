import {
  UtensilsCrossed, Building2, ShoppingBag, Plane, GraduationCap, Stethoscope,
  Scissors, Car, Truck, HardHat, Hotel, PartyPopper, Church, Scale,
  Dumbbell, Sparkles, Camera, Rocket, Landmark, User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Cat = { icon: LucideIcon; name: string; desc: string; tone: string };

const cats: Cat[] = [
  { icon: UtensilsCrossed, name: "Restaurants & Cafes", desc: "Menus, reservations, online orders.", tone: "#f59e0b" },
  { icon: Building2, name: "Real Estate", desc: "Listings, search, agent profiles.", tone: "#2563eb" },
  { icon: ShoppingBag, name: "Online Stores", desc: "Full e-commerce with payments.", tone: "#7c3aed" },
  { icon: Plane, name: "Tours & Travel", desc: "Packages, bookings, itineraries.", tone: "#0ea5e9" },
  { icon: GraduationCap, name: "Schools & Training", desc: "Programs, admissions, portals.", tone: "#10b981" },
  { icon: Stethoscope, name: "Clinics & Healthcare", desc: "Services, doctors, appointments.", tone: "#ef4444" },
  { icon: Scissors, name: "Salons & Beauty", desc: "Showcase services & bookings.", tone: "#ec4899" },
  { icon: Car, name: "Car Dealers", desc: "Inventory, pricing, test drives.", tone: "#0f172a" },
  { icon: Truck, name: "Logistics & Import", desc: "Tracking, quotes, fleet info.", tone: "#1e40af" },
  { icon: HardHat, name: "Construction", desc: "Projects, services, portfolios.", tone: "#f97316" },
  { icon: Hotel, name: "Hotels & Airbnb", desc: "Rooms, photos, reservations.", tone: "#8b5cf6" },
  { icon: PartyPopper, name: "Event Planners", desc: "Galleries, packages, inquiries.", tone: "#db2777" },
  { icon: Church, name: "Churches & Ministries", desc: "Sermons, events, giving.", tone: "#9333ea" },
  { icon: Scale, name: "Law Firms", desc: "Practice areas & consultations.", tone: "#0c2340" },
  { icon: Dumbbell, name: "Gyms & Fitness", desc: "Classes, trainers, memberships.", tone: "#16a34a" },
  { icon: Sparkles, name: "Cleaning Services", desc: "Quotes, booking, packages.", tone: "#06b6d4" },
  { icon: Camera, name: "Photography Studios", desc: "Portfolios, packages, booking.", tone: "#475569" },
  { icon: Rocket, name: "Tech Startups", desc: "Product, features, sign-ups.", tone: "#2563eb" },
  { icon: Landmark, name: "Loan & Finance", desc: "Products, calculators, leads.", tone: "#0d7a5f" },
  { icon: User, name: "Personal Portfolio", desc: "Stand out with a stunning site.", tone: "#1e293b" },
];

export function Categories() {
  return (
    <section id="categories" className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Website categories</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A website built for your industry</h2>
          <p className="mt-3 text-muted-foreground">Pick the type of website that fits your business. We tailor the design, features, and content to match.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c) => (
            <article key={c.name} className="card-elevated group flex flex-col p-6">
              <div
                className="grid h-12 w-12 place-items-center rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${c.tone}, color-mix(in oklab, ${c.tone} 70%, #0f172a))` }}
              >
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <a
                href="#cta"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-royal transition-colors group-hover:text-navy"
                style={{ color: "var(--royal)" }}
              >
                Request This Website →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
