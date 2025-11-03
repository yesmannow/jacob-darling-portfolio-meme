import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import ModernHeader from "./components/layout/ModernHeader";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import BackToTop from "./components/utilities/BackToTop";
import PersonSchema from "./components/seo/PersonSchema";
import PerformanceMonitor from "./components/utils/PerformanceMonitor";
import ErrorBoundary from "./components/ErrorBoundary";
import { initLenis, destroyLenis } from "./utils/motion-sync";
import "lenis/dist/lenis.css";

const App: React.FC = () => {
  useEffect(() => {
    // Ensure native scrolling works immediately
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    // Initialize global Lenis instance (with error handling)
    try {
      const lenis = initLenis();
      if (lenis) {
        console.log("✅ App: Lenis ready");
      } else {
        console.warn("⚠️ App: Lenis not initialized, using native scroll");
      }
    } catch (error) {
      console.error("❌ App: Lenis initialization error:", error);
    }

    // Cleanup on unmount
    return () => {
      try {
        destroyLenis();
      } catch (error) {
        console.error("❌ App: Cleanup error:", error);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <PersonSchema />
        <PerformanceMonitor />
        {/* <LogoIntro /> */}
        {/* <BackgroundLogos /> */}
        {/* <CustomCursor /> */}
        <ScrollToTop />
        <BackToTop />
        <ModernHeader />
        <AppRouter />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;