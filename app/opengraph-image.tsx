import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Computer Science & Mathematics, NYU Courant`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0c",
          backgroundImage:
            "radial-gradient(60% 55% at 22% 18%, #2c2270 0%, transparent 62%), radial-gradient(55% 50% at 92% 96%, #10406e 0%, transparent 60%)",
          color: "#f5f3f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#b7aeff",
          }}
        >
          begadalymany.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 108, letterSpacing: -3 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a3a1ad",
              maxWidth: 900,
            }}
          >
            Computer Science &amp; Mathematics at NYU Courant · Founder of
            Acronix and Medarix · Previously AI Engineering at Transcard
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontSize: 24,
            color: "#6f6d7a",
          }}
        >
          <div style={{ display: "flex", width: 56, height: 2, background: "#8b7cff" }} />
          Class of 2028
        </div>
      </div>
    ),
    { ...size },
  );
}
