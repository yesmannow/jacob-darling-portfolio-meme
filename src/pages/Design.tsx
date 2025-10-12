import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import { fadeInUp } from "../utils/animations";
import "./Design.css";

interface DesignItem {
  id: string;
  src: string;
  title: string;
  category: string;
  description?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

const designPortfolio: DesignItem[] = [
  // Branding & Logos
  { id: "d01", src: "/images/design/Logo 6.jpg", title: "Brand Identity System", category: "Branding", size: "large" },
  { id: "d02", src: "/images/design/Font 1.png", title: "Custom Typography", category: "Branding", size: "medium" },
  { id: "d03", src: "/images/design/AM-Logo.png", title: "AM Logo Design", category: "Branding", size: "small" },
  { id: "d04", src: "/images/design/BF MOGOGRAM final-02.jpg", title: "BF Monogram", category: "Branding", size: "small" },
  { id: "d05", src: "/images/design/logo-01.png", title: "Corporate Logo", category: "Branding", size: "medium" },
  { id: "d06", src: "/images/design/Herbs Rub Logo.png", title: "Herbs & Rub Branding", category: "Branding", size: "tall" },
  
  // Print & Advertising
  { id: "d07", src: "/images/design/2020 Forty Under 40 Ad.jpg", title: "Forty Under 40 Recognition", category: "Print", size: "wide" },
  { id: "d08", src: "/images/design/2021 Health Care Ad.png", title: "Healthcare Campaign", category: "Print", size: "large" },
  { id: "d09", src: "/images/design/Flu Shot 2021.jpg", title: "Flu Shot Awareness", category: "Print", size: "medium" },
  
  // Digital Marketing
  { id: "d10", src: "/images/design/Online Doctor Consultation Instagram Post.png", title: "Telehealth Social Post", category: "Digital", size: "medium" },
  { id: "d11", src: "/images/design/My Post (2).jpg", title: "Social Media Graphics", category: "Digital", size: "small" },
  { id: "d12", src: "/images/design/Adobe_Express_20220527_2105230.6071119382485303.png", title: "Digital Marketing Suite", category: "Digital", size: "wide" },
  
  // Sales & Promotions
  { id: "d13", src: "/images/design/25 percent sale - Spring.png", title: "Spring Sale Campaign", category: "Sales", size: "tall" },
  { id: "d14", src: "/images/design/Dog Summer Sale-1.png", title: "Summer Pet Promo", category: "Sales", size: "medium" },
  
  // Product Design
  { id: "d15", src: "/images/design/Koozie design - final.png", title: "Koozie Merchandise", category: "Product", size: "small" },
  { id: "d16", src: "/images/design/Front Updated.png", title: "Product Packaging Front", category: "Product", size: "medium" },
  { id: "d17", src: "/images/design/Back 1.png", title: "Product Packaging Back", category: "Product", size: "medium" },
  { id: "d18", src: "/images/design/ChoppedBrisketSandwich_LG.jpg", title: "Food Menu Design", category: "Product", size: "large" },
  
  // Creative Concepts
  { id: "d19", src: "/images/design/DALL·E 2024-11-13 08.06.53 - A playful, cartoonish scene showing jars labeled 'Jacob's Berry Berry Hot Sauce' filled with hot sauce containing blueberries, raspberries, and blackb.webp", title: "Hot Sauce Concept - Playful", category: "Concept", size: "wide" },
  { id: "d20", src: "/images/design/DALL·E 2024-11-13 08.13.08 - A dark, intense scene showing bottles of Jacob's Berry Berry Hot Sauce sitting on shelves. Inside the bottles, transformed blueberries, raspberries, a.webp", title: "Hot Sauce Concept - Dark", category: "Concept", size: "tall" },
  
  // Event & Racing Graphics
  { id: "d21", src: "/images/design/Blue - RBE Indy 500 Design.png", title: "Indy 500 Racing Graphics", category: "Event", size: "large" },
  { id: "d22", src: "/images/design/Jacob Brady resized.jpg", title: "Event Branding", category: "Event", size: "medium" },
  
  // Social Media Portfolio
  { id: "d23", src: "/images/design/236802803_10117457411055169_5004587858113382909_n.jpg", title: "Social Graphics Portfolio 1", category: "Digital", size: "small" },
  { id: "d24", src: "/images/design/323700270_2415730071915448_2322941324611558798_n.jpg", title: "Social Graphics Portfolio 2", category: "Digital", size: "small" },
  { id: "d25", src: "/images/design/521745_229161850524724_1718400251_n.jpg", title: "Social Graphics Portfolio 3", category: "Digital", size: "small" },
  
  // Advanced Work
  { id: "d26", src: "/images/design/IMG_20211002_204207_713.jpg", title: "Marketing Collateral", category: "Print", size: "medium" },
  { id: "d27", src: "/images/design/IMG_20211225_203321_050.jpg", title: "Holiday Campaign", category: "Print", size: "small" },
  { id: "d28", src: "/images/design/IMG_20220402_195539_486.jpg", title: "Brand Materials", category: "Branding", size: "small" },
  { id: "d29", src: "/images/design/IMG_20220513_222748_444.jpg", title: "Product Photography Styling", category: "Product", size: "wide" },
  { id: "d30", src: "/images/design/IMG_20220529_193948_726.jpg", title: "Visual Identity Set", category: "Branding", size: "tall" },
  { id: "d31", src: "/images/design/IMG_20220529_195734_101.jpg", title: "Brand Assets", category: "Branding", size: "medium" },
  { id: "d32", src: "/images/design/IMG_20220606_011741_906.jpg", title: "Marketing Suite", category: "Digital", size: "large" },
  { id: "d33", src: "/images/design/IMG_20220607_151217_860.jpg", title: "Campaign Graphics", category: "Print", size: "small" },
  { id: "d34", src: "/images/design/IMG_20220612_010021_558.jpg", title: "Promotional Design", category: "Sales", size: "medium" },
  { id: "d35", src: "/images/design/IMG_20220701_141651_802.jpg", title: "Digital Ads", category: "Digital", size: "small" },
  { id: "d36", src: "/images/design/IMG_20220709_015653_187.jpg", title: "Social Campaign", category: "Digital", size: "medium" },
  { id: "d37", src: "/images/design/IMG_20220723_183814_569.jpg", title: "Brand Experience", category: "Branding", size: "wide" },
  { id: "d38", src: "/images/design/IMG_20220901_174114_810.jpg", title: "Event Marketing", category: "Event", size: "small" },
  { id: "d39", src: "/images/design/IMG_20220904_153503_226.jpg", title: "Product Launch", category: "Product", size: "tall" },
  { id: "d40", src: "/images/design/IMG_20221023_020849_206.jpg", title: "Brand Collateral", category: "Branding", size: "medium" },
  { id: "d41", src: "/images/design/IMG_20221029_025225_059.jpg", title: "Promotional Materials", category: "Sales", size: "small" },
  { id: "d42", src: "/images/design/IMG_20221029_031339_559.jpg", title: "Marketing Campaign", category: "Print", size: "large" },
  { id: "d43", src: "/images/design/IMG_20230617_015647_366.jpg", title: "Visual Campaign", category: "Digital", size: "medium" },
  { id: "d44", src: "/images/design/bird.png", title: "Illustration Design", category: "Concept", size: "small" },
  { id: "d45", src: "/images/design/CA.jpg", title: "CA Branding", category: "Branding", size: "small" },
  { id: "d46", src: "/images/design/file_0000000040d46230b3f420ddf8f917de.png", title: "Design Concept 1", category: "Concept", size: "medium" },
  { id: "d47", src: "/images/design/file_000000009d0861f8a59c35ae82dde4b7 (1).png", title: "Design Concept 2", category: "Concept", size: "medium" },
  { id: "d48", src: "/images/design/file_00000000c524623091018296ba5b34a3.png", title: "Design Concept 3", category: "Concept", size: "large" }
];

const categories = ["All", "Branding", "Digital", "Print", "Product", "Sales", "Event", "Concept"];

const categoryColors: Record<string, string> = {
  Branding: "#f093fb",
  Digital: "#4facfe",
  Print: "#43e97b",
  Product: "#fa709a",
  Sales: "#feca57",
  Event: "#ff6b6b",
  Concept: "#a8edea"
};

const Design: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);

  const filteredDesigns = activeCategory === "All" 
    ? designPortfolio 
    : designPortfolio.filter(design => design.category === activeCategory);

  return (
    <main className="design-page-modern">
      {/* Hero Section */}
      <motion.section 
        className="design-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content-design">
          <motion.h1 
            className="design-page-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Design Portfolio
          </motion.h1>
          <motion.p 
            className="design-page-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Creating visual solutions that drive engagement and deliver results
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
                  ? `linear-gradient(135deg, ${categoryColors[category] || '#f093fb'}, ${categoryColors[category] || '#f5576c'})`
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
            className="design-bento-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                className={`design-card design-${design.size || 'medium'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedDesign(design)}
              >
                <div className="design-card-inner">
                  <img src={design.src} alt={design.title} loading="lazy" />
                  <motion.div 
                    className="design-info"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="design-info-content">
                      <h3>{design.title}</h3>
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: categoryColors[design.category] || '#f093fb' }}
                      >
                        {design.category}
                      </span>
                    </div>
                  </motion.div>
                  <div 
                    className="design-card-gradient"
                    style={{ 
                      background: `linear-gradient(135deg, ${categoryColors[design.category]}15 0%, ${categoryColors[design.category]}05 100%)`
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
          href="https://www.behance.net/your-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-cta"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="cta-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div className="cta-text">
            <h3>View Full Design Portfolio</h3>
            <p>Explore 100+ design projects on Behance</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            className="modern-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div 
              className="lightbox-backdrop"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
            />
            <motion.button 
              className="lightbox-close"
              onClick={() => setSelectedDesign(null)}
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
              <img src={selectedDesign.src} alt={selectedDesign.title} />
              <motion.div 
                className="lightbox-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>{selectedDesign.title}</h2>
                <span 
                  className="lightbox-category"
                  style={{ backgroundColor: categoryColors[selectedDesign.category] }}
                >
                  {selectedDesign.category}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Design;
