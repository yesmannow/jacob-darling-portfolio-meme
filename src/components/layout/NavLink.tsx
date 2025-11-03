import React from "react";
import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  trackingId?: string;
  external?: boolean;
  ariaHasPopup?: boolean;
  ariaExpanded?: boolean;
  onClick?: () => void;
};

const NavLink = ({ href, children, className, trackingId, external, ariaHasPopup, ariaExpanded, onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = !external && (location.pathname === href || (href !== "/" && location.pathname.startsWith(href)));

  if (external) {
    return (
      <a
        href={href}
        className={className}
        data-analytics={trackingId}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-haspopup={ariaHasPopup || undefined}
        aria-expanded={ariaExpanded}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={className}
      onClick={onClick}
      data-analytics={trackingId}
      aria-current={isActive ? "page" : undefined}
      aria-haspopup={ariaHasPopup || undefined}
      aria-expanded={ariaExpanded}
    >
      {children}
    </Link>
  );
};

export default NavLink;

