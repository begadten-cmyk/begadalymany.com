"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { nav, site } from "@/data/site";
import { scrollToTarget, setScrollLocked } from "@/lib/scroll";
import { EASE } from "@/lib/motion";

export default function Nav() {
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);

  // The hero gets the first screen to itself; the nav arrives with the story.
  useGSAP(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setRevealed(true);
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "top top-=1",
      end: "bottom top",
      onUpdate: (self) => setRevealed(self.progress > 0.55),
      onLeave: () => setRevealed(true),
      onEnterBack: () => setRevealed(true),
      onLeaveBack: () => setRevealed(false),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => setScrollLocked(false), []);

  const go = (href: string) => {
    setOpen(false);
    // Let the overlay release the scroll lock before the tween starts.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(href)));
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: revealed || open ? 0 : -24,
          opacity: revealed || open ? 1 : 0,
        }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-40 ${
          revealed || open ? "" : "pointer-events-none"
        }`}
      >
        <div className="shell">
          <div className="mt-3 flex items-center justify-between rounded-full border border-white/10 bg-black/25 py-2 pr-2 pl-4 backdrop-blur-xl sm:mt-4 sm:pl-5">
            <button
              type="button"
              onClick={() => go("#top")}
              className="flex items-center gap-2.5"
              aria-label={`${site.name} — back to top`}
            >
              <span className="relative flex size-6 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/40">
                <span className="text-[0.5625rem] font-semibold tracking-tight text-accent-soft">
                  {site.initials}
                </span>
              </span>
              <span className="text-sm font-medium tracking-tight text-white/85">
                {site.name}
              </span>
            </button>

            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="rounded-full px-3.5 py-1.5 text-sm text-white/65 transition-colors duration-200 hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={site.resume}
                className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink transition-opacity duration-200 hover:opacity-85"
              >
                Resume
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/5 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-white"
                  animate={{ top: open ? 6 : 2, rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-white"
                  animate={{ top: open ? 6 : 10, rotate: open ? -45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-30 flex flex-col justify-end bg-ink/92 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="shell pb-[max(2.5rem,env(safe-area-inset-bottom))]">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div aria-hidden="true" className="hairline text-white/50" />
                <p className="eyebrow mt-4 text-white/35">Sections</p>
              </motion.div>
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.button
                      type="button"
                      onClick={() => go(item.href)}
                      className="display block w-full py-1 text-left text-[clamp(2.5rem,13vw,4rem)] text-white"
                      initial={{ y: "100%", opacity: 1 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                    >
                      {item.label}
                    </motion.button>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
              >
                <a
                  href={site.resume}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink"
                >
                  Download resume
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80"
                >
                  Email me
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
