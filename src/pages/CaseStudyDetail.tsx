import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";
import AnimatedSection from "../components/animations/AnimatedSection";
import "./CaseStudyDetail.css";

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <main className="case-study-detail">
      <AnimatedSection>
        <div className="back-nav">
          <Link to="/case-studies" className="back-link">
            ← Back to Case Studies
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <header className="detail-header">
          <motion.div variants={fadeInUp}>
            <h1>{caseStudy.title}</h1>
            <p className="tagline">{caseStudy.tagline}</p>
          </motion.div>

          <motion.div className="header-meta" variants={fadeInUp}>
            <div className="categories">
              {caseStudy.category.map(cat => (
                <span key={cat} className="category-badge">{cat}</span>
              ))}
            </div>
            <div className="tags">
              {caseStudy.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        </header>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="metrics-showcase">
          <motion.div
            className="metrics-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseStudy.metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="metric-card"
                variants={staggerItem}
                whileHover={{
                  y: -5,
                  boxShadow: "0 12px 32px rgba(136, 171, 242, 0.2)"
                }}
              >
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
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
              {caseStudy.fullContent?.challenge.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
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
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong>')
                  .replace(/^- (.*?)$/gm, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(.+)$/gm, '<p>$1</p>') || ''
              }}
            />
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
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong>')
                  .replace(/^- (.*?)$/gm, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(.+)$/gm, '<p>$1</p>') || ''
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