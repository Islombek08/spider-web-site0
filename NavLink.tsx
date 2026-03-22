import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const abilities = [
  {
    title: "WEB SLINGING",
    description: "Quantum-enhanced web fluid traverses dimensions, creating bridges across the multiverse fabric.",
    icon: "🕸️",
    color: "neon-text-blue",
    stat: 98,
  },
  {
    title: "SPIDER SENSE",
    description: "Neural augmentation provides 360° threat detection with predictive analysis capabilities.",
    icon: "⚡",
    color: "neon-text-red",
    stat: 95,
  },
  {
    title: "WALL CRAWLING",
    description: "Nano-fiber adhesion pads enable traversal of any surface, including energy barriers.",
    icon: "🧬",
    color: "neon-text-purple",
    stat: 100,
  },
  {
    title: "CYBER VISION",
    description: "Augmented reality overlay with real-time data streams and threat classification.",
    icon: "👁️",
    color: "neon-text-blue",
    stat: 92,
  },
];

const AbilitiesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="abilities" ref={ref} className="relative min-h-screen py-32 px-8 md:px-20">
      {/* Background */}
      <div className="cyber-grid absolute inset-0 opacity-20" />

      {/* Section header */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-neon-red" />
          <span className="font-display text-xs tracking-[0.5em] text-neon-red">
            SECTION 02
          </span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight md:text-6xl neon-text-blue">
          ABILITIES
        </h2>
        <p className="mt-4 max-w-lg font-body text-lg text-muted-foreground">
          Enhanced beyond human limits. Augmented with cybernetic technology from across dimensions.
        </p>
      </motion.div>

      {/* Abilities grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {abilities.map((ability, index) => (
          <motion.div
            key={ability.title}
            className="group relative glass-panel rounded-lg p-6 overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: index % 2 === 0 
                  ? "radial-gradient(circle at 50% 0%, hsl(187 100% 50% / 0.1), transparent 70%)"
                  : "radial-gradient(circle at 50% 0%, hsl(348 100% 55% / 0.1), transparent 70%)",
              }}
            />

            {/* Icon */}
            <div className="mb-4 text-4xl">{ability.icon}</div>

            {/* Title */}
            <h3 className={`font-display text-sm font-bold tracking-widest mb-3 ${ability.color}`}>
              {ability.title}
            </h3>

            {/* Description */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              {ability.description}
            </p>

            {/* Stat bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-display text-xs">
                <span className="text-muted-foreground">POWER</span>
                <span className={ability.color}>{ability.stat}%</span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: index % 2 === 0
                      ? "linear-gradient(90deg, hsl(187, 100%, 50%), hsl(270, 100%, 77%))"
                      : "linear-gradient(90deg, hsl(348, 100%, 55%), hsl(270, 100%, 77%))",
                  }}
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${ability.stat}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.5 + index * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-0 right-0 h-6 w-6 border-r border-t border-neon-blue/20" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-l border-b border-neon-red/20" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AbilitiesSection;
