import type { CSSProperties } from "react";
import { chapters } from "@/data/timeline";
import ChapterLogo from "./ChapterLogo";
import SlotImage from "./SlotImage";
import StoryMotion from "./StoryMotion";
import ChapterRail from "./ChapterRail";

export default function Story() {
  return (
    <div id="story" className="relative">
      <StoryMotion />
      <ChapterRail />

      {chapters.map((c, i) => {
        const mediaFirst = i % 2 === 0;

        return (
          <section
            key={c.id}
            id={`chapter-${c.id}`}
            data-chapter
            aria-labelledby={`chapter-${c.id}-title`}
            className="relative h-[172svh] md:h-[182svh] lg:h-[195svh]"
            style={
              {
                "--era-base": c.base,
                "--era-glow": c.glow,
                "--era-accent": c.accent,
              } as CSSProperties
            }
          >
            <div
              data-ch-inner
              className="sticky top-0 flex h-[100svh] items-center overflow-hidden"
            >
              {/* Oversized chapter numeral, set as texture rather than type. */}
              <span
                aria-hidden="true"
                className="display pointer-events-none absolute -right-[3vw] bottom-[-4vh] z-[1] text-[38vw] leading-none opacity-[0.07] select-none lg:right-[3vw] lg:text-[22vw] lg:opacity-[0.05]"
                style={{ color: c.accent }}
              >
                {c.index}
              </span>

              <div className="shell static grid w-full grid-cols-1 items-center gap-6 py-10 sm:gap-8 lg:relative lg:grid-cols-12 lg:gap-14 lg:py-0 xl:pl-28">
                {/* Media.
                    Below lg it is a full-bleed still behind the narrative,
                    which keeps the copy readable on a short phone screen.
                    From lg up it becomes a framed panel in its own column. */}
                <div
                  className={`absolute inset-0 z-0 lg:static lg:z-auto ${
                    mediaFirst
                      ? "lg:col-span-5 lg:col-start-1"
                      : "lg:col-span-5 lg:col-start-8"
                  }`}
                >
                  <div className="relative h-full lg:h-auto">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-6 -z-10 hidden rounded-[2rem] opacity-60 blur-2xl lg:block"
                      style={{
                        background: `radial-gradient(60% 60% at 50% 50%, ${c.glow}, transparent 70%)`,
                      }}
                    />
                    <div
                      data-ch-media
                      className={`relative h-full w-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:rounded-2xl lg:opacity-100 lg:ring-1 lg:ring-white/12 ${
                        c.mediaKind === "logo" ? "opacity-[0.18]" : "opacity-[0.46]"
                      }`}
                      style={{
                        boxShadow: "0 40px 110px -40px rgba(0,0,0,0.85)",
                      }}
                    >
                      <div data-ch-media-inner className="absolute inset-0">
                        {c.mediaKind === "logo" ? (
                          <ChapterLogo
                            src={c.image}
                            alt={c.imageAlt}
                            accent={c.accent}
                          />
                        ) : (
                          <SlotImage
                            src={c.image}
                            alt={c.imageAlt}
                            variant="portrait"
                            seed={c.id}
                            accent={c.accent}
                            sizes="(min-width: 1024px) 34vw, 100vw"
                          />
                        )}
                      </div>
                    </div>
                    {/* Scrims. Below lg the type sits on the image, so the
                        image is pushed right back; from lg up it only needs a
                        foot to sit the panel into the era color. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 lg:hidden"
                      style={{
                        background: `linear-gradient(to bottom, color-mix(in oklab, ${c.base} 68%, transparent) 0%, color-mix(in oklab, ${c.base} 46%, transparent) 45%, color-mix(in oklab, ${c.base} 86%, transparent) 100%)`,
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 hidden rounded-2xl lg:block"
                      style={{
                        background: `linear-gradient(to top, color-mix(in oklab, ${c.base} 62%, transparent) 0%, transparent 42%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Narrative */}
                <div
                  className={`relative z-10 ${
                    mediaFirst
                      ? "lg:col-span-6 lg:col-start-7"
                      : "lg:col-span-6 lg:col-start-1 lg:row-start-1"
                  }`}
                >
                  {/* Stacks on narrow screens: the month-level date ranges
                      are too long to sit beside the chapter number there. */}
                  <div
                    data-ch-line
                    className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span
                      className="eyebrow tabular-nums whitespace-nowrap"
                      style={{ color: c.accent }}
                    >
                      Chapter {c.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-12 opacity-50 sm:block"
                      style={{ background: c.accent }}
                    />
                    <span className="eyebrow whitespace-nowrap text-white/60">
                      {c.dates}
                    </span>
                  </div>

                  <h2
                    id={`chapter-${c.id}-title`}
                    data-ch-line
                    className="display mt-3 text-[clamp(2.5rem,10vw,5.25rem)] lg:mt-6"
                  >
                    {c.title}
                  </h2>

                  {c.subtitle ? (
                    <p
                      data-ch-line
                      className="mt-2.5 text-[0.8125rem] text-white/55 sm:text-sm lg:mt-4"
                    >
                      {c.subtitle}
                    </p>
                  ) : null}

                  <div className="mt-4 max-w-[48ch] space-y-3 lg:mt-7 lg:space-y-4">
                    {c.body.map((p, k) => (
                      <p
                        key={k}
                        data-ch-line
                        className="pretty text-[0.9375rem] leading-[1.55] text-white/80 sm:text-base lg:text-[1.0625rem] lg:leading-[1.6]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  <p
                    data-ch-line
                    className="display balance mt-5 border-l pl-4 text-[clamp(1.125rem,2.6vw,1.75rem)] lg:mt-9 lg:pl-6"
                    style={{ borderColor: c.accent, color: c.accent }}
                  >
                    {c.pull}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* The handoff: story mode ends, reference mode begins. --------- */}
      <section
        data-story-outro
        id="work"
        className="relative flex min-h-[78svh] items-center"
      >
        <div className="shell w-full">
          <div className="mx-auto max-w-3xl text-center">
            <div aria-hidden="true" className="hairline text-white/60" />
            <p className="eyebrow mt-8 text-accent-soft">End of story</p>
            <h2 className="display balance mt-5 text-[clamp(2rem,6vw,4rem)]">
              Everything above is why.
              <br />
              Everything below is what.
            </h2>
            <p className="pretty mx-auto mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/60 sm:text-base">
              The companies I run, the things I&rsquo;ve built, the tools I
              build them with, and how to reach me.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
