type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className = "", markClassName = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 font-display text-lg font-black tracking-tight text-navy ${className}`}
    >
      <span className={`grid h-11 w-11 place-items-center ${markClassName}`} aria-hidden="true">
        <svg viewBox="0 0 56 56" role="img" className="h-11 w-11">
          <defs>
            <linearGradient id="webmakers-logo-gradient" x1="8" y1="6" x2="48" y2="50">
              <stop offset="0" stopColor="#2563eb" />
              <stop offset="0.58" stopColor="var(--royal)" />
              <stop offset="1" stopColor="var(--navy)" />
            </linearGradient>
            <linearGradient id="webmakers-logo-accent" x1="13" y1="12" x2="44" y2="45">
              <stop offset="0" stopColor="#ff6a4d" />
              <stop offset="1" stopColor="var(--gold)" />
            </linearGradient>
            <filter id="webmakers-logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="6"
                floodColor="#0f172a"
                floodOpacity="0.22"
              />
            </filter>
          </defs>
          <rect
            x="4"
            y="4"
            width="48"
            height="48"
            rx="15"
            fill="url(#webmakers-logo-gradient)"
            filter="url(#webmakers-logo-shadow)"
          />
          <path d="M14 16h28" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.24" />
          <path d="M14 40h28" stroke="white" strokeLinecap="round" strokeWidth="3" opacity="0.18" />
          <path
            d="M13.5 20.5 18.2 38 24.9 22.4 31.1 38 37.8 20.5"
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.2"
          />
          <path
            d="M23.7 31.7 28 20.8 32.3 31.7"
            fill="none"
            stroke="url(#webmakers-logo-accent)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.2"
          />
          <path
            d="M40.8 16.2 42 19l2.8 1.2L42 21.4l-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2 1.2-2.8Z"
            fill="url(#webmakers-logo-accent)"
          />
          <path
            d="M13.5 45.5h29"
            fill="none"
            stroke="url(#webmakers-logo-accent)"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-xl font-black text-navy">WebMakers</span>
        <span className="mt-0.5 hidden text-[0.62rem] font-black uppercase tracking-[0.18em] text-royal sm:block">
          Digital Studio
        </span>
      </span>
    </span>
  );
}
