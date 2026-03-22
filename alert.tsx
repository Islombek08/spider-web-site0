import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techItems = [
  { label: "NEURAL LINK", value: "v4.7.2", status: "online" },
  { label: "WEB SYNTHESIZER", value: "QUANTUM", status: "online" },
  { label: "DIMENSION SCANNER", value: "12 ACTIVE", status: "warning" },
  { label: "SUIT INTEGRITY", value: "97.3%", status: "online" },
  { label: "AI COMPANION", value: "ARIA", status: "online" },
  { label: "STEALTH MODE", value: "STANDBY", status: "idle" },
];

const TechSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech" ref={ref} className="relative min-h-screen py-32 px-8 md:px-20">
      <div className="cyber-grid absolute inset-0 opacity-15" />

      {/* Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-neon-blue" />
          <span className="font-display text-xs tracking-[0.5em] text-neon-blue">SECTION 04</span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight md:text-6xl neon-text-red">
          TECH SPECS
        </h2>
      </motion.div>

      {/* Terminal-style readout */}
      <motion.div
        className="glass-panel rounded-lg p-8 max-w-4xl relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <div className="scanline-overlay absolute inset-0" />

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <div className="h-3 w-3 rounded-full bg-neon-red" />
          <div className="h-3 w-3 rounded-full bg-accent opacity-50" />
          <div className="h-3 w-3 rounded-full bg-neon-blue" />
          <span className="ml-4 font-display text-xs tracking-widest text-muted-foreground">
            SPIDER-TECH DIAGNOSTICS v2077.4
          </span>
        </div>

        {/* Tech items */}
        <div className="space-y-4 relative z-10">
          {techItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between border-b border-border/30 pb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`h-2 w-2 rounded-full ${
                    item.status === "online" ? "bg-neon-blue" : 
                    item.status === "warning" ? "bg-neon-red" : "bg-muted-foreground"
                  }`}
                  animate={item.status === "online" ? { opacity: [1, 0.4, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-display text-sm tracking-wider text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className={`font-display text-sm font-bold tracking-wider ${
                item.status === "online" ? "neon-text-blue" : 
                item.status === "warning" ? "neon-text-red" : "text-muted-foreground"
              }`}>
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Blinking cursor */}
        <motion.div
          className="mt-6 flex items-center gap-2 relative z-10"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="font-display text-xs text-neon-blue">&gt;_</span>
          <span className="font-display text-xs text-muted-foreground">READY</span>
        </motion.div>

        {/* Corners */}
        <div className="absolute top-0 right-0 h-8 w-8 border-r-2 border-t-2 border-neon-red/30" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-l-2 border-b-2 border-neon-blue/30" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-32 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent mb-6" />
        <p className="font-display text-xs tracking-[0.5em] text-muted-foreground">
          SPIDER//VERSE 2077 — ALL DIMENSIONS RESERVED
        </p>
      </motion.div>
    </section>
  );
};

export default TechSection;
