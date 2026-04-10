"use client";

export default function ElementsBackground() {
  return (
    <>
      <style>{`
        /* 水 — 細橫線從左往右緩慢飄移 */
        @keyframes water-drift {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        /* 風 — 圓點緩慢上升並淡出 */
        @keyframes wind-rise {
          0%   { transform: translateY(0);     opacity: 0; }
          20%  { opacity: 0.06; }
          80%  { opacity: 0.06; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
        /* 火 — 光點閃爍 */
        @keyframes fire-flicker {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.08; }
        }
        /* 土 — 寬橫線反向極慢掃過 */
        @keyframes earth-sweep {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
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
        {/* 水 — 5 條細線 */}
        {[18, 35, 52, 68, 83].map((top, i) => (
          <div
            key={`w${i}`}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0,
              width: "40%",
              height: "1px",
              borderBottom: "1px solid currentColor",
              opacity: 0.05,
              animation: `water-drift ${22 + i * 4}s linear infinite`,
              animationDelay: `${i * 4.5}s`,
            }}
          />
        ))}

        {/* 風 — 圓點陣 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`a${i}`}
            style={{
              position: "absolute",
              left: `${8 + (i % 6) * 16}%`,
              top: `${20 + Math.floor(i / 6) * 40}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "currentColor",
              opacity: 0,
              animation: `wind-rise ${18 + (i % 4) * 3}s ease-in-out infinite`,
              animationDelay: `${i * 1.8}s`,
            }}
          />
        ))}

        {/* 火 — 光點閃爍 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`f${i}`}
            style={{
              position: "absolute",
              left: `${12 + i * 11}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: 1.5,
              height: 1.5,
              borderRadius: "50%",
              background: "currentColor",
              opacity: 0,
              animation: `fire-flicker ${6 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}

        {/* 土 — 2 條寬掃線，反向 */}
        {[28, 72].map((top, i) => (
          <div
            key={`e${i}`}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0,
              width: "60%",
              height: "1px",
              borderBottom: "1px solid currentColor",
              opacity: 0.04,
              animation: `earth-sweep ${38 + i * 8}s linear infinite`,
              animationDelay: `${i * 12}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
