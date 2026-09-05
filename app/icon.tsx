import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0c 0%, #1b1740 100%)",
          color: "#b7aeff",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: -1,
          borderRadius: 14,
        }}
      >
        BA
      </div>
    ),
    { ...size },
  );
}
