import { motion, useScroll, useTransform } from "motion/react";

type P = { x: number; delay: number; size: number; kind: "leaf" | "pearl" | "cone"; dur: number };

const PARTICLES: P[] = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 6.4 + (i % 3) * 9) % 96,
  delay: (i % 8) * 1.4,
  size: 10 + (i % 4) * 7,
  kind: i % 3 === 0 ? "pearl" : i % 3 === 1 ? "leaf" : "cone",
  dur: 16 + (i % 5) * 4,
}));

function Shape({ kind, size }: { kind: P["kind"]; size: number }) {
  if (kind === "pearl") {
    return (
      <span
        className="block rounded-full bg-gold/50"
        style={{ width: size * 0.45, height: size * 0.45, boxShadow: "0 0 12px currentColor" }}
      />
    );
  }
  if (kind === "cone") {
    return (
      <svg width={size * 0.6} height={size} viewBox="0 0 12 24" fill="none">
        <path
          d="M6 1c2.5 5 4.5 10 4.5 14.5A4.5 4.5 0 0 1 6 23a4.5 4.5 0 0 1-4.5-7.5C1.5 11 3.5 6 6 1Z"
          stroke="currentColor"
          strokeWidth="0.9"
          className="text-primary/45"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c6 3 9 7 9 11s-3 9-9 9-9-5-9-9 3-8 9-11Z"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-secondary/45"
      />
      <path d="M12 4v16" stroke="currentColor" strokeWidth="0.6" className="text-secondary/35" />
    </svg>
  );
}

export function FloatingParticles() {
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <motion.div
      aria-hidden
      style={{ y: drift }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: "108%" }}
          animate={{
            y: ["0vh", "-125vh"],
            x: [0, i % 2 ? 40 : -40, 0],
            rotate: [0, i % 2 ? 180 : -180],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.15, 0.8, 1],
          }}
        >
          <Shape kind={p.kind} size={p.size} />
        </motion.div>
      ))}
    </motion.div>
  );
}
