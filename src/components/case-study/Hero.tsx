import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage }) => {
  const heroRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.setProperty('--hero-background-image', `url(${backgroundImage})`);
    }
  }, [backgroundImage]);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      })
      .fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1 })
      .fromTo(".hero-subtitle", { opacity: 0 }, { opacity: 1, delay: 0.4 }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <motion.h1 className="hero-title">{title}</motion.h1>
        <motion.p className="hero-subtitle">{subtitle}</motion.p>
      </div>
    </section>
  );
};

export default Hero;
