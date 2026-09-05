"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const CLIENTS = [
  { x: 24, label: "Freight", sub: "brokerage" },
  { x: 244, label: "Insurance", sub: "agencies" },
  { x: 464, label: "Property", sub: "management" },
];

const CORE = [
  "Agent runtime",
  "Model router",
  "Prompt cache",
  "Batch inference",
];

const W = 640;
const CARD_W = 152;

/**
 * Acronix: one shared core, many client surfaces. Customization lives at the
 * edges so the platform underneath never forks.
 */
export default function AcronixDiagram() {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: {
      pathLength: { duration: 0.9, delay, ease: EASE },
      opacity: { duration: 0.2, delay },
    },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <svg
      viewBox={`0 0 ${W} 372`}
      className="font-mono h-auto w-full"
      role="img"
      aria-labelledby="acronix-diagram-title acronix-diagram-desc"
    >
      <title id="acronix-diagram-title">
        Acronix platform architecture diagram
      </title>
      <desc id="acronix-diagram-desc">
        Three client verticals — freight brokerage, insurance, and property
        management — each sit on their own thin customization layer, and all
        three connect down into a single shared core platform containing the
        agent runtime, model router, prompt cache, and batch inference.
      </desc>

      <defs>
        <linearGradient id="acx-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b7cff" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#8b7cff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Client verticals */}
      {CLIENTS.map((c, i) => (
        <motion.g key={c.label} {...fade(0.05 * i)}>
          <rect
            x={c.x}
            y={8}
            width={CARD_W}
            height={58}
            rx={12}
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(255,255,255,0.16)"
          />
          <text x={c.x + 16} y={32} fill="#f5f3f0" fontSize="13">
            {c.label}
          </text>
          <text x={c.x + 16} y={50} fill="rgba(245,243,240,0.5)" fontSize="11">
            {c.sub}
          </text>
        </motion.g>
      ))}

      {/* Client → customization */}
      {CLIENTS.map((c, i) => (
        <motion.path
          key={`link-a-${i}`}
          d={`M${c.x + CARD_W / 2} 66 V 116`}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.25"
          fill="none"
          {...draw(0.2 + i * 0.07)}
        />
      ))}

      {/* Per-client customization layer */}
      {CLIENTS.map((c, i) => (
        <motion.g key={`custom-${i}`} {...fade(0.28 + i * 0.06)}>
          <rect
            x={c.x}
            y={116}
            width={CARD_W}
            height={50}
            rx={10}
            fill="rgba(139,124,255,0.07)"
            stroke="#8b7cff"
            strokeOpacity="0.45"
            strokeDasharray="4 4"
          />
          <text x={c.x + 16} y={140} fill="#b7aeff" fontSize="11">
            per-client
          </text>
          <text x={c.x + 16} y={156} fill="rgba(183,174,255,0.62)" fontSize="11">
            customization
          </text>
        </motion.g>
      ))}

      {/* Customization → shared core: three lanes funnelling into one bus */}
      {CLIENTS.map((c, i) => {
        const cx = c.x + CARD_W / 2;
        const d =
          cx === 320
            ? "M320 166 V 224"
            : cx < 320
              ? `M${cx} 166 V 182 Q ${cx} 196 ${cx + 14} 196 H 306 Q 320 196 320 210 V 224`
              : `M${cx} 166 V 182 Q ${cx} 196 ${cx - 14} 196 H 334 Q 320 196 320 210 V 224`;
        return (
          <motion.path
            key={`link-b-${i}`}
            d={d}
            stroke="#8b7cff"
            strokeOpacity="0.55"
            strokeWidth="1.25"
            fill="none"
            strokeLinecap="round"
            {...draw(0.42 + i * 0.07)}
          />
        );
      })}

      {/* Shared core platform */}
      <motion.g {...fade(0.6)}>
        <rect
          x={24}
          y={224}
          width={W - 48}
          height={132}
          rx={16}
          fill="url(#acx-core)"
          stroke="#8b7cff"
          strokeOpacity="0.5"
        />
        <text x={44} y={254} fill="#f5f3f0" fontSize="13">
          Shared core platform
        </text>
        <text
          x={W - 44}
          y={254}
          textAnchor="end"
          fill="rgba(183,174,255,0.75)"
          fontSize="11"
        >
          one codebase
        </text>
        {CORE.map((label, i) => {
          const w = (W - 48 - 20 - 3 * 12) / 4;
          const x = 34 + i * (w + 12);
          return (
            <g key={label}>
              <rect
                x={x}
                y={278}
                width={w}
                height={54}
                rx={9}
                fill="rgba(10,10,12,0.5)"
                stroke="rgba(255,255,255,0.12)"
              />
              <text
                x={x + w / 2}
                y={309}
                textAnchor="middle"
                fill="rgba(245,243,240,0.82)"
                fontSize="10.5"
              >
                {label}
              </text>
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}
