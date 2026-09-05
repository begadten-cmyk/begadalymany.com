import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal>
      <div className="hairline text-white/45" />
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-accent-soft">{eyebrow}</p>
          <h2 className="display balance mt-4 text-[clamp(2.25rem,6vw,4rem)]">
            {title}
          </h2>
        </div>
        {lede ? (
          <p className="pretty max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/55 md:text-right">
            {lede}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
