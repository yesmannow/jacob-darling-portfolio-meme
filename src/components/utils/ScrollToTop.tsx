import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis, refreshLenis } from '../../utils/motion-sync';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    const timers: number[] = [];

    // Scroll to top immediately
    lenis?.scrollTo(0, { immediate: true });
    // Use 'auto' instead of invalid 'instant' for native scroll fallback
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Store timeout IDs for cleanup
    [100, 300, 600, 1000].forEach(delay => {
      const id = window.setTimeout(refreshLenis, delay);
      timers.push(id);
    });

    // Cleanup function to clear all timers
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
