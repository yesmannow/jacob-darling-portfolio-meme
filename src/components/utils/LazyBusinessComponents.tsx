import React, { lazy, Suspense } from 'react';

// Lazy load business-focused components for better performance
export const ClientLogoWall = lazy(() => import('../business/ClientLogoWall'));
export const VideoIntroduction = lazy(() => import('../business/VideoIntroduction'));
export const ROICalculator = lazy(() => import('../business/ROICalculator'));
export const MobileStickyCTA = lazy(() => import('../business/MobileStickyCTA'));

// Loading component for business sections
export const BusinessSectionLoader: React.FC<{ className?: string }> = ({
  className = "min-h-[400px] flex items-center justify-center"
}) => (
  <div className={className}>
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-muted text-sm">Loading business insights...</p>
    </div>
  </div>
);

// Wrapper component that handles lazy loading with error boundaries
export const LazyBusinessWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={className}>
      <Suspense fallback={<BusinessSectionLoader className={className} />}>
        {children}
      </Suspense>
    </div>
  );
};

// Optimized loading strategy for above-the-fold content
export const useOptimizedLoading = () => {
  const preloadBusinessComponents = () => {
    // Preload critical business components after initial page load
    setTimeout(() => {
      import('../business/ClientLogoWall');
      import('../business/VideoIntroduction');
    }, 2000);

    setTimeout(() => {
      import('../business/ROICalculator');
      import('../business/MobileStickyCTA');
    }, 5000);
  };

  return { preloadBusinessComponents };
};