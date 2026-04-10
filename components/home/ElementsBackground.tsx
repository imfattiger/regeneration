"use client";

export default function ElementsBackground() {
  return (
    <>
      <style>{`
        @keyframes water-drift {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(110vw); }
        }
        @keyframes wind-rise {
          0%   { transform: translateY(0px);   opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(-60px); opacity: 0; }
        }
        @keyframes fire-flicker {
          0%, 100% { opacity: 0; }
          40%, 60%  { opacity: 1; }
        }
        @keyframes earth-sweep {
          0%   { transform: translateX(110vw); }
          100% { transform: translateX(-120%); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* 水 — 細橫線往右漂 */}
        {[15, 32, 50, 66, 82].map((top, i) => (
          <div
            key={`w${i}`}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0,
              width: "35%",
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              animation: `water-drift ${20 + i * 5}s linear infinite`,
              animationDelay: `${i * 4}s`,
            }}
          />
        ))}

        {/* 風 — 圓點緩慢上升 */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`a${i}`}
            style={{
              position: "absolute",
              left: `${5 + (i % 7) * 14}%`,
              top: `${50 + Math.floor(i / 7) * 30}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              opacity: 0,
              animation: `wind-rise ${15 + (i % 5) * 3}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}

        {/* 火 — 光點閃爍 */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`f${i}`}
            style={{
              position: "absolute",
              left: `${10 + i * 9}%`,
              top: `${20 + (i % 4) * 18}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              opacity: 0,
              animation: `fire-flicker ${4 + (i % 4) * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        {/* 土 — 寬線反向掃，比水更粗更慢 */}
        {[25, 75].map((top, i) => (
          <div
            key={`e${i}`}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0,
              width: "55%",
              height: "3px",
              background: "rgba(255,255,255,0.07)",
              animation: `earth-sweep ${35 + i * 10}s linear infinite`,
              animationDelay: `${i * 10}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
