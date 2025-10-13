import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import lenis, { refreshLenis } from '../../utils/motion-sync';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use Lenis scroll method instead of window.scrollTo to avoid conflicts
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      
      // Multiple refresh attempts to ensure Lenis detects new content
      const refreshTimers = [100, 300, 600, 1000];
      refreshTimers.forEach(delay => {
        setTimeout(() => {
          refreshLenis();
        }, delay);
      });
    } else {
      // Fallback for when Lenis is not available
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
