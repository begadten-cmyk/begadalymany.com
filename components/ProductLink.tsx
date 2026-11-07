"use client";

import type { KeyboardEvent } from "react";

/**
 * The card's call to action, and its only interactive element. The `::after`
 * overlay stretches this one link across the card, so the whole card is
 * clickable with no nested interactive elements.
 *
 * The anchor must stay `position: static` with no transform of its own, or the
 * overlay would shrink to the button.
 */
export default function ProductLink({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  // Links only activate on Enter natively; Space would scroll the page.
  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== " ") return;
    event.preventDefault();
    if (!event.repeat) event.currentTarget.click();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onKeyDown={onKeyDown}
      className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-5 text-sm font-medium text-ink transition-colors duration-300 after:absolute after:-inset-3 after:z-[1] after:rounded-2xl hover:bg-accent-soft focus-visible:after:outline-2 focus-visible:after:outline-accent-soft/50"
    >
      Check it out
      <span className="sr-only">: {name} (opens in a new tab)</span>
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
    </a>
  );
}
