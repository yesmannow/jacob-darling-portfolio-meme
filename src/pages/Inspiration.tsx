import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Tag, Image, Sparkles, Brain, Zap, Filter, Search, X, Eye, Heart, Share2 } from "lucide-react";
import { loadDesignImages } from "../utils/loadDesign";
import { loadPhotographyImages } from "../utils/loadPhotography";
import { loadSideProjectImages } from "../utils/loadSideProjects";
import { loadBioImages } from "../utils/loadBio";

// Import new modern components
import ModernInspirationHero from "../components/inspiration/ModernInspirationHero";
import AdvancedFilterSystem from "../components/inspiration/AdvancedFilterSystem";
import ModernInspirationGrid from "../components/inspiration/ModernInspirationGrid";
import ColorPaletteExtractor from "../components/inspiration/ColorPaletteExtractor";
import { useDebounce, useFilteredItems, LazyImage } from "../components/inspiration/PerformanceOptimizer";
import { ParticleSystem, ScrollReveal, StaggerContainer, StaggerItem } from "../components/inspiration/AnimationTemplates";
import ResponsiveInspirationWrapper from "../components/inspiration/ResponsiveInspirationWrapper";

gsap.registerPlugin(ScrollTrigger);

import "./Inspiration.css";

interface InspirationProject {
  slug: string;
  title: string;
  dominantColors: string[];
  keywords: string[];
  tags: string[];
  summary: string;
  confidence: string;
  imageCount: number;
  lastUpdated: string;
  previews: {
    grid: string | null;
    swatches: string | null;
  };
  colorAnalysis?: {
    vibrant: string | null;
    muted: string | null;
    darkVibrant: string | null;
    lightVibrant: string | null;
  };
  images: string[];
}

interface InspirationData {
  generated: string;
  version: string;
  totalProjects: number;
  metadata: {
    totalColors: number;
    uniqueTags: string[];
    averageImageCount: number;
    lastProjectUpdate: string;
  };
  projects: InspirationProject[];
}

const Inspiration: React.FC = () => {
  const [inspirationData, setInspirationData] = useState<InspirationData | null>(null);
  const [staticImages, setStaticImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    tags: [] as string[],
    viewMode: 'grid' as 'grid' | 'masonry' | 'list',
    sortBy: 'newest'
  });

  // Performance optimizations
  const debouncedSearch = useDebounce(filters.search, 300);
  const searchFields: (keyof any)[] = ['title', 'category', 'source'];

  useEffect(() => {
    // Load static images from all collections
    const designImages = loadDesignImages();
    const photoImages = loadPhotographyImages();
    const sideProjectImages = loadSideProjectImages();
    const bioImages = loadBioImages();

    const combined = [
      ...designImages.map(img => ({
        ...img,
        source: 'Design',
        category: 'Design',
        tags: ['design', 'creative', 'visual'],
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      })),
      ...photoImages.map(img => ({
        ...img,
        source: 'Photography',
        category: 'Photography',
        tags: ['photography', 'visual', 'artistic'],
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      })),
      ...sideProjectImages.map(img => ({
        ...img,
        source: 'Side Projects',
        category: 'Projects',
        tags: ['project', 'development', 'creative'],
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      })),
      ...bioImages.map(img => ({
        ...img,
        source: 'Bio',
        category: 'Personal',
        tags: ['personal', 'bio', 'about'],
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
      }))
    ];

    setStaticImages(combined);

    // Try to load AI-curated inspiration data (fallback gracefully if not available)
    fetch('/inspiration.json')
      .then(response => response.json())
      .then(data => setInspirationData(data))
      .catch(error => {
        console.log('AI-curated inspiration data not available, using static images only');
        setInspirationData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Optimized filtering with memoization
  const optimizedFilters = useMemo(() => ({
    search: debouncedSearch,
    category: filters.category,
    tags: filters.tags
  }), [debouncedSearch, filters.category, filters.tags]);

  // Filter images
  const filteredImages = useFilteredItems(
    staticImages,
    debouncedSearch,
    { category: filters.category, tags: filters.tags },
    searchFields
  );

  // Sort filtered images
  const sortedAndFilteredImages = useMemo(() => {
    const sorted = [...filteredImages];

    switch (filters.sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime());
      case 'alphabetical':
        return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'random':
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  }, [filteredImages, filters.sortBy]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleImageClick = (image: any, index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  const getAvailableTags = () => {
    const allTags = staticImages.flatMap(item => item.tags || []);
    return [...new Set(allTags)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-4"
        >
          <Sparkles size={48} className="text-purple-400" />
          <p className="text-sm text-gray-400">Loading inspiration...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <ResponsiveInspirationWrapper
      items={sortedAndFilteredImages}
      onItemClick={handleImageClick}
      onFilterChange={handleFilterChange}
      availableTags={getAvailableTags()}
      selectedImage={selectedImage}
      filters={filters}
    />
  );
};

export default Inspiration;
