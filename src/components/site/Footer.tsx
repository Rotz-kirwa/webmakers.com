import { Sparkles, Facebook, Instagram, Twitter, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold text-navy">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-royal)" }}>
              <Sparkles className="h-4 w-4" />
            </span>
            WebMakers
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Premium websites for businesses that want to look serious online and attract more customers.
          </p>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white"
            style={{ background: "var(--gradient-royal)" }}
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Web design</li><li>E-commerce</li><li>Booking systems</li><li>SEO</li><li>Maintenance</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Restaurants</li><li>Real Estate</li><li>E-commerce</li><li>Healthcare</li><li>Travel</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +254 700 000 000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@webmakers.co</li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter, Linkedin].map((Ic, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-royal hover:text-royal" style={{ "--tw-border-opacity": 1 } as React.CSSProperties}>
                <Ic className="h-4 w-4" />
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
