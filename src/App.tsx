import React, { lazy, Suspense, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import BackToTop from "./components/utilities/BackToTop";
import PersonSchema from "./components/seo/PersonSchema";
import PerformanceMonitor from "./components/utils/PerformanceMonitor";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { destroyLenis } from "./utils/motion-sync";
import { initAnalytics } from "./utils/analytics";

const FloatingActionButtons = React.lazy(() =>
  import('./components/utils/FloatingActionButtons')
);

const App = () => {
  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Ensure native scrolling works immediately
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    // Dynamic import Lenis
    (async () => {
      let Lenis: any;
      try {
        Lenis = await import('lenis').then(m => m.default ?? m);
      } catch (err) {
        console.warn('Lenis failed to load:', err);
      }
    })();

    // Cleanup on unmount
    // Note: In React StrictMode (dev), effects run twice, but we shouldn't
    // destroy Lenis between these runs. Only destroy on actual unmount.
    return () => {
      // Only destroy on actual app unmount, not during StrictMode remounts
      // This prevents duplicate initialization during dev mode
      if (import.meta.env.PROD) {
        try {
          destroyLenis();
        } catch (error) {
          console.error("❌ App: Cleanup error:", error);
        }
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="app bg-bg text-text font-ui">
          <PersonSchema />
          <PerformanceMonitor />
          <ScrollToTop />
          <BackToTop />
          <Header />
          <Suspense fallback={null}>
            <FloatingActionButtons />
          </Suspense>
          <AppRouter />
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

