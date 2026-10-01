import { motion } from "motion/react";

/** ستارة حريرية مصبوغة بالزيتوني تنكشف عن الصفحة */
export function SilkReveal() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.05 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full"
          style={{
            width: "25.2%",
            left: `${i * 25}%`,
            background:
              i % 2 === 0
                ? "linear-gradient(180deg, oklch(0.535 0.069 115), oklch(0.45 0.06 118))"
                : "linear-gradient(180deg, oklch(0.49 0.062 116), oklch(0.4 0.055 120))",
          }}
          initial={{ y: 0 }}
          animate={{ y: "-102%" }}
          transition={{ duration: 1.05, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
        />
      ))}
    </motion.div>
  );
}
