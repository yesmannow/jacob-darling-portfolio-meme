import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center bear-cave-hero ${className}`}
      data-brand="bear-cave"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bear-cave-primary-dark/95 via-bear-cave-primary-dark/90 to-bear-cave-slate/20" />

        {/* Subtle Bear Cave Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D49B41' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20-18c9.941 0 18 8.059 18 18s-8.059 18-18 18S-8 39.941-8 30s8.059-18 18-18z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-bear-cave-light leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            EMERGE INTO
            <br />
            <span className="bear-cave-text-gradient">GROWTH</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-bear-cave-light/80 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where marketing systems emerge from the cave of complexity into the light of growth.
            <br />
            <span className="text-bear-cave-accent-gold font-semibold">
              Delivering measurable ROI for CMOs who demand results.
            </span>
          </motion.p>
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
        >
          <div className="bear-cave-bullet p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-bear-cave-accent-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-bear-cave-accent-gold" />
            </div>
            <h3 className="text-lg font-bold text-bear-cave-light mb-2">40% LEADS ↑</h3>
            <p className="text-bear-cave-light/70 text-sm">Average conversion lift through automation</p>
          </div>

          <div className="bear-cave-bullet p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-bear-cave-accent-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-bear-cave-accent-gold" />
            </div>
            <h3 className="text-lg font-bold text-bear-cave-light mb-2">70% COST ↓</h3>
            <p className="text-bear-cave-light/70 text-sm">Reduction in manual marketing operations</p>
          </div>

          <div className="bear-cave-bullet p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-bear-cave-accent-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-bear-cave-accent-gold" />
            </div>
            <h3 className="text-lg font-bold text-bear-cave-light mb-2">6 MONTHS</h3>
            <p className="text-bear-cave-light/70 text-sm">Average time to full ROI realization</p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="bear-cave-btn-primary px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SCHEDULE MARKETING ROI
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            className="bear-cave-btn-secondary px-8 py-4 rounded-xl text-lg font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW CASE STUDIES
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-bear-cave-light/60 text-sm mb-4 uppercase tracking-wider">
            Trusted by Marketing Leaders at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-bear-cave-light/80 font-semibold">Healthcare Systems</span>
            <span className="text-bear-cave-light/60">•</span>
            <span className="text-bear-cave-light/80 font-semibold">Tech Companies</span>
            <span className="text-bear-cave-light/60">•</span>
            <span className="text-bear-cave-light/80 font-semibold">Financial Services</span>
            <span className="text-bear-cave-light/60">•</span>
            <span className="text-bear-cave-light/80 font-semibold">Manufacturing</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-bear-cave-accent-gold/60 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-bear-cave-accent-gold rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
