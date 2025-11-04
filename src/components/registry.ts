// Component Registry for Modular UI Blocks
// Exposes components for assistant use with schema-driven configuration

import type { ComponentDefinition, ComponentSchema, ComponentData } from '../data/componentSchemas';

// Import all modular components
import CaseStudyCard, { CaseStudyGrid } from './bear-cave/CaseStudyCard';
import AwardCard from './awards/AwardCard';
import MetricCounter from './bear-cave/MetricCounter';
import Stats from './stats/Stats';
import GlanceMetrics from './home/GlanceMetrics';
import CTA from './home/CTA';
import Contact from './home/Contact';
import MobileStickyCTA from './business/MobileStickyCTA';
import Header from './layout/Header';
import NavDesktop from './layout/NavDesktop';

// Component Registry Map
export const componentRegistry: Record<string, ComponentDefinition> = {
  // Card Components
  'case-study-card': {
    name: 'CaseStudyCard',
    category: 'card',
    schema: {
      variant: 'case-study',
      layout: 'grid',
      size: 'lg',
      theme: 'bear-cave',
      interactive: true,
      hover: 'scale',
      animation: 'stagger'
    } as any,
    defaultProps: {
      featured: false,
      layout: 'grid'
    },
    variants: ['grid', 'list', 'featured'],
    dependencies: ['CaseStudy']
  },

  'case-study-grid': {
    name: 'CaseStudyGrid',
    category: 'card',
    schema: {
      variant: 'case-study',
      layout: 'grid',
      size: 'lg',
      theme: 'bear-cave',
      interactive: true,
      hover: 'scale',
      animation: 'stagger'
    } as any,
    defaultProps: {
      layout: 'grid',
      maxItems: undefined,
      featuredFirst: true
    },
    variants: ['grid', 'list'],
    dependencies: ['CaseStudy[]']
  },

  'award-card': {
    name: 'AwardCard',
    category: 'card',
    schema: {
      variant: 'award',
      layout: 'grid',
      size: 'md',
      theme: 'dark',
      interactive: true,
      hover: 'glow',
      animation: 'stagger'
    } as any,
    defaultProps: {
      index: 0
    },
    variants: ['default'],
    dependencies: ['Award']
  },

  // Metric Components
  'metric-counter': {
    name: 'MetricCounter',
    category: 'metric',
    schema: {
      variant: 'counter',
      layout: 'grid',
      size: 'lg',
      theme: 'gold',
      animated: true,
      showIcon: true,
      showDescription: true
    } as any,
    defaultProps: {
      layout: 'grid',
      maxItems: undefined,
      animated: true
    },
    variants: ['grid', 'inline'],
    dependencies: ['Metric[]']
  },

  'stats': {
    name: 'Stats',
    category: 'metric',
    schema: {
      variant: 'counter',
      layout: 'grid',
      size: 'md',
      theme: 'neutral',
      animated: true,
      showIcon: false,
      showDescription: false
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: ['Stat[]']
  },

  'glance-metrics': {
    name: 'GlanceMetrics',
    category: 'metric',
    schema: {
      variant: 'counter',
      layout: 'grid',
      size: 'md',
      theme: 'blue',
      animated: true,
      showIcon: true,
      showDescription: true
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: ['Metric[]']
  },

  // CTA Components
  'cta': {
    name: 'CTA',
    category: 'cta',
    schema: {
      variant: 'banner',
      size: 'xl',
      theme: 'primary',
      layout: 'full-width',
      animated: true,
      showIcon: true,
      urgency: 'high'
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: []
  },

  'contact': {
    name: 'Contact',
    category: 'cta',
    schema: {
      variant: 'card',
      size: 'md',
      theme: 'secondary',
      layout: 'inline',
      animated: false,
      showIcon: false,
      urgency: 'medium'
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: []
  },

  'mobile-sticky-cta': {
    name: 'MobileStickyCTA',
    category: 'cta',
    schema: {
      variant: 'sticky',
      size: 'md',
      theme: 'accent',
      layout: 'full-width',
      animated: true,
      showIcon: true,
      urgency: 'high'
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: []
  },

  // Navigation Components
  'header': {
    name: 'Header',
    category: 'nav',
    schema: {
      variant: 'header',
      layout: 'horizontal',
      theme: 'dark',
      sticky: true,
      collapsible: true,
      showBranding: true
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: ['NAV_ITEMS', 'CTA_PRIMARY', 'BRAND_TAGLINE']
  },

  'nav-desktop': {
    name: 'NavDesktop',
    category: 'nav',
    schema: {
      variant: 'header',
      layout: 'horizontal',
      theme: 'dark',
      sticky: false,
      collapsible: false,
      showBranding: false
    } as any,
    defaultProps: {},
    variants: ['default'],
    dependencies: ['NAV_ITEMS', 'CTA_PRIMARY']
  }
};

// Component Factory Function
export function createComponent(
  componentName: string,
  props: Record<string, any> = {},
  data?: ComponentData
) {
  const definition = componentRegistry[componentName];
  if (!definition) {
    throw new Error(`Component "${componentName}" not found in registry`);
  }

  // Merge default props with provided props
  const mergedProps = {
    ...definition.defaultProps,
    ...props
  };

  // Return component with merged props and data
  switch (componentName) {
    case 'case-study-card':
      return CaseStudyCard({ ...mergedProps, caseStudy: data as any });
    case 'case-study-grid':
      return CaseStudyGrid({ ...mergedProps, caseStudies: data as any });
    case 'award-card':
      return AwardCard({ ...mergedProps, award: data as any });
    case 'metric-counter':
      return MetricCounter({ ...mergedProps });
    case 'stats':
      return Stats();
    case 'glance-metrics':
      return GlanceMetrics();
    case 'cta':
      return CTA();
    case 'contact':
      return Contact();
    case 'mobile-sticky-cta':
      return MobileStickyCTA();
    case 'header':
      return Header();
    case 'nav-desktop':
      return NavDesktop();
    default:
      throw new Error(`Component "${componentName}" not implemented`);
  }
}

// Utility functions for component discovery
export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return Object.values(componentRegistry).filter(comp => comp.category === category);
}

export function getComponentVariants(componentName: string): string[] {
  const definition = componentRegistry[componentName];
  return definition?.variants || [];
}

export function getComponentDependencies(componentName: string): string[] {
  const definition = componentRegistry[componentName];
  return definition?.dependencies || [];
}

export function getAllComponentNames(): string[] {
  return Object.keys(componentRegistry);
}

// Export individual components for direct import
export {
  CaseStudyCard,
  CaseStudyGrid,
  AwardCard,
  MetricCounter,
  Stats,
  GlanceMetrics,
  CTA,
  Contact,
  MobileStickyCTA,
  Header,
  NavDesktop
};