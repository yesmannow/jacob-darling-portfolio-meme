import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/animations/PageTransition";
import ScrollToTop from "../components/utils/ScrollToTop";

// Lazy load pages for code splitting
const Home = React.lazy(() => import("../pages/index")); // Cinematic homepage
const About = React.lazy(() => import("../pages/About"));
const CaseStudies = React.lazy(() => import("../pages/CaseStudies"));
const CaseStudyDetail = React.lazy(() => import("../pages/CaseStudyDetail"));
const Toolbox = React.lazy(() => import("../pages/Toolbox"));
const Projects = React.lazy(() => import("../pages/Projects"));
const ProjectDetail = React.lazy(() => import("../pages/ProjectDetail"));
const Applications = React.lazy(() => import("../pages/Applications"));
const ApplicationDetail = React.lazy(() => import("../pages/ApplicationDetail"));
const Photography = React.lazy(() => import("../pages/Photography"));
const Design = React.lazy(() => import("../pages/Design"));
const SideProjects = React.lazy(() => import("../pages/SideProjects"));
const SideProjectDetail = React.lazy(() => import("../pages/side-projects/SideProjectDetail"));
const Testimonials = React.lazy(() => import("../pages/Testimonials"));
const Resume = React.lazy(() => import("../pages/Resume"));
const Contact = React.lazy(() => import("../pages/Contact"));

// Loading component
const PageLoader = () => (
  <div className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '3rem',
      height: '3rem',
      border: '2px solid var(--color-accent)',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

const AppRouter: React.FC = () => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
            <Route path="/toolbox" element={<PageTransition><Toolbox /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/applications" element={<PageTransition><Applications /></PageTransition>} />
            <Route path="/applications/:id" element={<PageTransition><ApplicationDetail /></PageTransition>} />
            <Route path="/photography" element={<PageTransition><Photography /></PageTransition>} />
            <Route path="/design" element={<PageTransition><Design /></PageTransition>} />
            <Route path="/side-projects" element={<PageTransition><SideProjects /></PageTransition>} />
            <Route path="/side-projects/:slug" element={<PageTransition><SideProjectDetail /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
            <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

export default AppRouter;