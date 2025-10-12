import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { applications, getAllCategories } from "../data/applications";
import { staggerContainer, staggerItem, cardHover } from "../utils/animations";
import AnimatedSection from "../components/animations/AnimatedSection";
import "./Applications.css";

const Applications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const categories = ["All", ...getAllCategories()];

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") return applications;
    return applications.filter(app => app.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="applications-page">
      <AnimatedSection>
        <section className="applications-header">
          <h1>Interactive Applications</h1>
          <p>
            Explore production-ready web applications demonstrating full-stack development,
            UX design, and complex problem-solving across marketing, sales, and clinical domains.
          </p>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="filter-bar">
          <div className="filter-container">
            <span className="filter-label">Filter by Category:</span>
            <div className="filter-buttons">
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? "active" : ""}`}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="applications-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="applications-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredApplications.map((app) => (
              <motion.div
                key={app.id}
                variants={staggerItem}
                whileHover={cardHover}
                layout
              >
                <Link to={`/applications/${app.id}`} className="application-card">
                  <div className="card-header">
                    <div className="app-icon">🚀</div>
                    <h3>{app.title}</h3>
                    <p className="tagline">{app.tagline}</p>
                  </div>
                  
                  <div className="card-body">
                    <p className="overview">{app.overview.substring(0, 150)}...</p>
                  </div>

                  {app.metrics && (
                    <div className="card-metrics">
                      {app.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="metric">
                          <span className="metric-value">{metric.value}</span>
                          <span className="metric-label">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="card-footer">
                    <div className="tags">
                      {app.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {app.tags.length > 3 && (
                        <span className="tag-more">+{app.tags.length - 3}</span>
                      )}
                    </div>
                    <div className="card-actions">
                      <span className="try-demo">Try Live Demo →</span>
                      <span className="view-details">View Details</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredApplications.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No applications found for this category.</p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Applications;