"use client";

import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll choreography for the story chapters.
 *
 * Sections are taller than the viewport with a `position: sticky` inner
 * panel, so the "pin" is done by the browser's own compositor rather than
 * by GSAP rewriting layout. GSAP is left to do what it is best at: scrubbing
 * transform and opacity against scroll position. Everything animated here is
 * GPU-friendly, which is what keeps the whole sequence smooth on a phone.
 */
export default function StoryMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-chapter]");

      sections.forEach((section) => {
        const inner = section.querySelector<HTMLElement>("[data-ch-inner]");
        const media = section.querySelector<HTMLElement>("[data-ch-media]");
        const mediaInner =
          section.querySelector<HTMLElement>("[data-ch-media-inner]");
        const lines = section.querySelectorAll<HTMLElement>("[data-ch-line]");
        if (!inner) return;

        // ---- Enter: the chapter assembles as it rises into place.
        const enter = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        if (media) {
          enter.fromTo(
            media,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 0.72 },
            0,
          );
        }
        if (mediaInner) {
          enter.fromTo(
            mediaInner,
            { scale: 1.22 },
            { scale: 1, ease: "none", duration: 1 },
            0,
          );
        }
        if (lines.length) {
          enter.fromTo(
            lines,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              duration: 0.62,
              stagger: 0.055,
            },
            0.18,
          );
        }

        // ---- Hold, then dissolve, inside the sticky window. The fade
        // finishes just before the panel unsticks, so consecutive chapters
        // never overlap on screen.
        const exit = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        exit
          .to(inner, { autoAlpha: 1, duration: 0.6 })
          .to(inner, {
            autoAlpha: 0,
            yPercent: -6,
            scale: 0.965,
            ease: "power1.in",
            duration: 0.36,
          })
          .to(inner, { autoAlpha: 0, duration: 0.04 });

        // ---- Slow parallax on the image while the panel is held.
        if (mediaInner) {
          gsap.fromTo(
            mediaInner,
            { yPercent: -3.5 },
            {
              yPercent: 3.5,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      // ---- Hero recedes as the first chapter takes over.
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        gsap.to(hero, {
          opacity: 0,
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return null;
}
