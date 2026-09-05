"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { chapters } from "@/data/timeline";
import { site } from "@/data/site";
import { scrollToTarget } from "@/lib/scroll";
import { EASE } from "@/lib/motion";

const LINES = ["Begad", "Alymany"];

export default function Hero({ portrait }: { portrait: ReactNode }) {
  const lift: Variants = {
    hidden: { y: "110%", opacity: 1 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1.15, delay: 0.25 + i * 0.075, ease: EASE },
    }),
  };

  const fade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.55 + i * 0.09, ease: EASE },
    }),
  };

  return (
    <section
      id="top"
      data-hero
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[max(1.5rem,env(safe-area-inset-top))] pb-8"
    >
      <div className="shell flex w-full items-center justify-between">
        <motion.span
          className="eyebrow text-muted"
          variants={fade}
          custom={-3}
          initial="hidden"
          animate="show"
        >
          Portfolio &amp; Story
        </motion.span>
        <motion.span
          className="eyebrow text-muted"
          variants={fade}
          custom={-2}
          initial="hidden"
          animate="show"
        >
          New York, NY
        </motion.span>
      </div>

      <div className="shell grid flex-1 grid-cols-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-0">
        {/* Portrait ------------------------------------------------ */}
        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <motion.div
            className="relative mx-auto w-[min(58vw,17rem)] lg:mx-0 lg:ml-auto lg:w-[min(24vw,20rem)]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            {/* A quiet orbit: a static hairline ring with one slow highlight
                travelling around it. The only decorative motion in the hero. */}
            <div
              aria-hidden="true"
              className="absolute -inset-[7%] rounded-[50%] border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-[7%] rounded-[50%] opacity-90 motion-safe:animate-[spin_26s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--color-accent) 85%, transparent) 70deg, transparent 150deg, transparent 220deg, color-mix(in oklab, var(--color-accent-2) 60%, transparent) 300deg, transparent 360deg)",
                maskImage:
                  "radial-gradient(closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
                WebkitMaskImage:
                  "radial-gradient(closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
              }}
            />
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-[50%] ring-1 ring-white/15"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
            >
              {portrait}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[50%]"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(255,255,255,0.14) 0%, transparent 38%)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Name + meta --------------------------------------------- */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <h1 className="display text-[clamp(3.5rem,13vw,9.5rem)]">
            <span className="sr-only">{site.name}</span>
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  aria-hidden="true"
                  className="block"
                  variants={lift}
                  custom={i}
                  initial="hidden"
                  animate="show"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-8 max-w-xl lg:mt-10">
            <motion.div
              aria-hidden="true"
              className="h-px origin-left bg-white/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            />
            <dl className="mt-5 space-y-3">
              {[
                ["Studying", site.role],
                ["At", `${site.school} · ${site.schoolLong}`],
                ["Graduating", site.gradYear],
              ].map(([label, value], i) => (
                <motion.div
                  key={label}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5"
                  variants={fade}
                  custom={i}
                  initial="hidden"
                  animate="show"
                >
                  <dt className="eyebrow w-24 shrink-0 text-white/40">{label}</dt>
                  <dd className="text-[0.95rem] leading-snug text-white/85 sm:text-base">
                    {value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Scroll cue ------------------------------------------------ */}
      <motion.div
        className="shell flex w-full items-end justify-between gap-6"
        variants={fade}
        custom={4}
        initial="hidden"
        animate="show"
      >
        <button
          type="button"
          onClick={() => scrollToTarget("#story")}
          className="group flex items-center gap-4 text-left"
        >
          <span
            aria-hidden="true"
            className="relative block h-10 w-px overflow-hidden bg-white/20"
          >
            <span className="absolute inset-x-0 top-0 block h-3 bg-white/80 motion-safe:animate-[cue_2.4s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
          </span>
          <span className="eyebrow text-white/50 transition-colors duration-300 group-hover:text-white/90">
            Scroll to see my story
          </span>
        </button>
        <span className="eyebrow hidden text-white/25 tabular-nums sm:block">
          01 / {String(chapters.length).padStart(2, "0")}
        </span>
      </motion.div>
    </section>
  );
}
