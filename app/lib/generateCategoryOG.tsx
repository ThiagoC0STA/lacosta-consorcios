import { ImageResponse } from "next/og";

interface OGParams {
  name: string;
  shortName: string;
  heroAccent: string;
  avgSaving: string;
  accent: string;
  accentLight: string;
}

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function generateCategoryOG(params: OGParams) {
  const { name, heroAccent, avgSaving, accent, accentLight } = params;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          backgroundColor: "#021D40",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: `linear-gradient(90deg, ${accent}, ${accentLight})`,
            display: "flex",
          }}
        />

        {/* Lacosta logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffffB3",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            LACOSTA CONSÓRCIOS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 14px",
              borderRadius: 20,
              backgroundColor: "#0A2E5C",
              border: `1px solid ${accent}`,
            }}
          >
            <span style={{ fontSize: 14, color: accentLight, fontWeight: 600 }}>
              Parceiros Servopa & Rodobens
            </span>
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: accent,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {heroAccent}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 28px",
              borderRadius: 16,
              backgroundColor: "#0A2E5C",
              border: "1px solid #1A3E6C",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, color: accent }}>
              {avgSaving}
            </span>
            <span style={{ fontSize: 15, color: "#ffffff99", marginTop: 2 }}>
              economia média
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 28px",
              borderRadius: 16,
              backgroundColor: "#0A2E5C",
              border: "1px solid #1A3E6C",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, color: "white" }}>
              100%
            </span>
            <span style={{ fontSize: 15, color: "#ffffff99", marginTop: 2 }}>
              sem juros
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 28px",
              borderRadius: 16,
              backgroundColor: "#0A2E5C",
              border: "1px solid #1A3E6C",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, color: "white" }}>
              +5.000
            </span>
            <span style={{ fontSize: 15, color: "#ffffff99", marginTop: 2 }}>
              clientes satisfeitos
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 32px",
              borderRadius: 40,
              backgroundColor: accent,
              fontSize: 18,
              fontWeight: 700,
              color: "white",
            }}
          >
            Simule Grátis
          </div>
          <span style={{ fontSize: 16, color: "#ffffff80" }}>
            lacostaconsorcios.com.br
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
