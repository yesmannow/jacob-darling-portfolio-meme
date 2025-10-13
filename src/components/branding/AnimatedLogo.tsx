import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import "./AnimatedLogo.css";

interface AnimatedLogoProps {
  className?: string;
  size?: number;
  variant?: "header" | "splash" | "footer";
  onAnimationComplete?: () => void;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className = "", 
  size = 48, 
  variant = "header",
  onAnimationComplete 
}) => {
  const logoRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!logoRef.current) return;

    const paths = logoRef.current.querySelectorAll(".logo-path");
    const hexagon = logoRef.current.querySelector(".logo-hexagon");
    const dot = logoRef.current.querySelector(".logo-dot");

    // Set initial stroke-dasharray for path animation
    paths.forEach(path => {
      const length = (path as SVGPathElement).getTotalLength();
      (path as SVGPathElement).style.strokeDasharray = length.toString();
      (path as SVGPathElement).style.strokeDashoffset = length.toString();
    });

    // Main entrance animation sequence
    const timeline = anime.timeline({
      easing: 'easeInOutQuart',
      complete: () => {
        if (onAnimationComplete) onAnimationComplete();
      }
    });

    if (variant === "splash") {
      // Cinematic splash intro sequence
      timeline
        .add({
          targets: hexagon,
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 2000,
          easing: 'easeOutExpo'
        })
        .add({
          targets: paths,
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [0, 1],
          duration: 1500,
          delay: anime.stagger(300),
          easing: 'easeInOutSine'
        }, '-=1000')
        .add({
          targets: dot,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutBounce'
        }, '-=500')
        .add({
          targets: logoRef.current,
          filter: [
            'drop-shadow(0 0 0px #88ABF2)',
            'drop-shadow(0 0 20px #88ABF2) drop-shadow(0 0 40px #a8c5ff)'
          ],
          duration: 1000,
          easing: 'easeInOutQuad'
        }, '-=300');
    } else {
      // Standard header/footer animation
      timeline
        .add({
          targets: hexagon,
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [0, 1],
          duration: 1200,
          easing: 'easeOutQuart'
        })
        .add({
          targets: paths,
          strokeDashoffset: [anime.setDashoffset, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(150),
          easing: 'easeInOutSine'
        }, '-=600')
        .add({
          targets: dot,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 400,
          easing: 'easeOutBack'
        }, '-=200');
    }

    return () => {
      timeline.pause();
    };
  }, [variant, onAnimationComplete]);

  // Hover animation effects
  useEffect(() => {
    if (!logoRef.current || !isHovered) return;

    anime({
      targets: logoRef.current,
      filter: [
        'drop-shadow(0 0 8px #88ABF280) drop-shadow(0 0 16px #a8c5ff60)',
        'drop-shadow(0 0 12px #88ABF2) drop-shadow(0 0 24px #a8c5ff80)'
      ],
      scale: [1, 1.05],
      duration: 400,
      easing: 'easeOutQuart',
      direction: 'alternate'
    });

    // Pulse the accent dot
    anime({
      targets: logoRef.current.querySelector('.logo-dot'),
      scale: [1, 1.3, 1],
      duration: 600,
      easing: 'easeInOutSine'
    });

  }, [isHovered]);

  const logoVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.svg
      ref={logoRef}
      className={`animated-logo ${className} logo-${variant}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={logoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer hexagon frame */}
      <path
        className="logo-hexagon"
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        stroke="url(#gradient1)"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        style={{ opacity: 0 }}
      />
      
      {/* Inner geometric "JD" monogram */}
      {/* Letter J */}
      <path
        className="logo-path"
        d="M38 30 L38 55 Q38 65 45 65 Q50 65 50 60"
        stroke="url(#gradient2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{ opacity: 0 }}
      />
      
      {/* Letter D */}
      <path
        className="logo-path"
        d="M58 30 L58 65 Q58 65 65 60 Q72 55 72 47.5 Q72 40 65 35 Q58 30 58 30"
        stroke="url(#gradient2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0 }}
      />

      {/* Accent dot */}
      <circle
        className="logo-dot"
        cx="50"
        cy="82"
        r="2.5"
        fill="#88ABF2"
        style={{ opacity: 0, transform: 'scale(0)' }}
      />

      {/* Enhanced gradients with cinematic colors */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#88ABF2" />
          <stop offset="50%" stopColor="#a8c5ff" />
          <stop offset="100%" stopColor="#667eea" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#88ABF2" />
          <stop offset="25%" stopColor="#a8c5ff" />
          <stop offset="50%" stopColor="#667eea" />
          <stop offset="75%" stopColor="#a8c5ff" />
          <stop offset="100%" stopColor="#88ABF2" />
        </linearGradient>
        
        {/* Glow filter for cinematic effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  );
};

export default AnimatedLogo;
