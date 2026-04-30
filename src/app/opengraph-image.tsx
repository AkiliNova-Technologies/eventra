import { ImageResponse } from "next/og";

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
          width: "1200px",
          height: "630px",
          background: "#0B0F14",
          color: "#F9FAFB",
          display: "flex",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-120px",
            width: "460px",
            height: "460px",
            borderRadius: "460px",
            background: "rgba(139,92,246,0.28)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-120px",
            width: "460px",
            height: "460px",
            borderRadius: "460px",
            background: "rgba(168,85,247,0.18)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "180px",
            width: "220px",
            height: "220px",
            borderRadius: "220px",
            background: "rgba(236,72,153,0.12)",
            filter: "blur(4px)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.12), transparent 45%, rgba(255,255,255,0.04))",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "44px",
                fontWeight: 900,
                color: "#FFFFFF",
                boxShadow: "0 20px 60px rgba(139,92,246,0.35)",
              }}
            >
              E
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "36px",
                  fontWeight: 850,
                  color: "#FFFFFF",
                  letterSpacing: "-1px",
                }}
              >
                Eventra
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: "20px",
                  color: "#A78BFA",
                }}
              >
                Event Management SaaS Platform
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: "-4px",
                maxWidth: "900px",
                color: "#FFFFFF",
              }}
            >
              Create, sell, and manage unforgettable events.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "28px",
                fontSize: "25px",
                lineHeight: 1.45,
                color: "#CBD5E1",
                maxWidth: "850px",
              }}
            >
              Discover events, sell tickets, manage attendees, track revenue,
              and power organizer workflows from one premium dashboard.
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            {[
              "Smart Ticketing",
              "Attendee Management",
              "Revenue Tracking",
              "Organizer Dashboard",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid rgba(167,139,250,0.26)",
                  background: "rgba(139,92,246,0.12)",
                  borderRadius: "999px",
                  padding: "12px 20px",
                  fontSize: "18px",
                  color: "#F9FAFB",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}