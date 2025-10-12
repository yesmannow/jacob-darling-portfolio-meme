import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinkHover, buttonHover } from "../../utils/animations";
import "./Header.css";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/applications", label: "Playground" },
    { path: "/toolbox", label: "Toolbox" },
    { path: "/projects", label: "Projects" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/resume", label: "Résumé" },
  ];

  return (
    <motion.header 
      className={`main-header ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="main-nav">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="brand">Jacob Darling</Link>
        </motion.div>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <motion.li key={item.path} whileHover={navLinkHover}>
              <Link to={item.path}>{item.label}</Link>
            </motion.li>
          ))}
          <motion.li whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="nav-cta">Contact</Link>
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;