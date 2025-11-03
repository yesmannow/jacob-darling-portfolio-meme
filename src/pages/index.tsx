import React, { Suspense, useEffect, lazy } from "react";
import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import ScrollProgress from "../components/ui/ScrollProgress";
import { refreshLenis } from "../utils/motion-sync";

// Lazy load heavy components for better performance
const IntroStatement = lazy(() => import("../components/home/IntroStatement"));
const GlanceMetrics = lazy(() => import("../components/home/GlanceMetrics"));
const SkillsShowcase = lazy(() => import("../components/home/SkillsShowcase"));
const MarketingCommandCenter = lazy(() => import("../components/dashboard/MarketingCommandCenter"));
const RedesignedFeaturedWork = lazy(() => import("../components/home/RedesignedFeaturedWork"));
const ProcessSection = lazy(() => import("../components/home/ProcessSection"));
const AboutSnapshot = lazy(() => import("../components/home/AboutSnapshot"));
const InteractiveTimeline = lazy(() => import("../components/timeline/InteractiveTimeline"));
const Services = lazy(() => import("../components/home/Services"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const LeadMagnet = lazy(() => import("../components/home/LeadMagnet"));
const Toolbox = lazy(() => import("../components/home/Toolbox"));
const AIAutomationShowcase = lazy(() => import("../components/automation/AIAutomationShowcase"));
const Awards = lazy(() => import("../components/home/Awards"));
const CTA = lazy(() => import("../components/home/CTA"));

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

        {/* Skills Showcase */}
        <SkillsShowcase />

        {/* Marketing Command Center */}
        <MarketingCommandCenter />

        {/* Featured Case Studies */}
        <RedesignedFeaturedWork />

        {/* Process Section */}
        <ProcessSection />

        {/* About Snapshot */}
        <AboutSnapshot />

        {/* Interactive Timeline */}
        <InteractiveTimeline />

        {/* Services Overview */}
        <Services />

        {/* Testimonials */}
        <Testimonials />

        {/* Lead Magnet */}
        <LeadMagnet />

        {/* Creative Toolbox */}
        <Toolbox />

        {/* AI + Automation Showcase */}
        <AIAutomationShowcase />

        {/* Awards & Recognition */}
        <Awards />

        {/* Final CTA */}
        <CTA />
      </Suspense>
    </>
  );
};

export default HomePage;
