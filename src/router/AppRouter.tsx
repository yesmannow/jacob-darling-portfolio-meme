import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/animations/PageTransition";
import Home from "../pages/Home";
import About from "../pages/About";
import CaseStudies from "../pages/CaseStudies";
import CaseStudyDetail from "../pages/CaseStudyDetail";
import Toolbox from "../pages/Toolbox";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Applications from "../pages/Applications";
import ApplicationDetail from "../pages/ApplicationDetail";
import Testimonials from "../pages/Testimonials";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";

const AppRouter: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
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
        <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;