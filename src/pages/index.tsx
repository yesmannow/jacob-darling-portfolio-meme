import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import IntroStatement from "../components/home/IntroStatement";
import GlanceMetrics from "../components/home/GlanceMetrics";
import FeaturedWork from "../components/home/FeaturedWork";
import AboutSnapshot from "../components/home/AboutSnapshot";
import Toolbox from "../components/home/Toolbox";
import Awards from "../components/home/Awards";
import CTA from "../components/home/CTA";
import ScrollProgress from "../components/ui/ScrollProgress";
import { refreshLenis } from "../utils/motion-sync";

const HomePage: React.FC = () => {
  useEffect(() => {
    // Refresh Lenis for this page
    refreshLenis();
  }, []);

  return (
    <>
      {/* UX Enhancement Components */}
      <ScrollProgress />
      
      {/* Cinematic Hero Section */}
      <Hero />
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {/* Design Philosophy */}
        <IntroStatement />
        
        {/* Impact Metrics Dashboard */}
        <GlanceMetrics />
        
        {/* Featured Case Studies */}
        <FeaturedWork />
        
        {/* About Snapshot */}
        <AboutSnapshot />
        
        {/* Creative Toolbox */}
        <Toolbox />
        
        {/* Awards & Recognition */}
        <Awards />
        
        {/* Final CTA */}
        <CTA />
      </Suspense>
    </>
  );
};

export default HomePage;
