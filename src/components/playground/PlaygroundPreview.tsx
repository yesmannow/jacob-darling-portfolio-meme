import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { applications } from "../../data/applications";
import { staggerContainer, staggerItem, cardHover } from "../../utils/animations";
import "./PlaygroundPreview.css";

const PlaygroundPreview: React.FC = () => {
  const featuredApps = applications.slice(0, 3);

  return (
    <section className="playground-preview">
      <div className="playground-content">
        <motion.div
          className="playground-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>The Playground</h2>
          <p className="playground-subtitle">
            Theory in practice. These are live, interactive web applications I've built to solve specific business challenges.
            Feel free to explore—they're fully functional.
          </p>
        </motion.div>

        <motion.div
          className="playground-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredApps.map((app) => (
            <motion.div
              key={app.id}
              className="playground-app-card"
              variants={staggerItem}
              whileHover={cardHover}
            >
              <div className="app-card-icon">{app.id === 'clinical-compass' ? '🧭' : app.id === 'gt9-pricing-sheet' ? '🚀' : '🎓'}</div>
              <h3>{app.title}</h3>
              <p>{app.tagline}</p>
              
              <div className="app-card-features">
                {app.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="feature-icon">{feature.icon}</span>
                    <span className="feature-text">{feature.title}</span>
                  </div>
                ))}
              </div>

              <div className="app-card-actions">
                <a href={app.demoUrl} className="app-btn primary" target="_blank" rel="noopener noreferrer">
                  Launch App
                </a>
                <Link to={`/applications/${app.id}`} className="app-btn secondary">
                  Read Deep Dive
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="playground-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/applications" className="view-all-apps">
            View All Applications & Deep Dives →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaygroundPreview;