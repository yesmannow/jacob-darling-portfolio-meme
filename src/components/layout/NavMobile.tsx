import React, { useEffect, useRef } from "react";
import NavLink from "./NavLink";
import { NAV_ITEMS, CTA_PRIMARY } from "../../config/nav";
import "@/styles/header.css";

type NavMobileProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
};

const NavMobile = ({ id, open, onClose }: NavMobileProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>("a, button");
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="bc-mobile-overlay" role="presentation">
      <div
        className="bc-mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button type="button" className="bc-mobile-close" onClick={onClose} aria-label="Close menu">
          ×
        </button>
        <nav id={id}>
          <ul className="bc-mobile-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <NavLink
                    href={item.href}
                    trackingId={item.trackingId}
                    external={item.external}
                    className="bc-mobile-link"
                    onClick={onClose}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <span className="bc-mobile-link">{item.label}</span>
                )}
                {item.children && (
                  <ul className="bc-mobile-sublist">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <NavLink
                          href={child.href}
                          trackingId={child.trackingId}
                          external={child.external}
                          className="bc-mobile-sublink"
                          onClick={onClose}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <NavLink
                href={CTA_PRIMARY.href}
                trackingId={CTA_PRIMARY.trackingId}
                className="bc-mobile-cta"
                onClick={onClose}
              >
                {CTA_PRIMARY.label}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <button type="button" className="bc-mobile-backdrop" onClick={onClose} aria-label="Close menu" />
    </div>
  );
};

export default NavMobile;

