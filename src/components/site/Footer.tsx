import { Facebook, Instagram, Twitter, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "./Logo";

const socialLinks: { icon: LucideIcon; label: string; color: string }[] = [
  { icon: Facebook, label: "Facebook", color: "#1877f2" },
  { icon: Instagram, label: "Instagram", color: "#e4405f" },
  { icon: Twitter, label: "Twitter", color: "#1da1f2" },
  { icon: Linkedin, label: "LinkedIn", color: "#0a66c2" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <a href="/#top" aria-label="WebMakers home">
            <Logo />
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Premium websites for businesses that want to look serious online and attract more
            customers.
          </p>
          <a
            href="/describe-your-idea"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
            style={{ background: "var(--gradient-royal)" }}
          >
            <MessageCircle className="h-4 w-4" /> Start a Project
          </a>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Web design</li>
            <li>E-commerce</li>
            <li>Booking systems</li>
            <li>SEO</li>
            <li>Maintenance</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Restaurants</li>
            <li>Real Estate</li>
            <li>E-commerce</li>
            <li>Healthcare</li>
            <li>Travel</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: "var(--royal)" }} /> +254 747 096321
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ color: "var(--gold)" }} /> hello@webmakers.com
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="grid h-9 w-9 place-items-center rounded-lg border bg-white transition hover:-translate-y-0.5 hover:shadow-soft"
                style={{
                  borderColor: `color-mix(in oklab, ${social.color} 28%, var(--border))`,
                  color: social.color,
                  background: `color-mix(in oklab, ${social.color} 8%, white)`,
                }}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} WebMakers. All rights reserved.</p>
          <p>Crafted for businesses that mean business.</p>
        </div>
      </div>
    </footer>
  );
}
