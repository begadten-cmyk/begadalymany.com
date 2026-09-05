"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { chapters } from "@/data/timeline";
import { scrollToTarget } from "@/lib/scroll";

/**
 * A fixed rail tracking which era the reader is standing in. It doubles as
 * navigation inside the story and lives entirely in the left gutter, so it
 * never crowds the chapter column. It appears with the first chapter and
 * leaves the moment the story resolves.
 */
export default function ChapterRail() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useGSAP(() => {
    const triggers: ScrollTrigger[] = [];

    const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    sections.forEach((section, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        }),
      );
    });

    const first = sections[0];
    if (first) {
      triggers.push(
        ScrollTrigger.create({
          trigger: first,
          start: "top 70%",
          onEnter: () => setVisible(true),
          onLeaveBack: () => setVisible(false),
        }),
      );
    }

    const outro = document.querySelector<HTMLElement>("[data-story-outro]");
    if (outro) {
      triggers.push(
        ScrollTrigger.create({
          trigger: outro,
          start: "top 85%",
          onEnter: () => setVisible(false),
          onLeaveBack: () => setVisible(true),
        }),
      );
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav
      aria-label="Story chapters"
      aria-hidden={visible ? undefined : true}
      className={`fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 transition-opacity duration-500 xl:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ol className="space-y-1.5">
        {chapters.map((c, i) => {
          const isActive = i === active;
          return (
            <li key={c.id} className="relative">
              <button
                type="button"
                onClick={() => scrollToTarget(`#chapter-${c.id}`)}
                aria-current={isActive ? "true" : undefined}
                tabIndex={visible ? 0 : -1}
                className="group flex h-7 items-center gap-2.5"
              >
                <span className="sr-only">
                  Chapter {c.index}: {c.rail}
                </span>
                <span aria-hidden="true" className="relative block h-px w-4">
                  <motion.span
                    className="absolute inset-y-0 left-0 block origin-left"
                    animate={{
                      scaleX: isActive ? 1 : 0.45,
                      backgroundColor: isActive ? c.accent : "#ffffff33",
                    }}
                    style={{ width: "100%" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="eyebrow tabular-nums transition-colors duration-300 group-hover:text-white/80"
                  style={{ color: isActive ? c.accent : "#ffffff3d" }}
                >
                  {c.index}
                </span>

                {/* Name on hover / focus only, so the rail never needs the
                    horizontal room a permanent label would take. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-[calc(100%+0.75rem)] -translate-y-1/2 translate-x-[-4px] rounded-full border border-white/10 bg-black/60 px-3 py-1 whitespace-nowrap opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                >
                  <span className="eyebrow text-white/80">{c.rail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
