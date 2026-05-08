import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "#categories", label: "Categories" },
  { href: "#showcase", label: "Showcase" },
  { href: "#packages", label: "Packages" },
  { href: "#addons", label: "Add-ons" },
  { href: "#process", label: "Process" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-royal)" }}>
            <Sparkles className="h-4 w-4" />
          </span>
          WebMakers
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="#cta" className="btn-primary text-sm">Get a Website</a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-4 py-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-navy">
                {l.label}
              </a>
            ))}
            <a href="#cta" className="btn-primary mt-2">Get a Website</a>
          </div>
        </div>
      )}
    </header>
  );
}
