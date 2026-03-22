import { useState, useCallback } from "react";
import SpiderCursor from "@/components/SpiderCursor";
import CyberNav from "@/components/CyberNav";
import HeroSection from "@/components/HeroSection";
import AbilitiesSection from "@/components/AbilitiesSection";
import MultiverseSection from "@/components/MultiverseSection";
import TechSection from "@/components/TechSection";
import WebTransition from "@/components/WebTransition";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = useCallback((section: string) => {
    setIsTransitioning(true);
    setActiveSection(section);

    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => setIsTransitioning(false), 300);
    }, 400);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SpiderCursor />
      <CyberNav activeSection={activeSection} onNavigate={handleNavigate} />
      <WebTransition isActive={isTransitioning} />

      <main>
        <HeroSection />
        <AbilitiesSection />
        <MultiverseSection />
        <TechSection />
      </main>
    </div>
  );
};

export default Index;
