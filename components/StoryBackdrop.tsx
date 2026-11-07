"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { chapters } from "@/data/timeline";
import { overture, settled } from "@/data/site";

/**
 * The color story.
 *
 * Every era is a stacked, fixed layer. Scroll only ever animates opacity,
 * which the compositor handles on its own thread, so the morph stays smooth
 * on a phone. Crossfading layer B in over layer A at opacity t is exactly a
 * linear interpolation between the two colors, which is why this reads as a
 * true morph rather than a dissolve.
 *
 * Only the layers that can be seen are rendered. A layer fully covered by the
 * one above it, or not yet faded in, is `visibility: hidden`, so at most two
 * eras hold GPU memory at once rather than all nine.
 */
export default function StoryBackdrop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = Array.from(
          document.querySelectorAll<HTMLElement>("[data-era-layer]"),
        );
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>("[data-chapter]"),
        );

        const tweens = new Map<number, gsap.core.Tween>();
        // Also runs on refresh: restoring a scroll position on reload moves
        // the tweens without firing onUpdate.
        const sync = () => {
          const shown = layers.map((_, i) =>
            i === 0 ? 1 : (tweens.get(i)?.progress() ?? 0),
          );
          const top = shown.lastIndexOf(1);
          layers.forEach((layer, i) => {
            const visible = i >= top && shown[i] > 0;
            layer.style.visibility = visible ? "visible" : "hidden";
          });
        };

        // Layer 0 is the overture and always sits underneath.
        sections.forEach((section, i) => {
          const layer = layers[i + 1];
          if (!layer) return;
          tweens.set(
            i + 1,
            gsap.fromTo(
              layer,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "none",
                onUpdate: sync,
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                  invalidateOnRefresh: true,
                  onRefresh: sync,
                },
              },
            ),
          );
        });

        // The final neutral resolves as the story hands off to the rest of
        // the site: the visual signal that story mode has ended.
        const outro = document.querySelector<HTMLElement>("[data-story-outro]");
        const settledLayer = layers[layers.length - 1];
        if (outro && settledLayer) {
          tweens.set(
            layers.length - 1,
            gsap.fromTo(
              settledLayer,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "none",
                onUpdate: sync,
                scrollTrigger: {
                  trigger: outro,
                  start: "top bottom",
                  end: "top 30%",
                  scrub: true,
                  invalidateOnRefresh: true,
                  onRefresh: sync,
                },
              },
            ),
          );
        }

        sync();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const palettes = [overture, ...chapters, settled];

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="story-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {palettes.map((p, i) => (
        <div
          key={i}
          data-era-layer={i}
          className="era-layer"
          style={
            {
              "--era-base": p.base,
              "--era-glow": p.glow,
              "--drift-delay": `${i * -3.2}s`,
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
