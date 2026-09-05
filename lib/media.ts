import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, boolean>();

/**
 * True when a real asset has been dropped into `public` at this path.
 *
 * Resolving on the server means a missing photo never becomes a failed
 * image request in the browser — the designed placeholder renders instead,
 * and the moment a correctly named file appears the real image takes over
 * with no code change.
 */
export function assetExists(publicPath: string): boolean {
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  const clean = publicPath.split("?")[0].replace(/^\/+/, "");
  let exists = false;
  try {
    const full = path.join(process.cwd(), "public", clean);
    exists = fs.existsSync(full) && fs.statSync(full).size > 0;
  } catch {
    exists = false;
  }

  // Only memoize in production; in dev we want a dropped-in file to appear
  // as soon as the page re-renders.
  if (process.env.NODE_ENV === "production") cache.set(publicPath, exists);
  return exists;
}
