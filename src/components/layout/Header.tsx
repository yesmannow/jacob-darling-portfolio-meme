import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinkHover, buttonHover } from "../../utils/animations";
import Logo from "../branding/Logo";
import "./Header.css";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    if (latest > lastScrollY && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(latest);
  });

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/side-projects", label: "Client Work" },
    { path: "/applications", label: "Playground" },
    { path: "/design", label: "Design" },
    { path: "/photography", label: "Photography" },
    { path: "/toolbox", label: "Toolbox" },
    { path: "/resume", label: "Résumé" },
  ];

  return (
    <motion.header 
      className={`main-header ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="main-nav">
        <motion.div 
          className="brand-container"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="brand">
            <Logo size={75} animated={true} className="logo-nav" />
            <span className="brand-text">Jacob Darling</span>
          </Link>
        </motion.div>
        
        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          {navItems.map((item) => (
            <motion.li key={item.path} whileHover={navLinkHover}>
              <Link to={item.path}>{item.label}</Link>
            </motion.li>
          ))}
          <motion.li whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="nav-cta">Contact</Link>
          </motion.li>
        </ul>

        {/* Mobile Hamburger */}
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className="mobile-menu"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className="nav-links mobile-nav">
          {navItems.map((item) => (
            <motion.li key={item.path} whileHover={navLinkHover}>
              <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            </motion.li>
          ))}
          <motion.li whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </motion.li>
        </ul>
      </motion.div>
    </motion.header>
  );
};

export default Header;