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
  { label: "About", href: "/about", trackingId: "nav_about" },
  { label: "Case Studies", href: "/case-studies", trackingId: "nav_case_studies" },
  {
    label: "Applications",
    href: "/applications",
    trackingId: "nav_applications",
    children: [
      { label: "Strategy & Architecture", href: "/applications/strategy-architecture", trackingId: "nav_applications_strategy" },
      { label: "Growth Experiments", href: "/applications/growth-experiments", trackingId: "nav_applications_growth" },
      { label: "Analytics & Attribution", href: "/applications/analytics-attribution", trackingId: "nav_applications_analytics" },
    ],
  },
  {
    label: "Design",
    href: "/design",
    trackingId: "nav_design",
    children: [
      { label: "UI/UX Systems", href: "/design/ui-ux", trackingId: "nav_design_ui" },
      { label: "Brand Systems", href: "/design/brand", trackingId: "nav_design_brand" },
      { label: "Prototypes", href: "/design/prototypes", trackingId: "nav_design_prototypes" },
    ],
  },
  {
    label: "Photography",
    href: "/photography",
    trackingId: "nav_photography",
    children: [
      { label: "Editorial", href: "/photography/editorial", trackingId: "nav_photo_editorial" },
      { label: "Product", href: "/photography/product", trackingId: "nav_photo_product" },
      { label: "Events", href: "/photography/events", trackingId: "nav_photo_events" },
    ],
  },
  { label: "Toolbox", href: "/toolbox", trackingId: "nav_toolbox" },
  { label: "Dashboard", href: "/dashboard", trackingId: "nav_dashboard" },
  { label: "Résumé", href: "/resume", trackingId: "nav_resume" },
];

export const CTA_PRIMARY = {
  label: "Talk Strategy",
  href: "/contact",
  trackingId: "nav_cta_contact",
};
