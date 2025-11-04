// Component Schemas for Modular UI Blocks
// Defines props and layout variants for reusable components

import type { CSSProperties, ReactNode } from 'react';

export interface BaseComponentProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

// Card Components
export interface CardSchema extends BaseComponentProps {
  variant: 'case-study' | 'award' | 'metric' | 'feature' | 'testimonial';
  layout: 'grid' | 'list' | 'featured';
  size: 'sm' | 'md' | 'lg' | 'xl';
  theme: 'light' | 'dark' | 'bear-cave';
  interactive?: boolean;
  hover?: 'scale' | 'glow' | 'lift' | 'none';
  animation?: 'fade' | 'slide' | 'stagger' | 'none';
}

export interface CardContent {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  icon?: ReactNode;
  badge?: {
    text: string;
    variant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  };
  metadata?: Array<{
    label: string;
    value: string | number;
    icon?: ReactNode;
  }>;
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant: 'primary' | 'secondary' | 'ghost';
    icon?: ReactNode;
  }>;
}

// Metric Components
export interface MetricSchema extends BaseComponentProps {
  variant: 'counter' | 'progress' | 'comparison' | 'trend';
  layout: 'grid' | 'inline' | 'stacked';
  size: 'sm' | 'md' | 'lg';
  theme: 'gold' | 'green' | 'blue' | 'purple' | 'neutral';
  animated?: boolean;
  showIcon?: boolean;
  showDescription?: boolean;
}

export interface MetricData {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  color?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: number;
    period: string;
  };
}

// Navigation Components
export interface NavSchema extends BaseComponentProps {
  variant: 'header' | 'sidebar' | 'footer' | 'breadcrumb';
  layout: 'horizontal' | 'vertical';
  theme: 'light' | 'dark' | 'transparent';
  sticky?: boolean;
  collapsible?: boolean;
  showBranding?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  external?: boolean;
  children?: NavItem[];
  badge?: string;
  disabled?: boolean;
  trackingId?: string;
}

// CTA Components
export interface CTASchema extends BaseComponentProps {
  variant: 'button' | 'card' | 'banner' | 'sticky' | 'modal';
  size: 'sm' | 'md' | 'lg' | 'xl';
  theme: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  layout: 'inline' | 'stacked' | 'full-width';
  animated?: boolean;
  showIcon?: boolean;
  urgency?: 'low' | 'medium' | 'high';
}

export interface CTAContent {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
    trackingId?: string;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
    trackingId?: string;
  };
  background?: {
    image?: string;
    video?: string;
    gradient?: string;
    overlay?: boolean;
  };
}

// Layout Components
export interface SectionSchema extends BaseComponentProps {
  variant: 'hero' | 'content' | 'grid' | 'split' | 'full-width';
  spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background: 'none' | 'solid' | 'gradient' | 'pattern' | 'image';
  theme: 'light' | 'dark' | 'bear-cave';
}

export interface GridSchema extends BaseComponentProps {
  columns: number | { sm: number; md: number; lg: number; xl: number };
  gap: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

// Animation Variants
export interface AnimationSchema {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'stagger';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  stagger?: number;
  trigger?: 'onLoad' | 'onScroll' | 'onHover' | 'onClick';
}

// Theme Configuration
export interface ThemeSchema {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

// Component Registry Types
export interface ComponentDefinition {
  name: string;
  category: 'card' | 'metric' | 'nav' | 'cta' | 'layout' | 'utility';
  schema: CardSchema | MetricSchema | NavSchema | CTASchema | SectionSchema;
  defaultProps?: Record<string, any>;
  variants?: string[];
  dependencies?: string[];
}

// Export all schema types
export type ComponentSchema =
  | CardSchema
  | MetricSchema
  | NavSchema
  | CTASchema
  | SectionSchema
  | GridSchema;

export type ComponentData =
  | CardContent
  | MetricData
  | NavItem
  | CTAContent;