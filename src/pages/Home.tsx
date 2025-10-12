import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/hero/Hero";
import Stats from "../components/stats/Stats";
import PlaygroundPreview from "../components/playground/PlaygroundPreview";
import AnimatedSection from "../components/animations/AnimatedSection";
import { getFeaturedCaseStudies } from "../data/caseStudies";
import { fadeInUp, staggerContainer, staggerItem, cardHover } from "../utils/animations";
import "./Home.css";

const Home: React.FC = () => {
  const featuredCaseStudies = getFeaturedCaseStudies();

  return (
    <main className="home">
      <Hero />
      <Stats />
      
      {/* Playground Section */}
      <PlaygroundPreview />
      
      <AnimatedSection>
        <section className="preview case-studies-preview">
          <div className="preview-content">
            <motion.h2 variants={fadeInUp}>Featured Case Studies</motion.h2>
            <motion.p variants={fadeInUp}>
              Real projects. Real results. Measurable impact.
            </motion.p>
            
            <motion.div 
              className="preview-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {featuredCaseStudies.map((study) => (
                <motion.div
                  key={study.slug}
                  variants={staggerItem}
                  whileHover={cardHover}
                >
                  <Link to={`/case-studies/${study.slug}`} className="preview-card">
                    <h3>{study.title}</h3>
                    <p className="card-tagline">{study.tagline}</p>
                    <div className="card-metrics-preview">
                      {study.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="metric-item">
                          <span className="value">{metric.value}</span>
                          <span className="label">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="card-tag">
                      {study.category.join(" • ")}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/case-studies" className="view-all">
                View All Case Studies →
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <section className="preview toolbox-preview">
          <div className="preview-content">
            <h2>My Toolbox</h2>
            <p>The systems and software that power my work</p>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/toolbox" className="view-all">Explore Tools →</Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection delay={0.3}>
        <section className="preview testimonials-preview">
          <div className="preview-content">
            <h2>What People Say</h2>
            <p>Trusted by businesses and teams worldwide</p>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/testimonials" className="view-all">Read Testimonials →</Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default Home;