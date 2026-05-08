import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="container-x py-20">
      <div
        className="relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-16"
        style={{ background: "var(--gradient-royal)" }}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gold)" }} />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: "white" }} />
        <h2 className="relative mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl" style={{ color: "white" }}>
          Ready To Make Your Business Look Serious Online?
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          Let WebMakers build a website that makes people trust your brand before they even call you.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <a href="#cta" className="btn-gold">Start My Website <ArrowRight className="h-4 w-4" /></a>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
