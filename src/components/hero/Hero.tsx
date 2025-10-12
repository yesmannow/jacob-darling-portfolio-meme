import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, buttonHover } from "../../utils/animations";
import "./Hero.css";

const Hero: React.FC = () => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Strategy", "Automation", "Systems", "Storytelling"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 className="hero-title" variants={staggerItem}>
          Turning Complexity into{" "}
          <span className="gradient-text">Clarity</span>.
        </motion.h1>
        
        <motion.p className="hero-subtitle" variants={staggerItem}>
          I design and build integrated marketing ecosystems that turn curiosity 
          into conversion — and chaos into competitive advantage.
        </motion.p>
        
        <motion.div className="cta-group" variants={staggerItem}>
          <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
            <Link className="cta primary" to="/case-studies">
              Explore My Work
            </Link>
          </motion.div>
          <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
            <a 
              className="cta secondary" 
              href="/resume/jacob-darling-resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download Résumé
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="tagline-rotation" 
          variants={staggerItem}
        >
          {words.map((word, index) => (
            <React.Fragment key={word}>
              <motion.span
                animate={{
                  opacity: index === activeWord ? 1 : 0.3,
                  scale: index === activeWord ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && (
                <span className="separator">•</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="hero-background">
        <motion.div 
          className="gradient-orb orb-1"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="gradient-orb orb-2"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </section>
  );
};

export default Hero;