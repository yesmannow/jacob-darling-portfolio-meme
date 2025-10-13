import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Particles from "tsparticles"; // Removed: Not used in this component

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(".hero-title", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.1, duration: 1 })
        .fromTo(".hero-subtitle", { opacity: 0 }, { opacity: 1, delay: 0.4, duration: 1 }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" style={{ height: "100vh", position: "relative", background: "#0A0A0A", overflow: "hidden" }}>
      {/* Cinematic Bio Portrait Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden z-0"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <motion.img
          src="/images/bio/Adobe Express 2025-10-12 09.58.18.PNG"
          alt="Jacob Darling Artistic Portrait"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ 
            opacity: 0.15, 
            mixBlendMode: "overlay",
            filter: "contrast(1.1) saturate(1.2) brightness(0.8)"
          }}
          animate={{ 
            scale: [1, 1.05, 1], 
            opacity: [0.15, 0.2, 0.15] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        {/* Cinematic overlay gradient */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(236,72,153,0.1) 100%)",
            zIndex: 1
          }}
        />
      </motion.div>
      
      {/* Hero Content */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10 }}>
        <motion.h1 
          className="hero-title" 
          style={{ 
            fontSize: "clamp(2rem, 6vw, 5rem)", 
            fontWeight: 800, 
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)"
          }}
          {...motionTokens.cinematicEntry}
        >
          Jacob Darling
        </motion.h1>
        <motion.p 
          className="hero-subtitle" 
          style={{ 
            fontSize: "1.25rem", 
            color: "#EC4899",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Designer. Developer. Creative Technologist.
        </motion.p>
        <motion.button 
          className="btn-primary" 
          style={{ marginTop: "2rem" }} 
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59,130,246,0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          View My Work
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
