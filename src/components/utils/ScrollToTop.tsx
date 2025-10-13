import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis, refreshLenis } from '../../utils/motion-sync';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    
    // Scroll to top immediately
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    
    // Also use native scroll as fallback
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
    
    // Multiple refresh attempts to ensure Lenis detects new content
    const refreshTimers = [100, 300, 600, 1000];
    refreshTimers.forEach(delay => {
      setTimeout(() => {
        refreshLenis();
      }, delay);
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
