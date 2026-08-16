import { ImageResponse } from "next/og";

export const alt = "Jonas Knüppel — Co-Founder, Managing Director & CTO at Kernscale";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
          padding: "76px 82px",
          background:
            "radial-gradient(circle at 72% 18%, rgba(64, 113, 190, 0.28), transparent 34%), #020612",
          color: "#f4f1ec",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "rgba(244, 241, 236, 0.58)",
            fontSize: 25,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          jonasknppel.me
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            Jonas Knüppel
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(244, 241, 236, 0.72)",
              fontSize: 31,
              letterSpacing: "-0.01em",
            }}
          >
            Co-Founder, Managing Director & CTO at Kernscale
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(244, 241, 236, 0.48)",
            fontSize: 23,
          }}
        >
          <span>product · technology · media intelligence</span>
          <span>kernscale.de</span>
        </div>
      </div>
    ),
    size,
  );
}
