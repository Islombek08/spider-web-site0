import { motion, AnimatePresence } from "framer-motion";

interface WebTransitionProps {
  isActive: boolean;
}

const WebTransition = ({ isActive }: WebTransitionProps) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Web lines radiating from center */}
          <svg className="absolute inset-0 w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const endX = 50 + Math.cos(angle) * 70;
              const endY = 50 + Math.sin(angle) * 70;
              return (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="hsl(187, 100%, 50%)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                />
              );
            })}
            {/* Concentric circles */}
            {[15, 30, 45].map((r, i) => (
              <motion.circle
                key={r}
                cx="50%"
                cy="50%"
                r={`${r}%`}
                fill="none"
                stroke="hsl(187, 100%, 50%)"
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Center flash */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="h-20 w-20 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(187 100% 50% / 0.6), transparent 70%)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebTransition;
