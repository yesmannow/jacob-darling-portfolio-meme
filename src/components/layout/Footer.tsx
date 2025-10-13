import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <Link
          to="/about"
          className="footer-profile-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            opacity: 0.85,
            transition: "opacity 0.3s ease",
            textDecoration: "none",
            color: "inherit"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "0.85"}
        >
          <img
            src="/images/bio/241311036_10117555583372059_173429180650836298_n.webp"
            alt="Jacob Darling"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(236,72,153,0.3)"
            }}
          />
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Jacob Darling</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>Marketing Strategist & Systems Architect</p>
          </div>
        </Link>
      </div>
      <div className="footer-links">
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/applications">Applications</Link></li>
            <li><Link to="/design">Design</Link></li>
            <li><Link to="/photography">Photography</Link></li>
            <li><Link to="/toolbox">Toolbox</Link></li>
            <li><Link to="/resume">Résumé</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/JdarlingGT" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><Link to="/contact">Contact Me</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 Jacob Darling. All rights reserved.</p>
      <p className="footer-quote">"Systems create freedom."</p>
    </div>
  </footer>
);

export default Footer;