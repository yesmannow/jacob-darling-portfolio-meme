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
  role?: string;
};

const NavLink = ({ href, children, className, trackingId, external, ariaHasPopup, ariaExpanded, onClick, role }: NavLinkProps) => {
  const location = useLocation();
  const isActive = !external && (location.pathname === href || (href !== "/" && location.pathname.startsWith(href)));

  // Prefer native link semantics; avoid assigning role unless inside a proper widget.
  // aria-haspopup and aria-expanded must be booleans when used; only add if defined.
  const ariaProps: Record<string, boolean | string> = {};
  if (ariaHasPopup !== undefined) ariaProps['aria-haspopup'] = ariaHasPopup;
  if (ariaExpanded !== undefined) ariaProps['aria-expanded'] = ariaExpanded;
  if (role !== undefined) ariaProps['role'] = role;

  if (external) {
    return (
      <a
        href={href}
        className={className}
        data-analytics={trackingId}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...ariaProps}
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
      {...ariaProps}
    >
      {children}
    </Link>
  );
};

export default NavLink;

