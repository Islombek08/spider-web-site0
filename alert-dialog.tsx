import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SpiderCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const springX = useSpring(0, { stiffness: 300, damping: 28 });
  const springY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);

      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-6);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [springX, springY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Web trail */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full bg-neon-blue"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4,
            height: 4,
            opacity: (i + 1) / trail.length * 0.3,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Main cursor - spider icon */}
      <motion.div
        className="absolute"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-3 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(187 100% 50% / 0.3), transparent 70%)",
          }}
          animate={{ scale: isClicking ? 1.8 : 1, opacity: isClicking ? 0.8 : 0.4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />
        
        {/* Spider body */}
        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ scale: isClicking ? 0.7 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          style={{ filter: "drop-shadow(0 0 8px hsl(187 100% 50% / 0.8))" }}
        >
          {/* Spider body */}
          <ellipse cx="12" cy="12" rx="3" ry="4" fill="hsl(348, 100%, 55%)" />
          <ellipse cx="12" cy="8" rx="2.5" ry="2.5" fill="hsl(348, 100%, 55%)" />
          {/* Eyes */}
          <ellipse cx="10.8" cy="7.5" rx="1" ry="1.2" fill="white" />
          <ellipse cx="13.2" cy="7.5" rx="1" ry="1.2" fill="white" />
          {/* Legs */}
          <path d="M9 9 L3 4" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 11 L2 10" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 13 L3 17" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 14 L4 20" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15 9 L21 4" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15 11 L22 10" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15 13 L21 17" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15 14 L20 20" stroke="hsl(187, 100%, 50%)" strokeWidth="1.2" strokeLinecap="round" />
        </motion.svg>

        {/* Click web burst */}
        {isClicking && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="20"
                  y1="20"
                  x2={20 + Math.cos((angle * Math.PI) / 180) * 18}
                  y2={20 + Math.sin((angle * Math.PI) / 180) * 18}
                  stroke="hsl(187, 100%, 50%)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              ))}
            </svg>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SpiderCursor;
