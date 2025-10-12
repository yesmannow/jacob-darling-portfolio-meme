import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, getCategories } from "../data/caseStudies";
import { staggerContainer, staggerItem, cardHover } from "../utils/animations";
import AnimatedSection from "../components/animations/AnimatedSection";
import "./CaseStudies.css";

const CaseStudies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const categories = ["All", ...getCategories()];

  const filteredStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter(study => study.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="case-studies-page">
      <AnimatedSection>
        <section className="case-studies-header">
          <h1>Case Studies</h1>
          <p>Every project starts with a problem — and ends with a measurable impact.</p>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="filter-bar">
          <div className="filter-container">
            <span className="filter-label">Filter by:</span>
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

      <section className="case-studies-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="case-studies-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                variants={staggerItem}
                whileHover={cardHover}
                layout
              >
                <Link to={`/case-studies/${study.slug}`} className="case-study-card">
                  <div className="card-header">
                    <h3>{study.title}</h3>
                    <p className="tagline">{study.tagline}</p>
                  </div>
                  
                  <div className="card-body">
                    <p className="challenge-preview">
                      <strong>Challenge:</strong> {study.challenge}
                    </p>
                    <p className="strategy-preview">
                      <strong>Solution:</strong> {study.strategy}
                    </p>
                  </div>

                  <div className="card-metrics">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="metric">
                        <span className="metric-value">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="tags">
                      {study.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {study.tags.length > 3 && (
                        <span className="tag-more">+{study.tags.length - 3}</span>
                      )}
                    </div>
                    <span className="read-more">Read Case Study →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredStudies.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No case studies found for this filter.</p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default CaseStudies;