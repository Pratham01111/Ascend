"use client";

import { useSpecInfo } from "./PlayerProvider";

const ORBS = [
  { top: "-10%", left: "8%", size: 620, dx: "80px", dy: "-50px", duration: "38s", delay: "0s", opacity: 0.28 },
  { top: "55%", left: "78%", size: 720, dx: "-70px", dy: "60px", duration: "46s", delay: "-8s", opacity: 0.22 },
  { top: "78%", left: "18%", size: 520, dx: "50px", dy: "40px", duration: "34s", delay: "-16s", opacity: 0.2 },
];

export default function AmbientBackground() {
  const spec = useSpecInfo();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="ambient-orb absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle,${spec.accent} 0%,transparent 70%)`,
            opacity: orb.opacity,
            filter: "blur(60px)",
            transition: "background 1.2s ease",
            animation: `ambientDrift ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay,
            ["--drift-x" as string]: orb.dx,
            ["--drift-y" as string]: orb.dy,
          }}
        />
      ))}
    </div>
  );
}
