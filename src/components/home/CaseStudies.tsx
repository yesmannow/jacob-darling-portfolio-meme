import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { useNavigate } from "react-router-dom";

const caseStudies = [
  { slug: "graston-dashboard", title: "Graston Dashboard", cover: "./case-studies/graston-dashboard/cover.webp" },
  { slug: "cinematic-portfolio", title: "Cinematic Portfolio", cover: "./case-studies/cinematic-portfolio/cover.webp" },
  { slug: "branding-reel", title: "Branding Reel", cover: "./case-studies/branding-reel/cover.webp" },
];

const CaseStudies: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="case-studies"
      style={{
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem'
      }}
      {...motionTokens.fadeIn}
    >
      {caseStudies.map((study, index) => (
        <motion.div
          key={index}
          className="case-study-card"
          style={{
            backgroundImage: `url(${study.cover})`,
            backgroundSize: 'cover',
            borderRadius: '8px',
            height: '200px',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05, boxShadow: 'var(--glow-brand)' }}
          onClick={() => navigate(`/case-studies/${study.slug}`)}
        >
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <h3>{study.title}</h3>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default CaseStudies;
