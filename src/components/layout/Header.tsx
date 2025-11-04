import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import { BRAND_TAGLINE, CTA_PRIMARY } from "../../config/nav";
import "@/styles/header.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // mobile nav toggle id for aria-controls
  const mobileNavId = 'mobile-navigation';

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
          id="mobile-nav-toggle"
          type="button"
          className="bc-mobile-toggle"
          aria-controls={mobileNavId}
          // aria-expanded must be a boolean (true/false), not a string/template
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">{mobileOpen ? 'Close' : 'Open'} navigation</span>
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <NavMobile
        id={mobileNavId}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
};

export default Header;

