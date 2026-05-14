import { ArrowRight, Clock3, EyeOff, Globe2, MessageCircle, ShieldCheck, Star } from "lucide-react";

const heroImages = [
  {
    src: "https://i.pinimg.com/736x/ff/0d/e2/ff0de26c8e4c56481730c912ad4fb5d5.jpg",
    alt: "Online store business website background",
  },
  {
    src: "https://i.pinimg.com/736x/df/7c/fd/df7cfdfa852a3f96d467cb52022ae97e.jpg",
    alt: "Business website background",
  },
  {
    src: "https://i.pinimg.com/1200x/1d/26/c8/1d26c83e32e7ec8f61a957c566ea9b5c.jpg",
    alt: "Professional business website background",
  },
  {
    src: "https://i.pinimg.com/736x/01/a1/7e/01a17e3e81d1483d3711f0fb4239d953.jpg",
    alt: "Service business website background",
  },
  {
    src: "https://i.pinimg.com/1200x/98/37/23/9837234685822b333c8d857677b1d78c.jpg",
    alt: "Modern brand website background",
  },
];

const visibilityThemes = [
  {
    icon: Clock3,
    label: "24/7 online presence",
    text: "Your website keeps explaining, selling, and collecting inquiries even after business hours.",
    color: "#ef3525",
    deep: "#3a0b08",
  },
  {
    icon: EyeOff,
    label: "Do not stay invisible",
    text: "Customers search online first. If they cannot find you, they move to a business they can trust.",
    color: "#1d4ed8",
    deep: "#071b49",
  },
  {
    icon: ShieldCheck,
    label: "Instant credibility",
    text: "A polished website makes your brand feel established before the first call or WhatsApp message.",
    color: "#ef3525",
    deep: "#3a0b08",
  },
  {
    icon: MessageCircle,
    label: "More actions",
    text: "Turn visitors into bookings, orders, reservations, applications, quote requests, and leads.",
    color: "#1d4ed8",
    deep: "#071b49",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0">
        <div className="grid h-full grid-cols-2 grid-rows-3 opacity-65 md:grid-cols-5 md:grid-rows-1">
          {heroImages.map((image) => (
            <img key={image.alt} src={image.src} alt="" className="h-full w-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-[rgba(7,17,31,0.72)]" />
      </div>

      <div className="container-x relative pb-16 pt-10 sm:pb-18 sm:pt-12 lg:pb-20 lg:pt-14">
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-soft backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-current text-gold" /> Premium websites for serious
            businesses
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Your Business Should Be Working Online <span className="text-gold">24/7</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
            Do not let customers find your competitors first. WebMakers builds websites that make
            your business visible, trusted, and ready to receive bookings, orders, inquiries, and
            payments from anywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/describe-your-idea" className="btn-gold">
              Get a Website That Works 24/7 <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Book consultation with us now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-white/18"
            >
              Explore Business Solutions <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/76">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["#ef3525", "#1d4ed8", "#ef3525", "#1d4ed8"].map((c, index) => (
                  <div
                    key={`${c}-${index}`}
                    className="h-8 w-8 rounded-full border-2 border-white/90"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span>
                <b className="text-white">200+</b> businesses online
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-gold" />
              ))}
              <span className="ml-1">
                <b className="text-white">4.9/5</b> client rating
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {visibilityThemes.map((theme) => (
            <div
              key={theme.label}
              className="relative overflow-hidden border-2 p-5 shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-1"
              style={{
                borderColor: theme.color,
                background: `linear-gradient(135deg, ${theme.deep}, color-mix(in oklab, ${theme.color} 42%, #07111f) 52%, #07111f)`,
                boxShadow: `0 24px 70px -34px ${theme.color}`,
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 opacity-55 blur-3xl"
                style={{ background: theme.color }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: theme.color }}
              />
              <div className="relative flex items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center text-white shadow-soft"
                  style={{
                    background: theme.color,
                    boxShadow: `0 14px 35px -14px ${theme.color}`,
                  }}
                >
                  <theme.icon className="h-4 w-4" />
                </span>
                <h2 className="text-base font-bold leading-snug text-white">{theme.label}</h2>
              </div>
              <p className="relative mt-4 text-sm font-medium leading-relaxed text-white/86">
                {theme.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-white/14 bg-white/[0.08] p-5 shadow-soft backdrop-blur-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
                  Built for real business goals
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/74">
                  Restaurants get orders. Hotels get reservations. Clinics get appointments. Stores
                  get sales. Service businesses get quote requests. Your website should do more than
                  look nice.
                </p>
              </div>
              <a href="#categories" className="btn-primary shrink-0">
                Match My Industry
              </a>
            </div>
          </div>
          <div className="border border-white/14 bg-white/[0.08] p-5 shadow-soft backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-gold text-white">
                <Globe2 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-white">
                  Open on phones, Google, and WhatsApp
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Fast, mobile-first pages that make action easy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
