import SlotImage from "./SlotImage";

/**
 * A company mark, presented as a brand tile rather than a photograph.
 *
 * The logos are small, square, and carry their own background, so cover-
 * cropping them into the 4:5 chapter frame would both distort them and blow
 * them past their native resolution. Instead the frame keeps the era wash and
 * the mark sits centred inside it at a size it can actually hold.
 */
export default function ChapterLogo({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(152deg,
            color-mix(in oklab, ${accent} 32%, transparent) 0%,
            color-mix(in oklab, ${accent} 10%, transparent) 46%,
            transparent 78%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(72% 60% at 50% 44%, color-mix(in oklab, ${accent} 26%, transparent) 0%, transparent 68%)`,
        }}
      />
      {/* Grain sits under the mark, so the logo itself stays clean. */}
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div
          className="relative aspect-square w-full max-w-[13.75rem] overflow-hidden rounded-2xl ring-1 ring-white/15"
          style={{ boxShadow: "0 24px 60px -20px rgba(0,0,0,0.75)" }}
        >
          <SlotImage
            src={src}
            alt={alt}
            variant="mark"
            seed={src}
            accent={accent}
            sizes="220px"
          />
        </div>
      </div>
    </div>
  );
}
