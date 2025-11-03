import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, Phone, Globe, Facebook, Youtube } from "lucide-react";
import "./Footer.css";

// Simple TikTok icon component
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// SoundCloud icon component
const SoundCloudIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.175 13.5c.352 0 .638-.143.857-.43.219-.286.38-.635.38-1.045 0-.352-.143-.638-.43-.857-.286-.219-.635-.38-1.045-.38-.41 0-.76.161-1.046.38-.287.219-.429.505-.429.857 0 .41.161.76.38 1.046.22.287.505.429.857.429zm2.343 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.286 0 .524-.1.71-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.186-.2-.424-.3-.71-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.714 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm2.43 0c.352 0 .638-.143.857-.43.219-.286.38-.635.38-1.045 0-.352-.143-.638-.43-.857-.286-.219-.635-.38-1.045-.38-.41 0-.76.161-1.046.38-.287.219-.429.505-.429.857 0 .41.161.76.38 1.046.22.287.505.429.857.429z"/>
    <path d="M21.165 12.333c-.697 0-1.263.215-1.697.645-.434.43-.651.995-.651 1.697v3.569c0 .697.217 1.263.651 1.697.434.434.999.651 1.697.651.697 0 1.263-.217 1.697-.651.434-.434.651-.999.651-1.697v-3.569c0-.702-.217-1.268-.651-1.697-.434-.43-1-.645-1.697-.645z"/>
  </svg>
);

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <Link
          to="/about"
          className="footer-profile-link"
        >
          <img
            src="/images/bio/241311036_10117555583372059_173429180650836298_n.webp"
            alt="Jacob Darling"
            className="footer-profile-image"
          />
          <div>
            <h3 className="footer-profile-title">Jacob Darling</h3>
            <p className="footer-profile-subtitle">Marketing Strategist & Systems Architect</p>
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
            <li>
              <a href="mailto:hoosierdarling@gmail.com" className="footer-link-with-icon">
                <Mail size={18} className="footer-icon" />
                <span>Email</span>
              </a>
            </li>
            <li>
              <a href="tel:317-443-8091" className="footer-link-with-icon">
                <Phone size={18} className="footer-icon" />
                <span>Phone</span>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Linkedin size={18} className="footer-icon" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/yesmannow" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Github size={18} className="footer-icon" />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href="https://bearcavemarketing.com" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Globe size={18} className="footer-icon" />
                <span>Website</span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/jacob.darling.44227/" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Facebook size={18} className="footer-icon" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@jadarlin?_r=1&_t=ZT-915gl9DL6wX" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <TikTokIcon size={18} />
                <span>TikTok</span>
              </a>
            </li>
            <li>
              <a href="https://soundcloud.com/ottodarling" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <SoundCloudIcon size={18} />
                <span>SoundCloud</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@jacobthedarling" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Youtube size={18} className="footer-icon" />
                <span>YouTube</span>
              </a>
            </li>
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
