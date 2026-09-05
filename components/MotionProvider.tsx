"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` lets Framer honour the OS setting itself: transform
 * and layout animations are dropped while opacity still resolves. Doing it
 * here rather than branching on `useReducedMotion()` inside components keeps
 * server and client markup identical, so nothing mismatches on hydration.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
