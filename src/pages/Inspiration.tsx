import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Tag, Image, Sparkles, Brain, Zap, Filter, Search, X, Eye, Heart, Share2 } from "lucide-react";
import { loadDesignImages } from "../utils/loadDesign";
import { loadPhotographyImages } from "../utils/loadPhotography";
import { loadSideProjectImages } from "../utils/loadSideProjects";
import { loadBioImages } from "../utils/loadBio";

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
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeTagFilter, setActiveTagFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  useEffect(() => {
    // Load static images from all collections
    const designImages = loadDesignImages();
    const photoImages = loadPhotographyImages();
    const sideProjectImages = loadSideProjectImages();
    const bioImages = loadBioImages();

    const combined = [
      ...designImages.map(img => ({ ...img, source: 'Design' })),
      ...photoImages.map(img => ({ ...img, source: 'Photography' })),
      ...sideProjectImages.map(img => ({ ...img, source: 'Side Projects' })),
      ...bioImages.map(img => ({ ...img, source: 'Bio' }))
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

  useEffect(() => {
    // Enhanced GSAP animations for grid items
    const gridItems = document.querySelectorAll('.inspiration-item');

    gsap.fromTo(gridItems,
      {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotateX: 15,
        filter: "blur(4px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".inspiration-grid",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hero parallax effect
    gsap.to(".inspiration-hero", {
      scrollTrigger: {
        trigger: ".inspiration-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      },
      y: 300,
      opacity: 0.3,
      scale: 1.1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [staticImages, inspirationData, activeFilter, searchQuery]);

  const getFilteredContent = () => {
    let filtered = staticImages;

    // Filter by category/source
    if (activeFilter !== 'All') {
      filtered = filtered.filter(item =>
        item.source === activeFilter ||
        item.category === activeFilter
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.source?.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getUniqueFilters = () => {
    const sources = [...new Set(staticImages.map(item => item.source))];
    const categories = [...new Set(staticImages.map(item => item.category))];
    return ['All', ...sources, ...categories].filter(Boolean);
  };

  const handleImageClick = (image: any) => {
    const index = filteredContent.findIndex(item =>
      item.id === image.id && item.source === image.source
    );
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredContent.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredContent[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < filteredContent.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredContent[newIndex]);
  };

  const handleShare = (image: any) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: `Check out this ${image.category} from ${image.source}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${window.location.href} - ${image.title}`);
      alert('Link copied to clipboard!');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          setSelectedImage(null);
          break;
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [staticImages, inspirationData, activeFilter, searchQuery, selectedImage]);

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

  const filteredContent = getFilteredContent();

  return (
    <div className="inspiration-page-modern min-h-screen bg-black text-white">
      {/* Enhanced Hero Section */}
      <section className="inspiration-hero relative py-40 px-8 text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-${1 + (i % 3)} h-${1 + (i % 3)} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full`}
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${20 + (i * 6)}%`,
                opacity: 0.3 + (i * 0.05)
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Visual Inspiration Hub</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Inspiration Wall
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            A living moodboard of colors, imagery, and motion drawn from every project.
            Explore the visual DNA that shapes creative decisions across design, photography, and development.
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <Image className="w-4 h-4 text-blue-400" />
              <span>{staticImages.length} Visual Assets</span>
            </div>
            {inspirationData && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>{inspirationData.totalProjects} AI Projects</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <Palette className="w-4 h-4 text-pink-400" />
              <span>{getUniqueFilters().length - 1} Categories</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Controls */}
      <section className="px-8 py-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search inspiration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {getUniqueFilters().slice(0, 8).map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-full transition-all duration-300 ${
                  viewMode === 'masonry' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-current rounded-sm"></div>
                    <div className="w-2 h-1 bg-current rounded-sm"></div>
                  </div>
                  <div className="flex gap-0.5">
                    <div className="w-2 h-1 bg-current rounded-sm"></div>
                    <div className="w-1 h-1 bg-current rounded-sm"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Inspiration Grid */}
      <section className="px-8 pb-20">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Visual Collection
              <span className="block text-sm font-normal text-gray-400 mt-2">
                {filteredContent.length} items {activeFilter !== 'All' && `in ${activeFilter}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Zap className="w-4 h-4" />
              <span>Click to expand • Scroll for magic</span>
            </div>
          </div>

          <div className={`inspiration-grid ${viewMode === 'masonry' ? 'masonry' : ''} grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6`}>
            {filteredContent.map((item, index) => (
              <motion.div
                key={`${item.source}-${item.id}`}
                className="inspiration-item group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-500 cursor-pointer"
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleImageClick(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No inspiration found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Previous Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>

            {/* Image Counter */}
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentImageIndex + 1} / {filteredContent.length}
            </motion.div>

            <motion.div
              className="relative max-w-5xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              key={selectedImage.id} // Force re-mount for smooth transitions
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Info Panel */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-b-lg p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{selectedImage.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {selectedImage.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        {selectedImage.source}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare(selectedImage)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Keyboard hints */}
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span>← Previous</span>
                  <span>→ Next</span>
                  <span>ESC Close</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inspiration;
