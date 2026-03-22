import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CyberNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "hero", label: "ORIGIN" },
  { id: "abilities", label: "ABILITIES" },
  { id: "multiverse", label: "MULTIVERSE" },
  { id: "tech", label: "TECH" },
];

const CyberNav = ({ activeSection, onNavigate }: CyberNavProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [webShoot, setWebShoot] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setWebShoot(id);
    setTimeout(() => {
      onNavigate(id);
      setWebShoot(null);
    }, 600);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-panel px-8 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon
              points="18,2 34,18 18,34 2,18"
              stroke="hsl(187, 100%, 50%)"
              strokeWidth="2"
              fill="none"
              filter="drop-shadow(0 0 6px hsl(187 100% 50% / 0.5))"
            />
            <circle cx="18" cy="18" r="4" fill="hsl(348, 100%, 55%)" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={angle}
                x1="18"
                y1="18"
                x2={18 + Math.cos((angle * Math.PI) / 180) * 12}
                y2={18 + Math.sin((angle * Math.PI) / 180) * 12}
                stroke="hsl(187, 100%, 50%)"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}
          </svg>
          <span className="font-display text-lg font-bold tracking-widest neon-text-blue">
            SPIDER//VERSE
          </span>
        </motion.div>

        {/* Nav items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className="relative px-5 py-2 font-display text-sm font-medium tracking-wider text-muted-foreground transition-colors"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleClick(item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active / hover indicator */}
              <AnimatePresence>
                {(hoveredItem === item.id || activeSection === item.id) && (
                  <motion.div
                    className="absolute inset-0 rounded-md border neon-border-blue"
                    style={{ background: "hsl(187 100% 50% / 0.08)" }}
                    layoutId="navHighlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* Web shoot animation */}
              <AnimatePresence>
                {webShoot === item.id && (
                  <motion.div
                    className="absolute left-1/2 -bottom-8"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      width: 2, 
                      height: 40, 
                      background: "hsl(187, 100%, 50%)",
                      transformOrigin: "top",
                      filter: "drop-shadow(0 0 4px hsl(187 100% 50% / 0.8))",
                    }}
                  />
                )}
              </AnimatePresence>

              <span className={`relative z-10 ${activeSection === item.id ? "neon-text-blue" : ""}`}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default CyberNav;
