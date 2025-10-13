import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MessageCircle, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gradient glow background animation
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Line animation under text
      gsap.fromTo(".cta-underline",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stagger animation for content
      gsap.fromTo(".cta-content > *",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles
      gsap.to(".cta-particle", {
        y: -30,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Background Glow */}
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="cta-particle absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        <div className="cta-content space-y-8">
          
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl"
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)"
            }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-white relative"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative">
              Extraordinary
              {/* Animated Underline */}
              <div className="cta-underline absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left" />
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform your vision into reality? Let's discuss how strategic design, 
            technical innovation, and creative storytelling can elevate your next project.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            
            {/* Primary CTA */}
            <Link to="/contact">
              <motion.button
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg overflow-hidden glow-pulse ripple-effect soft-glint"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  <span>Contact Me</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <motion.button
              onClick={() => window.open('https://calendly.com/jacob-darling', '_blank')}
              className="group px-10 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span>Schedule a Call</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="pt-12 space-y-4"
          >
            <p className="text-gray-400">
              Or reach out directly at{" "}
              <a 
                href="mailto:jacob@jacobdarling.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
              >
                jacob@jacobdarling.com
              </a>
            </p>
            
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>Indianapolis, IN</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>Available Worldwide</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>Remote & On-Site</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default CTA;
