import React from "react";
import NavLink from "./NavLink";
import { NAV_ITEMS, CTA_PRIMARY } from "../../config/nav";
import "@/styles/header.css";

const NavDesktop = () => {
  return (
    <nav className="bc-nav-desktop" aria-label="Primary navigation">
      <ul className="bc-nav-list" role="menubar">
        {NAV_ITEMS.map((item) => {
          const hasChildren = Boolean(item.children?.length);

          return (
            <li
              key={item.label}
              className={hasChildren ? "bc-nav-item bc-nav-item--has-children" : "bc-nav-item"}
              role="none"
            >
              {item.href ? (
                <NavLink
                  href={item.href}
                  trackingId={item.trackingId}
                  external={item.external}
                  className={hasChildren ? "bc-nav-link has-children" : "bc-nav-link"}
                  ariaHasPopup={hasChildren || undefined}
                  ariaExpanded={false}
                >
                  {item.label}
                </NavLink>
              ) : (
                <span className="bc-nav-link" aria-haspopup={hasChildren || undefined} aria-expanded={false}>
                  {item.label}
                </span>
              )}

              {hasChildren && (
                <ul className="bc-submenu" role="menu">
                  {item.children!.map((child) => (
                    <li key={child.label} role="none">
                      <NavLink
                        href={child.href}
                        trackingId={child.trackingId}
                        external={child.external}
                        className="bc-submenu-link"
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        <li className="bc-nav-item bc-nav-item--cta">
          <NavLink
            href={CTA_PRIMARY.href}
            trackingId={CTA_PRIMARY.trackingId}
            className="bc-nav-cta"
          >
            {CTA_PRIMARY.label}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavDesktop;

