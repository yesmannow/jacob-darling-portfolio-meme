import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const nav = document.querySelector(".navbar");
      const showAnim = gsap.from(nav, {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.nav
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 2rem",
      }}
    >
      <Link to="/" className="logo" style={{ color: "white", fontWeight: 700, fontSize: "1.5rem" }}>JD</Link>
      <div className="nav-links" style={{ display: "flex", gap: "1rem" }}>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/case-studies" className="nav-link">Case Studies</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
