"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null) {
  instance = next;
}

/** Smooth-scrolls to an element, whether or not Lenis is running. */
export function scrollToTarget(hash: string) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  // Keep the URL shareable without letting the browser hard-jump.
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

/** Freezes the page behind an overlay, with or without Lenis running. */
export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
