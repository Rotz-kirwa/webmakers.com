import { Quote, Star } from "lucide-react";

const items = [
  {
    name: "Amina K.",
    role: "Owner, Bella Cafe",
    image: "https://i.pinimg.com/736x/c8/2e/6b/c82e6becf79d72bf788b33340ff3432e.jpg",
    quote:
      "Our online orders doubled within the first month. The site looks amazing and was delivered fast.",
  },
  {
    name: "James M.",
    role: "Director, Acacia Realty",
    image: "https://i.pinimg.com/736x/6b/c3/ff/6bc3ff27cfac1303e584089abf391605.jpg",
    quote:
      "Clients now take us seriously before they even call. The listings page converts visitors into inquiries.",
  },
  {
    name: "Grace W.",
    role: "Founder, Glow Salon",
    image: "https://i.pinimg.com/736x/3c/ad/f2/3cadf261af23076f129117864349d4d7.jpg",
    quote: "The booking system saves me hours every week. WebMakers truly understood my brand.",
  },
  {
    name: "Daniel O.",
    role: "CEO, Swift Logistics",
    image: "https://i.pinimg.com/736x/78/9e/3c/789e3c79419d714d1623d04c05213a05.jpg",
    quote: "Professional, fast, and affordable. Our quote requests went up 3x after launch.",
  },
  {
    name: "Wanjiku N.",
    role: "Principal, Rising Star Academy",
    image: "https://i.pinimg.com/1200x/ec/cc/94/eccc9419ffbd4a477ac582bf64ad246c.jpg",
    quote: "Beautiful design, easy admin updates, and parents love how clear our website feels.",
  },
  {
    name: "Brian T.",
    role: "Owner, FitForge Gym",
    image: "https://i.pinimg.com/736x/c1/97/91/c197916672d7b82ae89a3ab936f84813.jpg",
    quote: "Membership sign-ups are flowing in. Best investment for my business this year.",
  },
  {
    name: "Rajesh P.",
    role: "Founder, Royal Motors",
    image: "https://i.pinimg.com/1200x/0a/92/cb/0a92cbef5fc9e68a9f5586121ebfca9d.jpg",
    quote:
      "My car business now gets serious buyers every week through the website. WebMakers made us look trusted, premium, and easy to contact.",
  },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Trusted by business owners</h2>
          <p className="mt-3 text-muted-foreground">
            Real businesses using modern websites to earn trust, receive inquiries, and grow.
          </p>
        </div>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-testimonial-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 gap-6 pr-6">
              {items.map((t) => (
                <figure
                  key={`${t.name}-${group}`}
                  className="relative flex w-[22rem] shrink-0 flex-col border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-36px_rgba(15,23,42,0.45)] sm:w-[26rem]"
                >
                  <Quote
                    className="absolute right-5 top-5 h-8 w-8 opacity-15"
                    style={{ color: "var(--royal)" }}
                  />
                  <figcaption className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={`${t.name} testimonial portrait`}
                      loading="lazy"
                      className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-soft"
                    />
                    <div>
                      <div className="text-sm font-black text-navy">{t.name}</div>
                      <div className="text-xs font-semibold text-muted-foreground">{t.role}</div>
                    </div>
                  </figcaption>
                  <div className="mt-5 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current"
                        style={{ color: "var(--gold)" }}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                    "{t.quote}"
                  </blockquote>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
