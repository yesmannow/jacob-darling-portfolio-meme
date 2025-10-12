# Portfolio Design System

## Color Palette

### Primary Colors
- **Dark Navy**: `#081E26` - Primary dark background, headers
- **Sky Blue**: `#B8D0D9` - Primary accent, CTAs, highlights
- **Light Gray**: `#D9D9D9` - Primary text, headings
- **Medium Gray**: `#737373` - Secondary text, muted content
- **Black**: `#0D0D0D` - Main background

### Usage Guidelines
- **Backgrounds**: Use `#0D0D0D` for main areas, `#081E26` for cards/sections
- **Text**: `#D9D9D9` for primary, `#B8D0D9` for secondary, `#737373` for muted
- **Accents**: `#B8D0D9` for all interactive elements, links, and highlights
- **Borders**: Use `rgba(184, 208, 217, 0.15)` for subtle borders

## Typography

### Font Families
- **Primary (Display)**: 'Gineso', 'Space Grotesk', 'Inter' - Used for headings, important text
- **Secondary (Body)**: 'Inter' - Used for body text, paragraphs

### Font Weights
- **Light**: 300 - Subtle text
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasis
- **Semibold**: 600 - Subheadings
- **Bold**: 700 - Headings
- **Extrabold**: 800 - Large display text

### Font Pairings
- **Hero Sections**: Gineso/Space Grotesk 800, 4-5rem
- **Section Headings**: Gineso/Space Grotesk 700, 2-3rem
- **Card Titles**: Gineso/Space Grotesk 700, 1.8-2rem
- **Body Text**: Inter 400, 1-1.1rem
- **Small Text**: Inter 500, 0.8-0.9rem

## Spacing System

### Base Unit: 0.25rem (4px)

- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)
- **2XL**: 4rem (64px)

## Component Styles

### Cards
- **Background**: `var(--color-bg-card)` with backdrop-filter
- **Border**: 1px solid `var(--color-border)`
- **Border Radius**: 16-20px
- **Hover**: Transform translateY(-8px), enhanced shadow
- **Shadow**: `var(--shadow-md)` default, `var(--shadow-accent)` on hover

### Buttons
- **Primary**: Gradient background, bold text, 12px radius
- **Secondary**: Transparent bg, border, hover fill
- **Padding**: 1rem 2rem (small), 1.25rem 3rem (large)
- **Font**: Primary font family, 700 weight, uppercase

### Inputs
- **Background**: `var(--color-bg-card)`
- **Border**: 1px solid `var(--color-border)`
- **Focus**: Border color changes to `var(--color-primary-blue)`
- **Border Radius**: 8px

## Shadows

- **Small**: `0 2px 8px rgba(8, 30, 38, 0.1)`
- **Medium**: `0 4px 16px rgba(8, 30, 38, 0.15)`
- **Large**: `0 8px 32px rgba(8, 30, 38, 0.2)`
- **Accent**: `0 4px 20px rgba(184, 208, 217, 0.3)`

## Animations

### Timing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - Most interactions
- **Ease**: `ease` - Simple transitions
- **Ease-in-out**: `ease-in-out` - Enter/exit animations

### Durations
- **Fast**: 0.2s - Micro-interactions
- **Standard**: 0.3s - Hover states, color changes
- **Slow**: 0.4s - Large movements, transforms
- **Very Slow**: 0.6s - Image zooms, complex animations

### Common Patterns
- **Hover Lift**: `transform: translateY(-8px)` + shadow
- **Scale**: `transform: scale(1.05)` for images
- **Fade**: `opacity: 0` → `opacity: 1`
- **Slide**: `transform: translateX(0)` from offset

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1400px

## Design Assets Location

- **Site Assets**: `/public/images/site design assests/`
- **Project Images**: `/public/images/projects/`
- **Logos**: `/public/images/logos/`
- **Design Work**: `/public/images/design/`
- **Photography**: `/public/images/photography/`

## Best Practices

1. **Consistency**: Always use CSS variables for colors and spacing
2. **Accessibility**: Maintain WCAG AA contrast ratios (4.5:1 minimum)
3. **Performance**: Use `backdrop-filter` sparingly, optimize images
4. **Animations**: Keep duration under 0.6s for smooth UX
5. **Typography**: Limit font sizes to defined scale, maintain hierarchy
6. **White Space**: Use generous spacing between sections (3-4rem)
7. **Mobile First**: Design for mobile, enhance for desktop
8. **Dark Mode**: Already dark - ensure sufficient contrast

## CSS Variable Reference

```css
/* Colors */
--color-primary-dark: #081E26
--color-primary-blue: #B8D0D9
--color-light-gray: #D9D9D9
--color-medium-gray: #737373
--color-black: #0D0D0D

/* Fonts */
--font-primary: 'Gineso', 'Space Grotesk', 'Inter', sans-serif
--font-secondary: 'Inter', sans-serif

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg, --shadow-accent
```
