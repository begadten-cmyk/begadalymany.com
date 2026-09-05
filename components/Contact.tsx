import { site } from "@/data/site";
import Reveal from "./Reveal";

const LINKS = [
  { label: "LinkedIn", value: site.linkedinLabel, href: site.linkedin },
  { label: "GitHub", value: site.githubLabel, href: site.github },
];

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 pt-20 md:pt-32">
      <div className="shell">
        <Reveal>
          <div className="hairline text-white/45" />
          <p className="eyebrow mt-6 text-accent-soft">Contact</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display balance mt-6 max-w-[16ch] text-[clamp(2.5rem,8vw,5.5rem)]">
            Let&rsquo;s build something.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <a
            href={`mailto:${site.email}`}
            className="group mt-10 inline-flex max-w-full items-center gap-3 border-b border-white/20 pb-2 transition-colors duration-300 hover:border-accent"
          >
            <span className="truncate text-[clamp(1.125rem,4vw,2rem)] text-white/90 transition-colors duration-300 group-hover:text-accent-soft">
              {site.email}
            </span>
            <span className="text-white/50 transition-colors duration-300 group-hover:text-accent-soft">
              <Arrow />
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((l) => (
              <div key={l.label}>
                <p className="eyebrow text-white/35">{l.label}</p>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-3 inline-flex items-center gap-2 text-[0.9375rem] text-white/80 transition-colors duration-300 hover:text-accent-soft"
                >
                  <span className="break-all">{l.value}</span>
                  <Arrow />
                </a>
              </div>
            ))}

            <div>
              <p className="eyebrow text-white/35">Location</p>
              <p className="mt-3 text-[0.9375rem] text-white/80">
                New York, NY
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 lg:justify-self-end">
              <p className="eyebrow text-white/35">Resume</p>
              <a
                href={site.resume}
                download
                className="group mt-3 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              >
                Download resume
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M3 13.5h10" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        <footer className="mt-20 flex flex-col gap-4 border-t border-white/10 py-8 text-[0.75rem] text-white/35 sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with Next.js · Hosted on Vercel
          </p>
        </footer>
      </div>
    </section>
  );
}
