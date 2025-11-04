// Placeholder navigation config for Bear Cave Marketing portfolio.
// Replace with full navigation structure during rebuild.

export type NavChild = {
  label: string;
  href: string;
  trackingId?: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  trackingId?: string;
  external?: boolean;
  children?: NavChild[];
};

export const BRAND_TAGLINE = "Marketing Strategist & Systems Architect";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", trackingId: "nav_home" },
  { label: "About", href: "/about", trackingId: "nav_about" },
  { label: "Projects", href: "/projects", trackingId: "nav_projects" },
  { label: "Dashboard", href: "/dashboard", trackingId: "nav_dashboard" },
  { label: "Contact", href: "/contact", trackingId: "nav_contact" },
];

export const CTA_PRIMARY = {
  label: "Talk Strategy",
  href: "/contact",
  trackingId: "nav_cta_contact",
};
