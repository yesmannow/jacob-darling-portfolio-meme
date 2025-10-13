import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
// import Navbar from "../components/home/Navbar"; // Removed: Using global Header from App.tsx
import CaseStudies from "../components/home/CaseStudies";
import About from "../components/home/About";
import Contact from "../components/home/Contact";
import lenis from "../utils/motion-sync";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Navbar removed - using global Header from App.tsx */}
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <CaseStudies />
        <About />
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
