"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const W = 640;
const NODE_W = 100;
const NODE_H = 68;
const GAP = 24;
const Y = 112;

type Node = {
  lines: string[];
  kind: "deterministic" | "model" | "gate";
};

const NODES: Node[] = [
  { lines: ["Denial", "packet"], kind: "deterministic" },
  { lines: ["Deterministic", "parse"], kind: "deterministic" },
  { lines: ["LLM-drafted", "appeal"], kind: "model" },
  { lines: ["Physician", "sign-off"], kind: "gate" },
  { lines: ["Submit to", "payer"], kind: "deterministic" },
];

// 5 nodes + 4 gaps = 596 units, centred in the 640-unit frame.
const xOf = (i: number) => 22 + i * (NODE_W + GAP);

const STROKE: Record<Node["kind"], string> = {
  deterministic: "rgba(255,255,255,0.18)",
  model: "rgba(79,168,255,0.55)",
  gate: "rgba(79,168,255,0.95)",
};

const FILL: Record<Node["kind"], string> = {
  deterministic: "rgba(255,255,255,0.045)",
  model: "rgba(79,168,255,0.08)",
  gate: "rgba(79,168,255,0.16)",
};

/**
 * Medarix: a constrained state machine. Deterministic on the way in, a model
 * only where language is the work, and one hard human gate before anything
 * leaves the compliance boundary.
 */
export default function MedarixDiagram() {

  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: {
      pathLength: { duration: 0.7, delay, ease: EASE },
      opacity: { duration: 0.2, delay },
    },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <svg
      viewBox={`0 0 ${W} 300`}
      className="font-mono h-auto w-full"
      role="img"
      aria-labelledby="medarix-diagram-title medarix-diagram-desc"
    >
      <title id="medarix-diagram-title">
        Medarix appeal pipeline architecture diagram
      </title>
      <desc id="medarix-diagram-desc">
        A left-to-right pipeline inside an Azure AI Foundry compliance
        boundary: a denial packet is parsed deterministically, an appeal is
        drafted by a language model, a physician must sign off, and only then
        is the appeal submitted to the payer. A rejected draft loops back to
        the drafting step.
      </desc>

      {/* Compliance boundary */}
      <motion.g {...fade(0)}>
        <rect
          x={6}
          y={54}
          width={W - 12}
          height={200}
          rx={18}
          fill="rgba(79,168,255,0.03)"
          stroke="rgba(79,168,255,0.32)"
          strokeDasharray="6 6"
        />
        <text x={24} y={40} fill="rgba(79,168,255,0.85)" fontSize="11">
          Azure AI Foundry compliance boundary
        </text>
        <text
          x={W - 24}
          y={40}
          textAnchor="end"
          fill="rgba(245,243,240,0.4)"
          fontSize="11"
        >
          HIPAA
        </text>
      </motion.g>

      {/* Connectors */}
      {NODES.slice(0, -1).map((_, i) => (
        <motion.path
          key={`edge-${i}`}
          d={`M${xOf(i) + NODE_W} ${Y + NODE_H / 2} H ${xOf(i + 1) - 6}`}
          stroke={i === 2 ? "rgba(79,168,255,0.8)" : "rgba(255,255,255,0.3)"}
          strokeWidth="1.25"
          fill="none"
          markerEnd=""
          {...draw(0.18 + i * 0.12)}
        />
      ))}
      {NODES.slice(0, -1).map((_, i) => (
        <motion.path
          key={`tip-${i}`}
          d={`M${xOf(i + 1) - 11} ${Y + NODE_H / 2 - 4} l 5 4 l -5 4`}
          stroke={i === 2 ? "rgba(79,168,255,0.8)" : "rgba(255,255,255,0.3)"}
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...fade(0.4 + i * 0.12)}
        />
      ))}

      {/* Rejection loop: the gate can always send a draft back. */}
      <motion.path
        d={`M${xOf(3) + NODE_W / 2} ${Y + NODE_H} V 214 H ${
          xOf(2) + NODE_W / 2
        } V ${Y + NODE_H}`}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.25"
        strokeDasharray="4 5"
        fill="none"
        {...draw(0.9)}
      />
      <motion.text
        x={(xOf(2) + xOf(3) + NODE_W) / 2}
        y={232}
        textAnchor="middle"
        fill="rgba(245,243,240,0.42)"
        fontSize="10.5"
        {...fade(1)}
      >
        rejected → redraft
      </motion.text>

      {/* Nodes */}
      {NODES.map((n, i) => (
        <motion.g key={i} {...fade(0.1 + i * 0.1)}>
          <rect
            x={xOf(i)}
            y={Y}
            width={NODE_W}
            height={NODE_H}
            rx={12}
            fill={FILL[n.kind]}
            stroke={STROKE[n.kind]}
            strokeWidth={n.kind === "gate" ? 1.5 : 1}
          />
          {n.kind === "gate" ? (
            <g>
              <rect
                x={xOf(i)}
                y={Y}
                width={NODE_W}
                height={NODE_H}
                rx={12}
                fill="none"
                stroke="#4fa8ff"
                strokeOpacity="0.35"
                strokeWidth="6"
              />
              <text
                x={xOf(i) + NODE_W / 2}
                y={Y - 12}
                textAnchor="middle"
                fill="#4fa8ff"
                fontSize="10.5"
              >
                required gate
              </text>
            </g>
          ) : null}
          {n.lines.map((line, k) => (
            <text
              key={line}
              x={xOf(i) + NODE_W / 2}
              y={Y + 30 + k * 16}
              textAnchor="middle"
              fill={
                n.kind === "gate" ? "#dbeaff" : "rgba(245,243,240,0.82)"
              }
              fontSize="11"
            >
              {line}
            </text>
          ))}
        </motion.g>
      ))}

      {/* Legend */}
      <motion.g {...fade(1.1)}>
        <line
          x1={26}
          y1={278}
          x2={50}
          y2={278}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.25"
        />
        <text x={58} y={282} fill="rgba(245,243,240,0.45)" fontSize="10.5">
          deterministic
        </text>
        <line
          x1={186}
          y1={278}
          x2={210}
          y2={278}
          stroke="rgba(79,168,255,0.8)"
          strokeWidth="1.25"
        />
        <text x={218} y={282} fill="rgba(245,243,240,0.45)" fontSize="10.5">
          model-generated
        </text>
        <rect
          x={366}
          y={272}
          width={24}
          height={12}
          rx={4}
          fill="rgba(79,168,255,0.16)"
          stroke="#4fa8ff"
          strokeOpacity="0.9"
        />
        <text x={398} y={282} fill="rgba(245,243,240,0.45)" fontSize="10.5">
          human decision
        </text>
      </motion.g>
    </svg>
  );
}
