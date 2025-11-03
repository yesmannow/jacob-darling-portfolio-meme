import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import { BRAND_TAGLINE, CTA_PRIMARY } from "../../config/nav";
import "@/styles/header.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bc-header" role="banner">
      <a href="#main-content" className="bc-skip-link">
        Skip to main content
      </a>
      <div className="bc-header-inner">
        <Link to="/" className="bc-brand" data-analytics="nav_logo" aria-label="Bear Cave Marketing home">
          <img src="/assets/bear-cave-marketing-logo.svg" alt="Bear Cave Marketing logo" className="bc-logo" />
          <span className="bc-tagline">{BRAND_TAGLINE}</span>
        </Link>

        <NavDesktop />

        <button
          type="button"
          className="bc-mobile-toggle"
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <NavMobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
};

export default Header;

