import React, { useState, useEffect } from "react";

// Brand icon mapping - maps technology names to their SVG file slugs
// Only icons with existing SVG files should be in this map
// For missing icons, the component will show a fallback badge
const brandIconSlugs: Record<string, string> = {
  // Only include icons that have corresponding SVG files
  "React": "react",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "Node.js": "nodejs",
  "Git": "git",
  "GitHub": "github",
};

/**
 * Dynamically imports an icon SVG file
 * Returns null if the file doesn't exist
 */
async function loadIconSvg(slug: string): Promise<string | null> {
  try {
    // Use dynamic import with template literal for truly dynamic loading
    // This allows Rollup to handle missing files gracefully
    const module = await import(/* @vite-ignore */ `../../assets/icons/brands/${slug}.svg`);
    return typeof module.default === 'string' ? module.default : null;
  } catch {
    return null;
  }
}

interface BrandIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * BrandIcon component that dynamically loads brand/technology icons as SVGs
 * Icons are lazy-loaded to reduce initial bundle size
 */
const BrandIcon: React.FC<BrandIconProps> = ({
  name,
  size = 24,
  color,
  className = ""
}) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the matching icon slug
    const iconSlug = brandIconSlugs[name];

    if (!iconSlug) {
      // No icon available for this name - show fallback immediately
      setLoading(false);
      return;
    }

    // Load the icon URL dynamically
    loadIconSvg(iconSlug)
      .then((url) => {
        setIconUrl(url);
        setLoading(false);
      })
      .catch(() => {
        // Icon file doesn't exist - gracefully fall back to initial badge
        setLoading(false);
        setIconUrl(null);
      });
  }, [name]);

  if (loading) {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
      </div>
    );
  }

  if (!iconUrl) {
    // No icon available - show a fallback badge with brand initial
    const initial = name.charAt(0).toUpperCase();
    return (
      <div
        className={`inline-flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-xs ${className}`}
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size
        }}
        title={name}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={iconUrl}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      style={color ? { filter: `brightness(0) saturate(100%) ${color}` } : undefined}
      loading="lazy"
    />
  );
};

export default BrandIcon;

