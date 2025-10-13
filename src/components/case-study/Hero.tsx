import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage }) => {
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
    <section className="hero" style={{ height: "100vh", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "white", textShadow: "0 0 20px rgba(0, 0, 0, 0.5)" }}>
        <motion.h1 className="hero-title" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 800 }}>{title}</motion.h1>
        <motion.p className="hero-subtitle" style={{ fontSize: "1.25rem" }}>{subtitle}</motion.p>
      </div>
    </section>
  );
};

export default Hero;
