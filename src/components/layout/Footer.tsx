import React from "react";
import "./Footer.css";

const Footer: React.FC = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <h3>Jacob Darling</h3>
        <p>Marketing Strategist & Systems Architect</p>
      </div>
      <div className="footer-links">
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/case-studies">Case Studies</a></li>
            <li><a href="/applications">Applications</a></li>
            <li><a href="/design">Design</a></li>
            <li><a href="/photography">Photography</a></li>
            <li><a href="/toolbox">Toolbox</a></li>
            <li><a href="/resume">Résumé</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/JdarlingGT" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="/contact">Contact Me</a></li>
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