import { assetExists } from "@/lib/media";
import SlotImageClient from "./SlotImageClient";
import SlotPlaceholder, { type SlotVariant } from "./SlotPlaceholder";

type Props = {
  src: string;
  alt: string;
  variant: SlotVariant;
  sizes: string;
  seed?: string;
  accent?: string;
  label?: string;
  priority?: boolean;
  className?: string;
};

/**
 * One image slot. Resolves on the server: if the real file is in `public`
 * it is served through next/image; if it is not, a designed, era-colored
 * placeholder renders in its place and no failed request is ever made.
 * Dropping a correctly named file into the path is the only step needed
 * to swap in the real photo.
 */
export default function SlotImage({
  src,
  alt,
  variant,
  sizes,
  seed,
  accent,
  label,
  priority,
  className,
}: Props) {
  const fallback = (
    <SlotPlaceholder
      variant={variant}
      seed={seed ?? src}
      accent={accent}
      label={label}
    />
  );

  if (!assetExists(src)) return fallback;

  return (
    <SlotImageClient
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
      fallback={fallback}
    />
  );
}
