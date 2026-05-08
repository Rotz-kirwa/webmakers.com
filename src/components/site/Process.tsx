const steps = [
  { n: "01", t: "Choose your website type", d: "Pick the category that matches your business." },
  { n: "02", t: "Share business details", d: "Send us your content, logo, and preferences." },
  { n: "03", t: "We design and build", d: "We craft your site with care and revisions." },
  { n: "04", t: "Launch & attract customers", d: "Go live and start growing your brand online." },
];

export function Process() {
  return (
    <section id="process" className="bg-secondary/40 py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Process</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">From idea to launch in 4 simple steps</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card-elevated relative p-7">
              <span className="absolute -top-4 right-5 text-5xl font-black opacity-10" style={{ color: "var(--royal)" }}>{s.n}</span>
              <span className="inline-flex h-9 items-center rounded-full px-3 text-xs font-bold text-white" style={{ background: "var(--gradient-royal)" }}>
                STEP {s.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
