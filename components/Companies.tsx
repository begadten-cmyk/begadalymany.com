import { companies } from "@/data/companies";
import AcronixDiagram from "./diagrams/AcronixDiagram";
import MedarixDiagram from "./diagrams/MedarixDiagram";
import ProductLink from "./ProductLink";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SlotImage from "./SlotImage";

const DIAGRAMS: Record<string, React.ComponentType> = {
  acronix: AcronixDiagram,
  medarix: MedarixDiagram,
};

export default function Companies() {
  return (
    <section id="companies" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Companies"
          title="Two companies, founded as a student"
          lede="Both are AI products with a hard constraint in front of them — unit economics in one, patient safety in the other."
        />

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {companies.map((c, i) => {
            const Diagram = DIAGRAMS[c.id];
            return (
              <article key={c.id} className="relative">
                {/* The link overlay fills this box, which stops short of the
                    divider so the gap between companies stays inert. */}
                <div className="group/card relative isolate">
                  <Reveal delay={0.05}>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/12">
                        <SlotImage
                          src={c.mark}
                          alt={c.markAlt}
                          variant="mark"
                          seed={c.id}
                          accent={c.accent}
                          label={c.name}
                          sizes="44px"
                        />
                      </span>
                      <h3 className="display text-[clamp(2rem,5vw,3.25rem)]">
                        {c.name}
                      </h3>
                      <span className="eyebrow rounded-full border border-white/12 px-3 py-1 text-white/55">
                        {c.role}
                      </span>
                      <span
                        className="eyebrow rounded-full px-3 py-1"
                        style={{
                          color: c.accent,
                          background: `color-mix(in oklab, ${c.accent} 14%, transparent)`,
                        }}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="pretty mt-4 max-w-[52ch] text-lg text-white/80 md:text-xl">
                      {c.tagline}
                    </p>
                  </Reveal>

                  <div className="mt-9 grid gap-9 lg:grid-cols-12 lg:gap-12">
                    {/* Narrative + numbers */}
                    <Reveal className="min-w-0 lg:col-span-5" delay={0.1}>
                      <div className="space-y-4">
                        {c.body.map((p, k) => (
                          <p
                            key={k}
                            className="pretty text-[0.9375rem] leading-relaxed text-white/62 md:text-base"
                          >
                            {p}
                          </p>
                        ))}
                      </div>

                      <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        {c.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="sr-only">{m.label}</dt>
                            <dd>
                              <span
                                className="display block text-[clamp(1.35rem,3.4vw,2rem)] leading-none"
                                style={{ color: c.accent }}
                              >
                                {m.value}
                              </span>
                              <span className="mt-2 block text-[0.6875rem] leading-tight text-white/45">
                                {m.label}
                              </span>
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <ul className="mt-7 flex flex-wrap gap-2">
                        {c.stack.map((s) => (
                          <li
                            key={s}
                            className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-mono text-[0.6875rem] text-white/60"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    {/* Architecture */}
                    <Reveal className="min-w-0 lg:col-span-7" delay={0.16}>
                      <figure className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors duration-500 group-hover/card:border-white/20 md:p-7">
                        {/* Below md the diagram scrolls inside its own frame
                            rather than shrinking its labels into illegibility.
                            It sits above the card's link overlay there, or the
                            overlay would swallow the swipe. */}
                        <div className="relative z-[2] -mx-1 overflow-x-auto pb-2 md:static md:z-auto md:mx-0 md:overflow-visible md:pb-0">
                          <div className="min-w-[560px] md:min-w-0">
                            {Diagram ? <Diagram /> : null}
                          </div>
                        </div>
                        <figcaption className="mt-5 border-t border-white/8 pt-4 text-[0.8125rem] leading-relaxed text-white/45">
                          {c.diagramCaption}
                        </figcaption>
                      </figure>
                    </Reveal>
                  </div>

                  {/* y={0}: this block holds the stretched link, and a
                      transform here would trap the overlay inside it until the
                      footer had scrolled into view. */}
                  <Reveal y={0} delay={0.2}>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                      <ProductLink href={c.url} name={c.name} />
                      <p className="flex items-center gap-2.5 font-mono text-xs text-white/50">
                        <span
                          aria-hidden="true"
                          className="relative flex size-2"
                        >
                          <span className="absolute inset-0 rounded-full bg-live opacity-0 motion-safe:animate-[live-pulse_2.4s_ease-out_infinite]" />
                          <span className="relative size-2 rounded-full bg-live" />
                        </span>
                        <span className="text-live/90">Live</span>
                        <span>{new URL(c.url).hostname}</span>
                      </p>
                    </div>
                  </Reveal>
                </div>

                {i < companies.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="hairline mt-16 text-white/40 md:mt-24"
                  />
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
