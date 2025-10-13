import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.05);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      className="fixed right-4 top-0 bottom-0 z-50 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Track */}
      <div className="relative w-1 h-64 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Progress Fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-full origin-bottom"
          style={{ scaleY }}
        />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 via-purple-400 to-pink-400 rounded-full origin-bottom blur-sm opacity-60"
          style={{ scaleY }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="absolute -right-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-2 py-1 text-xs text-white font-mono"
        style={{
          bottom: useSpring(scrollYProgress, {
            stiffness: 100,
            damping: 30,
            restDelta: 0.001
          }).get() * 256 - 12
        }}
      >
        {Math.round(scrollYProgress.get() * 100)}%
      </motion.div>
    </motion.div>
  );
};

export default ScrollProgress;
