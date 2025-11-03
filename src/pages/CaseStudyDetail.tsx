import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";
import AnimatedSection from "../components/animations/AnimatedSection";
import { getCaseStudyDiagrams } from "../components/diagrams/caseStudyDiagrams";
import { trackPortfolioEngagement, createTimeTracker } from "../utils/analytics";
import "./CaseStudyDetail.css";

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const diagrams = slug ? getCaseStudyDiagrams(slug) : [];

  // Track case study view
  useEffect(() => {
    if (caseStudy && slug) {
      trackPortfolioEngagement.caseStudyView(slug, caseStudy.title);
      const timeTracker = createTimeTracker(`/case-studies/${slug}`);

      return () => {
        timeTracker.stop();
      };
    }
  }, [caseStudy, slug]);

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <main className="case-study-detail-modern">
      {/* Hero Section */}
      <motion.section
        className="detail-hero"
        data-hero-bg-color={caseStudy.color || '#88ABF2'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="detail-hero-content">
          <Link to="/case-studies" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Case Studies
          </Link>

          {caseStudy.icon && (
            <motion.div
              className="hero-icon-large"
              data-icon-bg-color={caseStudy.color || '#88ABF2'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="icon-large" data-icon-shadow-color={caseStudy.color || '#88ABF2'}>
                {caseStudy.icon}
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="detail-title">{caseStudy.title}</h1>
            <p className="detail-tagline">{caseStudy.tagline}</p>
          </motion.div>

          <motion.div
            className="detail-meta"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="meta-categories">
              {caseStudy.category.map(cat => (
                <span
                  key={cat}
                  className="meta-category"
                  data-category-color={caseStudy.color || '#88ABF2'}
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="meta-tags">
              {caseStudy.tags.map(tag => (
                <span key={tag} className="meta-tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Metrics Showcase */}
      <AnimatedSection delay={0.2}>
        <section className="metrics-modern">
          <motion.div
            className="metrics-container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudy.metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="metric-modern-card"
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div
                  className="metric-accent"
                  data-metric-color={caseStudy.color || '#88ABF2'}
                />
                <div className="metric-modern-value">{metric.value}</div>
                <div className="metric-modern-label">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </AnimatedSection>

      <div className="content-sections">
        <AnimatedSection delay={0.3}>
          <section className="content-section challenge">
            <div className="section-icon">⚠️</div>
            <h2>The Challenge</h2>
            <div className="section-content">
              {caseStudy.fullContent?.challenge ? (
                caseStudy.fullContent.challenge.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{caseStudy.challenge}</p>
              )}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <section className="content-section strategy">
            <div className="section-icon">🎯</div>
            <h2>The Strategy & Solution</h2>
            <div
              className="section-content"
              dangerouslySetInnerHTML={{
                __html: caseStudy.fullContent?.strategy
                  ? caseStudy.fullContent.strategy
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong>')
                      .replace(/^- (.*?)$/gm, '<li>$1</li>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(.+)$/gm, '<p>$1</p>')
                  : `<p>${caseStudy.strategy}</p>`
              }}
            />

            {/* Visual Architecture Diagrams */}
            {diagrams.length > 0 && (
              <div className="architecture-diagrams">
                {diagrams.map((DiagramComponent, index) => (
                  <DiagramComponent key={index} />
                ))}
              </div>
            )}
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <section className="content-section impact">
            <div className="section-icon">🚀</div>
            <h2>The Value & Impact</h2>
            <div
              className="section-content"
              dangerouslySetInnerHTML={{
                __html: caseStudy.fullContent?.impact
                  ? caseStudy.fullContent.impact
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong>')
                      .replace(/^- (.*?)$/gm, '<li>$1</li>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(.+)$/gm, '<p>$1</p>')
                  : `<p>${caseStudy.impact}</p>`
              }}
            />
          </section>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.6}>
        <section className="cta-section">
          <div className="cta-content">
            <h3>Interested in similar results?</h3>
            <p>Let's discuss how I can help transform your marketing systems.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn primary">
                Start a Conversation
              </Link>
              <Link to="/case-studies" className="cta-btn secondary">
                View More Case Studies
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default CaseStudyDetail;