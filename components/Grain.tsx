/** Fixed film grain. Static by design: one composited layer, zero per-frame cost. */
export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-50"
    />
  );
}
