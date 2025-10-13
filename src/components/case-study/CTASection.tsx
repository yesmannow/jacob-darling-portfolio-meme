import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { Link } from "react-router-dom";

interface CTASectionProps {
  nextProjectSlug: string;
}

const CTASection: React.FC<CTASectionProps> = ({ nextProjectSlug }) => {
  return (
    <motion.section
      className="cta-section"
      style={{
        padding: '4rem 2rem',
        background: 'var(--gradient-brand)',
        textAlign: 'center',
        color: 'white'
      }}
      {...motionTokens.glowPulse}
    >
      <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Interested in more?</h3>
      <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>Explore the next project in our portfolio.</p>
      <Link to={`/case-studies/${nextProjectSlug}`} className="btn-primary">
        View Next Project
      </Link>
    </motion.section>
  );
};

export default CTASection;
