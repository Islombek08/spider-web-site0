import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cityBg from "@/assets/cyberpunk-city.jpg";
import spiderHero from "@/assets/spider-hero.png";

const cinematicTexts = [
  { text: "WELCOME TO THE SPIDER WORLD", delay: 0.5 },
  { text: "ENTER THE MULTIVERSE", delay: 2.5 },
  { text: "BEYOND THE CODE", delay: 4.5 },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-[120vh] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <img
          src={cityBg}
          alt="Cyberpunk city"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.6) saturate(1.3)" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, hsl(230 50% 5% / 0.4) 0%, transparent 30%, hsl(230 50% 5% / 0.8) 80%, hsl(230 50% 5%) 100%)"
        }} />
      </motion.div>

      {/* Scan lines */}
      <div className="scanline-overlay absolute inset-0 z-10" />

      {/* Grid overlay */}
      <div className="cyber-grid absolute inset-0 z-10 opacity-30" />

      {/* Hero character */}
      <motion.div
        className="absolute bottom-0 right-[10%] z-20 w-[400px] md:w-[500px]"
        style={{ scale: heroScale }}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.8 }}
      >
        <motion.img
          src={spiderHero}
          alt="Cyberpunk Spider Hero"
          className="w-full drop-shadow-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 30px hsl(187 100% 50% / 0.3))" }}
        />
      </motion.div>

      {/* Main title content */}
      <motion.div
        className="relative z-30 flex h-screen flex-col items-start justify-center px-8 md:px-20"
        style={{ opacity: textOpacity }}
      >
        {/* Cinematic text reveals */}
        {cinematicTexts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 1, 
              delay: item.delay,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className={`mb-2 ${index === 0 ? "" : "ml-8"}`}
          >
            {index === 0 ? (
              <h1 className="font-display text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
                <span className="neon-text-blue glitch-text" data-text="SPIDER">SPIDER</span>
                <br />
                <span className="neon-text-red">VERSE</span>
                <span className="ml-4 text-2xl font-light tracking-[0.5em] text-muted-foreground md:text-3xl">
                  //2077
                </span>
              </h1>
            ) : (
              <p className={`font-display text-lg tracking-[0.3em] md:text-xl ${
                index === 1 ? "neon-text-purple" : "text-muted-foreground"
              }`}>
                {item.text}
              </p>
            )}
          </motion.div>
        ))}

        {/* CTA-like decorative element */}
        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 0.8 }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-neon-blue" />
          <span className="font-display text-xs tracking-[0.5em] text-muted-foreground animate-pulse-neon">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="hsl(187, 100%, 50%)" strokeWidth="1" opacity="0.5" />
              <motion.circle
                cx="8" cy="8" r="2"
                fill="hsl(187, 100%, 50%)"
                animate={{ cy: [8, 16, 8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute left-6 top-24 z-30 h-20 w-20 border-l-2 border-t-2 border-neon-blue/30" />
      <div className="absolute right-6 bottom-20 z-30 h-20 w-20 border-b-2 border-r-2 border-neon-red/30" />
    </section>
  );
};

export default HeroSection;
