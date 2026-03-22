import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import hexPattern from "@/assets/hex-pattern.png";

const dimensions = [
  {
    id: "earth-2077",
    name: "EARTH-2077",
    subtitle: "Neon Genesis",
    description: "A world where cybernetic enhancement is the norm. Spider-heroes patrol the digital skyline.",
    threat: "CRITICAL",
    status: "ACTIVE",
  },
  {
    id: "earth-616X",
    name: "EARTH-616X",
    subtitle: "Chrome Domain",
    description: "Reality fractured by the Convergence Event. Time flows in recursive loops.",
    threat: "UNSTABLE",
    status: "SCANNING",
  },
  {
    id: "earth-NOIR",
    name: "EARTH-NOIR",
    subtitle: "Shadow Protocol",
    description: "Perpetual darkness. The last Spider operates from the underground resistance.",
    threat: "HIGH",
    status: "MONITORING",
  },
];

const MultiverseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDimension, setActiveDimension] = useState(dimensions[0].id);

  const active = dimensions.find((d) => d.id === activeDimension)!;

  return (
    <section id="multiverse" ref={ref} className="relative min-h-screen py-32 px-8 md:px-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <img src={hexPattern} alt="" className="h-full w-full object-cover" style={{ filter: "hue-rotate(30deg)" }} />
      </div>

      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-neon-purple" />
          <span className="font-display text-xs tracking-[0.5em] text-neon-purple">SECTION 03</span>
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight md:text-6xl neon-text-purple">
          MULTIVERSE
        </h2>
        <p className="mt-4 max-w-lg font-body text-lg text-muted-foreground">
          Dimensional breach detected. Multiple realities converging at this nexus point.
        </p>
      </motion.div>

      {/* Dimension selector */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: dimension list */}
        <div className="space-y-4">
          {dimensions.map((dim, index) => (
            <motion.button
              key={dim.id}
              className={`w-full text-left glass-panel rounded-lg p-6 transition-all ${
                activeDimension === dim.id ? "neon-border-blue" : "border-transparent"
              }`}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15 }}
              onClick={() => setActiveDimension(dim.id)}
              whileHover={{ x: 8 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-lg font-bold tracking-wider neon-text-blue">
                  {dim.name}
                </h3>
                <span className={`font-display text-xs px-3 py-1 rounded-full ${
                  dim.threat === "CRITICAL" 
                    ? "bg-neon-red/20 text-neon-red" 
                    : dim.threat === "UNSTABLE"
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "bg-neon-blue/20 text-neon-blue"
                }`}>
                  {dim.threat}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground">{dim.subtitle}</p>
            </motion.button>
          ))}
        </div>

        {/* Right: active dimension detail */}
        <motion.div
          key={activeDimension}
          className="glass-panel rounded-lg p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Scan lines */}
          <div className="scanline-overlay absolute inset-0 z-0" />

          <div className="relative z-10">
            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                className="h-2 w-2 rounded-full bg-neon-blue"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-display text-xs tracking-widest text-neon-blue">
                {active.status}
              </span>
            </div>

            <h3 className="font-display text-3xl font-black neon-text-blue mb-2">
              {active.name}
            </h3>
            <p className="font-display text-sm tracking-widest neon-text-purple mb-6">
              {active.subtitle}
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              {active.description}
            </p>

            {/* Fake data readout */}
            <div className="space-y-3">
              {["STABILITY", "CONNECTIVITY", "THREAT LEVEL"].map((label, i) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-display text-xs tracking-wider text-muted-foreground">{label}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <motion.div
                        key={j}
                        className="h-3 w-1 rounded-full"
                        style={{
                          background: j < (7 - i * 2) 
                            ? "hsl(187, 100%, 50%)" 
                            : "hsl(230, 30%, 20%)",
                        }}
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: 0.8 + j * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 h-10 w-10 border-l-2 border-t-2 border-neon-purple/40" />
          <div className="absolute bottom-0 right-0 h-10 w-10 border-r-2 border-b-2 border-neon-purple/40" />
        </motion.div>
      </div>
    </section>
  );
};

export default MultiverseSection;
