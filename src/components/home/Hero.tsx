import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const hue = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced breathing gradient animation
      gsap.to(".gradient-bg", {
        backgroundPosition: "200% 200%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Breathing light effect
      gsap.to(".breathing-light", {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Particle drift animation
      gsap.to(".hero-particle", {
        y: -50,
        x: 30,
        opacity: 0.8,
        duration: 6,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut"
      });

      // Logo entrance animation
      const logoTl = gsap.timeline();
      logoTl.fromTo(logoRef.current, 
        { scale: 0, opacity: 0, rotationY: 180 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "back.out(1.7)" }
      );

      // Text sequence stagger animation
      const textTl = gsap.timeline({ delay: 0.8 });
      textTl.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.2"
      );

      // Scroll-triggered parallax
      gsap.to(".hero-content", {
        y: -100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Mousemove tilt effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;
        
        gsap.to(".hero-content", {
          rotationY: xPos * 2,
          rotationX: -yPos * 2,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      heroRef.current?.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  const scrollToFeaturedWork = () => {
    const featuredSection = document.getElementById('featured-work');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-snapshot');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="hero relative h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Multi-Layer Parallax Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {/* Main Gradient Layer */}
        <motion.div 
          className="gradient-bg absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 25%, #EC4899 50%, #F59E0B 75%, #3B82F6 100%)",
            backgroundSize: "400% 400%",
            filter: "blur(100px) hue-rotate(var(--hue-rotate, 0deg)) brightness(var(--brightness, 1))",
            '--hue-rotate': hue,
            '--brightness': brightness
          } as any}
        />
        
        {/* Breathing Light Layer */}
        <div 
          className="breathing-light absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 30% 70%, #3B82F6 0%, transparent 50%), radial-gradient(circle at 70% 30%, #EC4899 0%, transparent 50%)",
            filter: "blur(80px)"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </motion.div>
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Content with Parallax */}
      <motion.div 
        className="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: contentY }}
      >
        {/* Animated Logo/Initials */}
        <motion.div 
          ref={logoRef}
          className="mb-8 mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-pink-500 shadow-2xl"
          whileHover={{ 
            scale: 1.1, 
            rotate: 360,
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)"
          }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-2xl font-bold text-white">JD</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white mb-6"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Jacob Darling
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            Designer. Developer. Creative Technologist.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToFeaturedWork}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            onClick={scrollToAbout}
            className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(255, 255, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View My Story
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
