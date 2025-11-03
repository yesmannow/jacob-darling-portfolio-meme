import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "@/styles/motion-tokens.js";

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

const HeroSection = ({ title, backgroundImage }: HeroSectionProps) => {
  return (
    <motion.section
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
      }}
      {...motionTokens.cinematicEntry}
    >
      <motion.h1
        className="hero-title"
        style={{
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          fontWeight: 800,
          textAlign: 'center'
        } as React.CSSProperties}
      >
        {title}
      </motion.h1>
    </motion.section>
  );
};

export default HeroSection;

