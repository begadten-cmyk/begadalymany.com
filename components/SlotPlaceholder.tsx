import type { CSSProperties } from "react";

export type SlotVariant = "portrait" | "wide" | "mark" | "hero";

type Props = {
  variant: SlotVariant;
  /** Drives the generated motif, so no two slots look alike. */
  seed?: string;
  /** Era / brand color the placeholder should belong to. */
  accent?: string;
  label?: string;
  className?: string;
};

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * A deterministic, abstract line motif. Three families, chosen by seed, so a
 * grid of placeholders reads as a set rather than as the same tile repeated.
 */
function Motif({ seed }: { seed: string }) {
  const h = hash(seed);
  const family = h % 3;

  const common = {
    fill: "none" as const,
    stroke: "currentColor" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  let content: React.ReactNode;

  if (family === 0) {
    // Topographic contours: rings that drift rather than nest concentrically.
    const cx = 44 + ((h >> 3) % 22);
    const cy = 40 + ((h >> 7) % 24);
    const squash = 0.58 + ((h >> 11) % 34) / 100;
    const phase = ((h >> 15) % 100) / 16;
    content = (
      <g transform={`rotate(${((h >> 5) % 70) - 35} 50 50)`}>
        {Array.from({ length: 9 }, (_, i) => {
          const t = (i + 1) / 9;
          const rx = 7 + t * 56;
          return (
            <ellipse
              key={i}
              {...common}
              cx={cx + Math.sin(i * 0.95 + phase) * 9}
              cy={cy + Math.cos(i * 0.72 + phase) * 6}
              rx={rx}
              ry={rx * squash}
              strokeWidth={0.32}
              opacity={0.46 - t * 0.3}
            />
          );
        })}
      </g>
    );
  } else if (family === 1) {
    // A raked field of beams, thinning as it crosses the frame.
    const angle = ((h >> 4) % 120) - 60;
    content = (
      <g transform={`rotate(${angle} 50 50)`}>
        {Array.from({ length: 16 }, (_, i) => {
          const y = -20 + i * 9 + ((h >> (i + 1)) % 4);
          return (
            <line
              key={i}
              {...common}
              x1={-60}
              y1={y}
              x2={160}
              y2={y}
              strokeWidth={0.28 + ((h >> i) % 3) * 0.16}
              opacity={0.34 - Math.abs(i - 8) * 0.018}
            />
          );
        })}
      </g>
    );
  } else {
    // Arcs radiating from a corner, with a single solid accent disc.
    const cornerX = (h >> 6) % 2 === 0 ? 4 : 96;
    const cornerY = (h >> 9) % 2 === 0 ? 6 : 94;
    content = (
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <circle
            key={i}
            {...common}
            cx={cornerX}
            cy={cornerY}
            r={12 + i * 11}
            strokeWidth={0.32}
            opacity={0.4 - i * 0.03}
          />
        ))}
        <circle
          cx={cornerX > 50 ? 30 : 70}
          cy={cornerY > 50 ? 32 : 68}
          r={7}
          fill="currentColor"
          opacity={0.22}
        />
      </g>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

export default function SlotPlaceholder({
  variant,
  seed = "slot",
  accent = "#8b7cff",
  label,
  className = "",
}: Props) {
  // A dark tint of the era color rather than a neutral, so a placeholder
  // panel sits inside its chapter instead of on top of it.
  const style = {
    color: accent,
    backgroundColor: `color-mix(in oklab, ${accent} 14%, #0b0b10)`,
  } as CSSProperties;

  const wash = (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(152deg,
            color-mix(in oklab, ${accent} 46%, transparent) 0%,
            color-mix(in oklab, ${accent} 14%, transparent) 46%,
            transparent 78%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(78% 66% at 26% 16%, color-mix(in oklab, ${accent} 34%, transparent) 0%, transparent 66%),
                       radial-gradient(62% 62% at 88% 96%, color-mix(in oklab, ${accent} 22%, transparent) 0%, transparent 64%)`,
        }}
      />
    </>
  );

  const base = "relative isolate h-full w-full overflow-hidden " + className;

  if (variant === "hero") {
    return (
      <div className={base} style={style} aria-hidden="true">
        {wash}
        {/* A quiet figure, so the oval never reads as an empty frame. */}
        <svg
          viewBox="0 0 100 125"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="slot-figure" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="47" r="17.5" fill="url(#slot-figure)" />
          <path
            d="M14 125c0-24 16-37 36-37s36 13 36 37z"
            fill="url(#slot-figure)"
          />
        </svg>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>
    );
  }

  if (variant === "mark") {
    return (
      <div
        className={`${base} flex items-center justify-center`}
        style={style}
        aria-hidden="true"
      >
        {wash}
        <span
          className="display relative z-10 text-[2.4em] leading-none"
          style={{ color: accent, opacity: 0.9 }}
        >
          {(label ?? "•").slice(0, 1)}
        </span>
      </div>
    );
  }

  return (
    <div className={base} style={style} aria-hidden="true">
      {wash}
      <Motif seed={seed} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)",
        }}
      />
      {label ? (
        <span
          className="display absolute bottom-[5%] left-[6%] text-[clamp(2rem,7vw,4rem)] leading-none opacity-20"
          style={{ color: accent }}
        >
          {label}
        </span>
      ) : null}
      <div className="grain pointer-events-none absolute inset-0" />
    </div>
  );
}
