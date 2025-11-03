import React from "react";
import * as simpleIcons from "simple-icons";

interface SimpleIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Maps common technology names to Simple Icons slugs
 */
export const getIconSlug = (name: string): string | null => {
  const iconMap: { [key: string]: string } = {
    // Programming Languages
    "PHP": "php",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "jQuery": "jquery",
    "SQL": "sqlite",
    "CSS": "css3",
    "SCSS": "sass",
    "HTML": "html5",

    // Frontend Frameworks
    "React": "react",
    "Tailwind CSS": "tailwindcss",
    "Bootstrap": "bootstrap",
    "Webpack": "webpack",
    "Vite": "vite",
    "Framer Motion": "framer",

    // Backend & Infrastructure
    "Node.js": "nodedotjs",
    "Express": "express",
    "Apache": "apache",
    "Nginx": "nginx",
    "MySQL": "mysql",
    "PostgreSQL": "postgresql",
    "Redis": "redis",
    "MongoDB": "mongodb",

    // WordPress
    "WooCommerce": "woocommerce",
    "WordPress": "wordpress",
    "Elementor": "elementor",
    "Divi": "divi",

    // E-commerce & Payments
    "Stripe": "stripe",
    "PayPal": "paypal",

    // CDN & Security
    "Cloudflare": "cloudflare",

    // Analytics
    "GTM": "googletagmanager",
    "GA4": "googleanalytics",
    "Google Analytics": "googleanalytics",
    "Google Tag Manager": "googletagmanager",

    // Advertising
    "Google Ads": "googleads",
    "Meta Ads": "meta",
    "LinkedIn Ads": "linkedin",

    // Marketing Automation
    "FluentCRM": "fluentcrm",
    "ActiveCampaign": "activecampaign",
    "Mailchimp": "mailchimp",
    "WP Fusion": "wpfusion",
    "Zapier": "zapier",
    "Make (Integromat)": "integromat",
    "Make": "integromat",
    "Integromat": "integromat",

    // Hosting & Infrastructure
    "Vercel": "vercel",
    "Netlify": "netlify",
    "Liquid Web": "liquidweb",

    // Development Tools
    "Git": "git",
    "GitHub": "github",
    "VS Code": "visualstudiocode",
    "GitHub Actions": "githubactions",
    "Postman": "postman",

    // Design Tools
    "Figma": "figma",
    "Canva": "canva",
    "Adobe": "adobe",
    "Photoshop": "adobephotoshop",
    "Illustrator": "adobeillustrator",

    // Project Management
    "Notion": "notion",
    "Asana": "asana",
    "Trello": "trello",
    "Slack": "slack",
    "Microsoft Teams": "microsoftteams",

    // SEO & Content
    "Google Search Console": "googlesearchconsole",
    "Ahrefs": "ahrefs",
    "SEMrush": "semrush",

    // Social & Communication
    "LinkedIn": "linkedin",

    // Additional Tools
    "Wordfence": "wordfence",
    "Hotjar": "hotjar",
    "WP Rocket": "wprocket",
    "LiteSpeed": "litespeed",
    "LiteSpeed Cache": "litespeed",
    "Umami": "umami",
    "Microsoft Clarity": "microsoft",
    "Netdata": "netdata",
    "Sucuri": "sucuri",
    "Cloudflare Tunnel": "cloudflare",
    "PixelYourSite Pro": "facebook",
    "OptinMonster": "optinmonster",
    "Easy Digital Downloads": "wordpress",
    "MemberPress": "wordpress",
    "WP Fusion": "wpfusion",
  };

  // Direct lookup
  if (iconMap[name]) {
    return iconMap[name];
  }

  // Case-insensitive lookup
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(iconMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  // Try to find by slug directly (e.g., if name is already a slug)
  try {
    const icon = simpleIcons.get(name.toLowerCase());
    if (icon) return name.toLowerCase();
  } catch (e) {
    // Not found
  }

  return null;
};

/**
 * SimpleIcon component that renders icons from simple-icons
 */
const SimpleIcon: React.FC<SimpleIconProps> = ({
  name,
  size = 24,
  color,
  className = ""
}) => {
  const slug = getIconSlug(name);

  if (!slug) {
    // Fallback: return null or a placeholder
    return null;
  }

  try {
    const icon = simpleIcons.get(slug);
    if (!icon) return null;

    const iconColor = color || `#${icon.hex}`;
    const svgPath = icon.path;

    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill={iconColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{icon.title}</title>
        <path d={svgPath} />
      </svg>
    );
  } catch (error) {
    console.warn(`Icon not found for: ${name} (slug: ${slug})`);
    return null;
  }
};

export default SimpleIcon;

