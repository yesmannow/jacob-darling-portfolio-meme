import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import TextReveal from "../components/animations/TextReveal";
import { fadeInUp } from "../utils/animations";
import "./Photography.css";

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: string;
  description?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

const photoGallery: PhotoItem[] = [
  { id: "photo-01", src: "/images/photography/20211024_075305~4.jpg", title: "Mountain Vista", category: "Landscape", size: "large" },
  { id: "photo-02", src: "/images/photography/20220722_053113.jpg", title: "Golden Hour", category: "Landscape", size: "tall" },
  { id: "photo-03", src: "/images/photography/MVIMG_20190720_204815-EFFECTS.jpg", title: "Urban Effects", category: "Creative", size: "wide" },
  { id: "photo-04", src: "/images/photography/20240704_180246.jpg", title: "Summer Sunset", category: "Landscape", size: "medium" },
  { id: "photo-05", src: "/images/photography/20240803_192159.jpg", title: "Evening Light", category: "Nature", size: "small" },
  { id: "photo-06", src: "/images/photography/IMG_20230604_154323_912.jpg", title: "Architectural Detail", category: "Architecture", size: "tall" },
  { id: "photo-07", src: "/images/photography/20220605_202214~2.jpg", title: "Night Scene", category: "Urban", size: "medium" },
  { id: "photo-08", src: "/images/photography/20230528_105239~3.jpg", title: "Spring Morning", category: "Nature", size: "wide" },
  { id: "photo-09", src: "/images/photography/20230702_190719.jpg", title: "City Life", category: "Urban", size: "small" },
  { id: "photo-10", src: "/images/photography/20231104_163213.jpg", title: "Autumn Colors", category: "Nature", size: "medium" },
  { id: "photo-11", src: "/images/photography/20240512_112541~3.jpg", title: "Architectural Lines", category: "Architecture", size: "large" },
  { id: "photo-12", src: "/images/photography/20240512_112942~3.jpg", title: "Modern Design", category: "Architecture", size: "small" },
  { id: "photo-13", src: "/images/photography/20240607_201806.jpg", title: "Evening Sky", category: "Landscape", size: "wide" },
  { id: "photo-14", src: "/images/photography/20240628_185356.jpg", title: "Coastal View", category: "Landscape", size: "tall" },
  { id: "photo-15", src: "/images/photography/20240628_201038.jpg", title: "Sunset Glow", category: "Landscape", size: "medium" },
  { id: "photo-16", src: "/images/photography/20240628_214922.jpg", title: "Night Colors", category: "Urban", size: "small" },
  { id: "photo-17", src: "/images/photography/20240629_214911.jpg", title: "City Lights", category: "Urban", size: "large" },
  { id: "photo-18", src: "/images/photography/20240704_175213.jpg", title: "Independence Day", category: "Event", size: "medium" },
  { id: "photo-19", src: "/images/photography/20240704_175407_07.jpg", title: "Celebration Moments", category: "Event", size: "small" },
  { id: "photo-20", src: "/images/photography/20240704_175539.jpg", title: "Festive Atmosphere", category: "Event", size: "wide" },
  { id: "photo-21", src: "/images/photography/20240704_180423.jpg", title: "Summer Festival", category: "Event", size: "tall" },
  { id: "photo-22", src: "/images/photography/20240704_180538.jpg", title: "Crowd Energy", category: "Event", size: "medium" },
  { id: "photo-23", src: "/images/photography/20240712_210010.jpg", title: "Evening Ambiance", category: "Urban", size: "small" },
  { id: "photo-24", src: "/images/photography/20240713_065705.jpg", title: "Morning Mist", category: "Nature", size: "large" },
  { id: "photo-25", src: "/images/photography/20240713_122302.jpg", title: "Midday Scene", category: "Landscape", size: "medium" },
  { id: "photo-26", src: "/images/photography/20240713_151221.jpg", title: "Afternoon Light", category: "Nature", size: "small" },
  { id: "photo-27", src: "/images/photography/20240803_184432.jpg", title: "Dusk Moments", category: "Landscape", size: "wide" },
  { id: "photo-28", src: "/images/photography/IMG_0725.jpg", title: "Natural Beauty", category: "Nature", size: "tall" },
  { id: "photo-29", src: "/images/photography/IMG_20220806_174817_396.jpg", title: "Creative Angle", category: "Creative", size: "medium" },
  { id: "photo-30", src: "/images/photography/IMG_20240803_210044.jpg", title: "Night Photography", category: "Urban", size: "large" },
  { id: "photo-31", src: "/images/photography/PSX_20240717_043437.jpg", title: "Edited Scene", category: "Creative", size: "small" },
  { id: "photo-32", src: "/images/photography/PSX_20240717_043501.jpg", title: "Artistic Edit", category: "Creative", size: "medium" },
  { id: "photo-33", src: "/images/photography/PSX_20240717_044925.jpg", title: "Creative Vision", category: "Creative", size: "wide" },
  { id: "photo-34", src: "/images/photography/20210903_182855.jpg", title: "Late Summer", category: "Nature", size: "small" },
  { id: "photo-35", src: "/images/photography/2020-06-04(1).jpg", title: "Early Summer", category: "Nature", size: "tall" },
  { id: "photo-36", src: "/images/photography/00100dPORTRAIT_00100_BURST20180224211719099_COVER~2.jpg", title: "Portrait Series", category: "Portrait", size: "large" },
  { id: "photo-37", src: "/images/photography/1000000219 (1).jpg", title: "Candid Moment", category: "Portrait", size: "medium" },
  { id: "photo-38", src: "/images/photography/QVZmSFl0bmlBMHVYd3JhSw.jpg", title: "Street Scene", category: "Urban", size: "small" },
  { id: "photo-39", src: "/images/photography/SmartSelect_20220905_175600_Facebook.jpg", title: "Social Capture", category: "Event", size: "wide" },
  { id: "photo-40", src: "/images/photography/image.jpg", title: "Memorable Shot", category: "Creative", size: "medium" }
];

const categories = ["All", "Landscape", "Nature", "Urban", "Architecture", "Event", "Portrait", "Creative"];

const categoryColors: Record<string, string> = {
  Landscape: "#667eea",
  Nature: "#48bb78",
  Urban: "#ed8936",
  Architecture: "#9f7aea",
  Event: "#f56565",
  Portrait: "#ed64a6",
  Creative: "#4299e1"
};

const Photography: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = activeCategory === "All" 
    ? photoGallery 
    : photoGallery.filter(photo => photo.category === activeCategory);

  return (
    <main className="photography-page-modern">
      {/* Hero Section with Parallax */}
      <motion.section 
        className="photo-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content-photo">
          <motion.h1 
            className="photo-page-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Visual Stories
          </motion.h1>
          <motion.p 
            className="photo-page-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Capturing moments that inspire and connect
          </motion.p>
        </div>
        
        {/* Floating Category Pills */}
        <motion.div 
          className="floating-categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.05 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: activeCategory === category 
                  ? `linear-gradient(135deg, ${categoryColors[category] || '#667eea'}, ${categoryColors[category] || '#764ba2'})`
                  : 'rgba(136, 171, 242, 0.1)'
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.section>

      {/* Bento Grid Gallery */}
      <section className="bento-gallery">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="photo-bento-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className={`photo-card photo-${photo.size || 'medium'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="photo-card-inner">
                  <img src={photo.src} alt={photo.title} loading="lazy" />
                  <motion.div 
                    className="photo-info"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="photo-info-content">
                      <h3>{photo.title}</h3>
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: categoryColors[photo.category] || '#667eea' }}
                      >
                        {photo.category}
                      </span>
                    </div>
                  </motion.div>
                  <div 
                    className="photo-card-gradient"
                    style={{ 
                      background: `linear-gradient(135deg, ${categoryColors[photo.category]}15 0%, ${categoryColors[photo.category]}05 100%)`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* View More CTA */}
      <motion.section 
        className="view-more-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.a 
          href="https://lightroom.adobe.com/shares/1bd278c4190442cbbdc4eccfcef0d91b"
          target="_blank"
          rel="noopener noreferrer"
          className="lightroom-cta"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="cta-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <div className="cta-text">
            <h3>Explore Full Collection</h3>
            <p>View 100+ photos in Adobe Lightroom</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="modern-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              className="lightbox-backdrop"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
            />
            <motion.button 
              className="lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </motion.button>
            <motion.div 
              className="lightbox-image-container"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto.src} alt={selectedPhoto.title} />
              <motion.div 
                className="lightbox-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>{selectedPhoto.title}</h2>
                <span 
                  className="lightbox-category"
                  style={{ backgroundColor: categoryColors[selectedPhoto.category] }}
                >
                  {selectedPhoto.category}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Photography;
