"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fallback: ReactNode;
};

/**
 * Renders the real asset, but keeps the designed placeholder as a runtime
 * safety net — a file that exists at build time but 404s at the edge still
 * degrades gracefully instead of showing a broken image.
 */
export default function SlotImageClient({
  src,
  alt,
  sizes,
  priority,
  className = "",
  fallback,
}: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={90}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
