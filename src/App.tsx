import React, { useEffect } from "react";
// import Lenis from "lenis"; // Removed: Lenis initialized in motion-sync.ts
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import CustomCursor from "./components/interactive/CustomCursor"; // Removed: Making human the hero
import ScrollToTop from "./components/utils/ScrollToTop";
import BackToTop from "./components/utilities/BackToTop";
// import LogoIntro from "./components/animations/LogoIntro"; // Removed: Taco ninja logo
// import BackgroundLogos from "./components/animations/BackgroundLogos"; // Removed: Uses old logo
import PersonSchema from "./components/seo/PersonSchema";
import lenis from "./utils/motion-sync"; // Import shared Lenis instance
import "./styles/globals.css";

const App: React.FC = () => {
  // Lenis initialization moved to motion-sync.ts to avoid duplication
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <PersonSchema />
      {/* <LogoIntro /> */}
      {/* <BackgroundLogos /> */}
      {/* <CustomCursor /> */}
      <ScrollToTop />
      <BackToTop />
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;