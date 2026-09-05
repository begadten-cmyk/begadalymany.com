import { projects } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SlotImage from "./SlotImage";

const ACCENTS = ["#5fe3b0", "#8b7cff", "#4fa8ff", "#f7c963", "#ff8a7a"];

export default function Projects() {
  // With an odd number of cards the two-column grid would leave a hole in the
  // last row, so the first card takes the full width and lays out sideways.
  // It reads as a lead item rather than as a gap.
  const featureFirst = projects.length % 2 === 1;

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Projects"
          title="Things I built and shipped"
          lede="Trading infrastructure, applied ML, research simulation, and small tools that solved a problem I actually had."
        />

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {projects.map((p, i) => {
            const featured = featureFirst && i === 0;
            const accent = ACCENTS[i % ACCENTS.length];

            return (
              <Reveal
                key={p.id}
                delay={(i % 2) * 0.08}
                className={`min-w-0 ${featured ? "md:col-span-2" : ""}`}
              >
                <article
                  className={`group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors duration-500 hover:border-white/20 ${
                    featured ? "md:grid md:grid-cols-2 md:items-stretch" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden border-white/8 ${
                      featured
                        ? "border-b md:h-full md:border-r md:border-b-0"
                        : "border-b"
                    }`}
                  >
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                      <SlotImage
                        src={p.image}
                        alt={p.imageAlt}
                        variant="wide"
                        seed={p.id}
                        accent={accent}
                        sizes={
                          featured
                            ? "(min-width: 768px) 46vw, 92vw"
                            : "(min-width: 768px) 44vw, 92vw"
                        }
                      />
                    </div>
                  </div>

                  <div
                    className={`flex flex-col gap-4 p-6 md:p-7 ${
                      featured ? "md:justify-center md:p-9" : ""
                    }`}
                  >
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3
                        className={`display ${
                          featured
                            ? "text-[clamp(1.75rem,3.6vw,2.5rem)]"
                            : "text-[clamp(1.5rem,3vw,2rem)]"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <span className="eyebrow shrink-0 whitespace-nowrap text-white/40">
                        {p.years}
                      </span>
                    </div>
                    <p className="pretty text-[0.9375rem] leading-relaxed text-white/60">
                      {p.blurb}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.6875rem] text-white/55"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
