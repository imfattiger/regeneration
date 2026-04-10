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
          15%  { opacity: 0.18; }
          85%  { opacity: 0.18; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
        @keyframes fire-pulse {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.25; }
        }
        @keyframes earth-sink {
          0%   { transform: translateY(0px);   opacity: 0; }
          15%  { opacity: 0.15; }
          85%  { opacity: 0.15; }
          100% { transform: translateY(60px);  opacity: 0; }
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
        {/* 水（瀾）— 細橫線往右漂 */}
        {[20, 45, 72].map((top, i) => (
          <div
            key={`w${i}`}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: 0,
              width: "40%",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              animation: `water-drift ${22 + i * 6}s linear infinite`,
              animationDelay: `${i * 7}s`,
            }}
          />
        ))}

        {/* 風（嵐）— 圓點緩慢上升消失 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`a${i}`}
            style={{
              position: "absolute",
              left: `${8 + (i % 4) * 23}%`,
              top: `${55 + Math.floor(i / 4) * 25}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255,255,255,1)",
              opacity: 0,
              animation: `wind-rise ${14 + (i % 4) * 4}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}

        {/* 火（然）— 原地脈動，不移動 */}
        {[
          { left: 15, top: 25 },
          { left: 33, top: 60 },
          { left: 52, top: 38 },
          { left: 68, top: 72 },
          { left: 80, top: 20 },
          { left: 91, top: 50 },
        ].map((pos, i) => (
          <div
            key={`f${i}`}
            style={{
              position: "absolute",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "rgba(255,255,255,1)",
              opacity: 0,
              animation: `fire-pulse ${3 + (i % 3) * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}

        {/* 土（苒）— 圓點緩慢向下沉降（與風方向相反） */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`e${i}`}
            style={{
              position: "absolute",
              left: `${12 + (i % 4) * 22}%`,
              top: `${10 + Math.floor(i / 4) * 20}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255,255,255,1)",
              opacity: 0,
              animation: `earth-sink ${18 + (i % 4) * 4}s ease-in-out infinite`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
