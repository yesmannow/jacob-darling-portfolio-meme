import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Tag, Image, Sparkles, Brain, Zap, Filter } from "lucide-react";
import { loadDesignImages } from "../utils/loadDesign";
import { loadPhotographyImages } from "../utils/loadPhotography";
import { loadSideProjectImages } from "../utils/loadSideProjects";
import { loadBioImages } from "../utils/loadBio";

gsap.registerPlugin(ScrollTrigger);

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
  const [loading, setLoading] = useState(true);

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
    // Animate grid items on scroll
    const gridItems = document.querySelectorAll('.inspiration-item');
    
    gsap.fromTo(gridItems,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".inspiration-grid",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [staticImages, inspirationData, activeFilter, activeTagFilter]);

  const getFilteredContent = () => {
    if (activeFilter === 'All') {
      return staticImages;
    }
    return staticImages.filter(item => item.source === activeFilter || item.category === activeFilter);
  };

  const getUniqueFilters = () => {
    const sources = [...new Set(staticImages.map(item => item.source))];
    const categories = [...new Set(staticImages.map(item => item.category))];
    return ['All', ...sources, ...categories].filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={48} className="text-purple-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="inspiration-page min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Inspiration Wall
          </h1>
          <p className="text-xl opacity-70 max-w-3xl mx-auto mb-8">
            A living moodboard drawn from every project — colors, imagery, and motion. 
            Explore the visual DNA that drives creative decisions across design, photography, and code.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm opacity-60">
            <div className="flex items-center gap-2">
              <Image size={16} />
              <span>{staticImages.length} Images</span>
            </div>
            {inspirationData && (
              <div className="flex items-center gap-2">
                <Brain size={16} />
                <span>{inspirationData.totalProjects} AI-Curated Projects</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>{getUniqueFilters().length - 1} Categories</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {getUniqueFilters().map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </section>

      {/* AI-Curated Projects (if available) */}
      {inspirationData && (
        <section className="px-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              AI-Curated Cinematic Projects
            </h2>
            <p className="text-lg opacity-70 mb-8">
              Automatically analyzed and classified by AI based on color psychology, visual style, and emotional impact
            </p>
            
            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['All', ...inspirationData.metadata.uniqueTags].map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setActiveTagFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTagFilter === tag
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-1">
                    {tag === 'All' ? <Filter size={14} /> : <Tag size={14} />}
                    {tag}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {inspirationData.projects
              .filter(project => activeTagFilter === 'All' || project.tags.includes(activeTagFilter))
              .map((project, index) => (
              <motion.div
                key={project.slug}
                className="inspiration-item bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Color Palette */}
                <div className="h-16 flex">
                  {project.dominantColors.slice(0, 5).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      style={{ backgroundColor: color }}
                      className="flex-1 transition-all duration-300 hover:flex-[2]"
                    />
                  ))}
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-sm opacity-70 mb-4">
                    {project.imageCount} images • {project.keywords.length} keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.keywords.slice(0, 4).map((keyword, keywordIndex) => (
                      <span
                        key={keywordIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Main Inspiration Grid */}
      <section className="px-8 pb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Visual Collection
          <span className="block text-sm font-normal opacity-60 mt-2">
            {getFilteredContent().length} items {activeFilter !== 'All' && `in ${activeFilter}`}
          </span>
        </h2>
        
        <div className="inspiration-grid grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {getFilteredContent().map((item, index) => (
            <motion.div
              key={item.id}
              className="inspiration-item group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs opacity-80">
                    <span>{item.category}</span>
                    <span>{item.source}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inspiration;
