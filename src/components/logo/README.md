# JD Logo Component

Modern, animated SVG logo with professional styling that matches the site's design system.

## Features

- ✅ **Animated orbital rings** - Slow, continuous rotation
- ✅ **Pulsing connection nodes** - Staggered pulse animations
- ✅ **Flowing connection lines** - Dashed line animation
- ✅ **Floating particles** - Squares with rotation and float
- ✅ **Central glow effect** - Breathing glow on logo center
- ✅ **Letter shimmer** - Subtle glow on JD monogram
- ✅ **Responsive sizing** - Scales beautifully
- ✅ **Performance optimized** - CSS-only animations

## Usage

### Basic Usage
```tsx
import Logo from './components/logo/Logo';

<Logo />
```

### With Custom Size
```tsx
<Logo size={120} />
```

### Disable Animations
```tsx
<Logo animated={false} />
```

### Different Variants

#### Navigation Logo (Small, Subtle)
```tsx
<Logo size={50} animated={true} className="logo-nav" />
```

#### Hero Logo (Large, Full Animation)
```tsx
<Logo size={200} animated={true} />
```

#### Static Icon (No Animation)
```tsx
<Logo size={64} animated={false} className="logo-icon" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `120` | Width/height in pixels |
| `animated` | `boolean` | `true` | Enable/disable animations |
| `className` | `string` | `""` | Additional CSS classes |

## Animations

### Orbital Rings
- **Duration**: 15-25 seconds per rotation
- **Direction**: Mixed (some clockwise, some counter-clockwise)
- **Effect**: Creates depth and movement

### Connection Nodes
- **Duration**: 3 seconds per pulse
- **Delay**: Staggered (0.2s intervals)
- **Effect**: Scale 1 → 1.3 with opacity fade

### Connection Lines
- **Duration**: 4 seconds
- **Effect**: Dashed line animation flowing along paths

### Floating Squares
- **Duration**: 6 seconds
- **Effect**: Float up/down with rotation

### Central Glow
- **Duration**: 4 seconds
- **Effect**: Breathing glow effect

### Letter Glow
- **Duration**: 5 seconds
- **Effect**: Subtle shimmer on JD letters

## Color Scheme

Uses site's CSS variables:
- `--color-primary-blue` (#B8D0D9) - Main accent
- `--color-primary-dark` (#081E26) - Dark accent
- Gradients for depth and visual interest

## Performance

- Pure CSS animations (GPU accelerated)
- No JavaScript animation loops
- Optimized transform operations
- Minimal DOM manipulation
- Efficient z-indexing

## Customization

### Change Animation Speed
Edit `Logo.css`:
```css
.orbit-1 {
  animation-duration: 30s; /* Slower */
}
```

### Change Colors
Override CSS variables:
```css
.logo-container {
  --logo-color: #YOUR_COLOR;
}
```

### Disable Specific Animations
```css
.logo-container.animated .node {
  animation: none;
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 (no animations, static only)

## Examples in Site

### Header Navigation
```tsx
// src/components/layout/Header.tsx
<Logo size={50} animated={true} className="logo-nav" />
```

### Loading Screen
```tsx
<Logo size={150} animated={true} />
```

### Footer
```tsx
<Logo size={80} animated={false} className="logo-icon" />
```

## Design Philosophy

The logo represents:
- **Orbital rings**: Systems thinking, interconnected processes
- **Connection nodes**: Data points, touchpoints in customer journey
- **Floating particles**: Innovation, dynamic thinking
- **JD monogram**: Personal brand, professionalism
- **Tech aesthetic**: Modern, forward-thinking approach

## Files

- `Logo.tsx` - React component
- `Logo.css` - Styling and animations
- `README.md` - This file

## Credits

Based on the JD brand identity, designed to match the site's professional, tech-forward aesthetic with subtle, engaging animations that enhance rather than distract.
