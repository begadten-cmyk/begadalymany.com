import { skillGroups } from "@/data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-20 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills"
          title="What I build with"
          lede="Listed the way a resume lists them, because that is what this section is for."
        />

        <dl className="mt-14 md:mt-20">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06}>
              <div className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <dt className="eyebrow pt-1 text-accent-soft md:col-span-3">
                  {group.label}
                </dt>
                <dd className="md:col-span-9">
                  {/* Separated by space rather than a slash: a wrapped line
                      would otherwise end on a dangling divider. */}
                  <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[1.0625rem] leading-snug text-white/78 md:text-[1.25rem]">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
