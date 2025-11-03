import React, { Suspense, useEffect, lazy } from "react";
import { motion } from "framer-motion";
import ScrollProgress from "../components/ui/ScrollProgress";
import { refreshLenis } from "../utils/motion-sync";
import { caseStudies, getFeaturedCaseStudies } from "../data/caseStudies";
import { testimonials, getFeaturedTestimonials } from "../data/testimonials";

// Import Bear Cave Marketing Components
import HeroSection from "../components/bear-cave/HeroSection";
import ValueBullets from "../components/bear-cave/ValueBullets";
import MetricCounter from "../components/bear-cave/MetricCounter";
import CaseStudyCard, { CaseStudyGrid } from "../components/bear-cave/CaseStudyCard";
import TestimonialBlock from "../components/bear-cave/TestimonialBlock";

// Import business components with Bear Cave branding
import ClientLogoWall from "../components/business/ClientLogoWall";
import ROICalculator from "../components/business/ROICalculator";
import MobileStickyCTA from "../components/business/MobileStickyCTA";

// Lazy load additional heavy components for better performance
const VideoIntroduction = lazy(() => import("../components/business/VideoIntroduction"));

const HomePage: React.FC = () => {
  useEffect(() => {
    // Set Bear Cave Marketing theme
    document.documentElement.setAttribute('data-brand', 'bear-cave');
    document.documentElement.classList.add('dark');

    // Refresh Lenis for this page
    refreshLenis();
  }, []);

  // Get featured content
  const featuredCaseStudies = getFeaturedCaseStudies();
  const featuredTestimonials = getFeaturedTestimonials();

  return (
    <div className="min-h-screen bg-bear-cave-primary-dark">
      {/* UX Enhancement Components */}
      <ScrollProgress />

      {/* Bear Cave Marketing Sticky CTA */}
      <MobileStickyCTA />

      {/* Section 1: Hero - Dark Theme */}
      <HeroSection />

      {/* Section 2: Value Bullets - Dark Theme */}
      <ValueBullets maxItems={4} />

      {/* Section 3: Client Logo Wall - Dark Theme */}
      <ClientLogoWall />

      {/* Section 4: Metrics Counter - Light Theme */}
      <MetricCounter maxItems={6} />

      {/* Section 5: Case Studies - Light Theme */}
      <CaseStudyGrid
        caseStudies={featuredCaseStudies}
        maxItems={3}
        featuredFirst={true}
      />

      {/* Section 6: Testimonials - Dark Theme */}
      <TestimonialBlock
        testimonials={featuredTestimonials}
        layout="grid"
        maxItems={3}
      />

      {/* Section 7: ROI Calculator - Light Theme */}
      <ROICalculator />

      {/* Section 8: Video Introduction - Dark Theme */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-bear-cave-primary-dark">
          <div className="w-8 h-8 border-2 border-bear-cave-accent-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <VideoIntroduction />
      </Suspense>
    </div>
  );
};

export default HomePage;
