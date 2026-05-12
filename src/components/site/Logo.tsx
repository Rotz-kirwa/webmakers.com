type LogoProps = {
  className?: string;
  markClassName?: string;
};

export function Logo({ className = "", markClassName = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-lg font-bold text-navy ${className}`}
    >
      <span className={`grid h-9 w-9 place-items-center ${markClassName}`} aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img" className="h-9 w-9">
          <defs>
            <linearGradient id="webmakers-logo-gradient" x1="8" y1="5" x2="42" y2="44">
              <stop offset="0" stopColor="var(--royal)" />
              <stop offset="1" stopColor="var(--navy)" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="14" fill="url(#webmakers-logo-gradient)" />
          <path
            d="M14 17.5h20c2.2 0 4 1.8 4 4v14H14c-2.2 0-4-1.8-4-4v-10c0-2.2 1.8-4 4-4Z"
            fill="white"
            opacity="0.16"
          />
          <path
            d="M14 16h20c2.2 0 4 1.8 4 4v13H14c-2.2 0-4-1.8-4-4v-9c0-2.2 1.8-4 4-4Z"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
          />
          <path
            d="M10 22h28"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="2.4"
            opacity="0.8"
          />
          <circle cx="15" cy="19" r="1.4" fill="var(--gold)" />
          <circle cx="20" cy="19" r="1.4" fill="white" opacity="0.78" />
          <path
            d="M15 28.5l2.4 4.7 3-7.2 3 7.2 3-7.2 3 7.2 2.6-4.7"
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.7"
          />
          <path
            d="M34.5 8.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z"
            fill="var(--gold)"
          />
        </svg>
      </span>
      <span>WebMakers</span>
    </span>
  );
}
