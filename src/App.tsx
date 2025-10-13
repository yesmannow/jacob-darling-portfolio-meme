import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import BackToTop from "./components/utilities/BackToTop";
import PersonSchema from "./components/seo/PersonSchema";
import { initLenis, destroyLenis } from "./utils/motion-sync";
import "lenis/dist/lenis.css";

const App: React.FC = () => {
  useEffect(() => {
    // Initialize global Lenis instance
    const lenis = initLenis();
    
    // Ensure native scrolling works as fallback
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    
    // Cleanup on unmount
    return () => {
      destroyLenis();
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