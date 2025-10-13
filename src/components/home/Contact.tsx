import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { Link } from "react-router-dom";

const Contact: React.FC = () => {
  return (
    <motion.section
      className="contact-section"
      style={{
        padding: '4rem 2rem',
        background: 'var(--gradient-brand)',
        textAlign: 'center',
        color: 'white'
      }}
      {...motionTokens.fadeInFast}
    >
      <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Let’s Build Something Extraordinary.</h2>
      <Link to="/contact" className="btn-primary" style={{ marginTop: '2rem' }}>Contact Me</Link>
    </motion.section>
  );
};

export default Contact;
