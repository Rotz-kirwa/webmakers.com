type Props = { headline: string; sub?: string; variant?: "navy" | "gold" | "sky" };

export function PromoBanner({ headline, sub, variant = "navy" }: Props) {
  const styles =
    variant === "gold"
      ? { background: "var(--gradient-gold)", color: "var(--ink)" }
      : variant === "sky"
      ? { background: "linear-gradient(135deg, color-mix(in oklab, var(--sky) 90%, white), white)", color: "var(--navy)" }
      : { background: "var(--gradient-royal)", color: "white" };

  return (
    <section className="container-x py-10">
      <div className="relative overflow-hidden rounded-3xl px-8 py-12 sm:px-14 sm:py-16" style={styles}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "white" }} />
        <h3 className="max-w-3xl text-2xl font-extrabold sm:text-3xl lg:text-4xl" style={{ color: "inherit" }}>
          {headline}
        </h3>
        {sub && <p className="mt-3 max-w-2xl text-base opacity-90">{sub}</p>}
      </div>
    </section>
  );
}
