import {
  Smartphone, CalendarCheck, LayoutDashboard, Mail, MapPin, Search,
  Newspaper, Bot, Package, CreditCard, PenTool, Wrench, Image as ImageIcon, Gauge,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const addons: { icon: LucideIcon; name: string }[] = [
  { icon: Smartphone, name: "M-Pesa integration" },
  { icon: CalendarCheck, name: "Online booking system" },
  { icon: LayoutDashboard, name: "Admin dashboard" },
  { icon: Mail, name: "Business email setup" },
  { icon: MapPin, name: "Google Business Profile" },
  { icon: Search, name: "SEO optimization" },
  { icon: Newspaper, name: "Blog setup" },
  { icon: Bot, name: "AI chatbot" },
  { icon: Package, name: "Product upload" },
  { icon: CreditCard, name: "Payment gateway" },
  { icon: PenTool, name: "Logo design" },
  { icon: Wrench, name: "Website maintenance" },
  { icon: ImageIcon, name: "Social media banners" },
  { icon: Gauge, name: "Speed optimization" },
];

export function Addons() {
  return (
    <section id="addons" className="bg-secondary/40 py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Add-ons</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Power up your website</h2>
          <p className="mt-3 text-muted-foreground">Add what you need — when you need it. All add-ons are optional.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {addons.map((a) => (
            <div key={a.name} className="card-elevated flex items-center gap-3 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: "color-mix(in oklab, var(--royal) 12%, white)", color: "var(--royal)" }}>
                <a.icon className="h-5 w-5" />
              </span>
              <span className="font-medium text-navy">{a.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
