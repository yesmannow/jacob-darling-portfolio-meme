import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Brand = 'cmo' | 'dev';

type ThemeContextType = {
  theme: Theme;
  brand: Brand;
  setTheme: (t: Theme) => void;
  setBrand: (b: Brand) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state synchronously from localStorage (safe because ThemeInit script runs first)
  const getInitialTheme = (): Theme => {
    try {
      const stored = localStorage.getItem('theme') as Theme;
      return stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
    } catch {
      return 'system';
    }
  };

  const getInitialBrand = (): Brand => {
    try {
      const stored = localStorage.getItem('brand') as Brand;
      return stored && ['cmo', 'dev'].includes(stored) ? stored : 'cmo';
    } catch {
      return 'cmo';
    }
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [brand, setBrandState] = useState<Brand>(getInitialBrand);

  useEffect(() => {
    // Apply theme on mount (ThemeInit script already set it, but ensure sync)
    apply(theme, brand);
  }, []); // Only run once on mount

  // Watch for system preference changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => apply('system', brand);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, brand]);

  function apply(t: Theme, b: Brand) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = t === 'dark' || (t === 'system' && prefersDark);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-brand', b);
  }

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    apply(t, brand);

    // Analytics tracking (optional)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'theme_change', { theme: t });
    }
  };

  const setBrand = (b: Brand) => {
    setBrandState(b);
    localStorage.setItem('brand', b);
    apply(theme, b);

    // Analytics tracking (optional)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'brand_change', { brand: b });
    }
  };

  // Always provide context - never return children without Provider
  return (
    <ThemeContext.Provider value={{ theme, brand, setTheme, setBrand }}>
      {/* Smooth crossfade on theme changes */}
      <div className="transition-colors duration-300">{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

