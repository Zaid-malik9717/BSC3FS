---
name: Azure Bloom
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#41484c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#71787d'
  outline-variant: '#c0c7cd'
  surface-tint: '#2f647d'
  primary: '#2f647d'
  on-primary: '#ffffff'
  primary-container: '#aee2ff'
  on-primary-container: '#30667e'
  inverse-primary: '#9acdea'
  secondary: '#4f6073'
  on-secondary: '#ffffff'
  secondary-container: '#d2e4fb'
  on-secondary-container: '#556679'
  tertiary: '#576065'
  on-tertiary: '#ffffff'
  tertiary-container: '#d3dce2'
  on-tertiary-container: '#586166'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1e8ff'
  primary-fixed-dim: '#9acdea'
  on-primary-fixed: '#001e2b'
  on-primary-fixed-variant: '#0f4c64'
  secondary-fixed: '#d2e4fb'
  secondary-fixed-dim: '#b7c8de'
  on-secondary-fixed: '#0b1d2d'
  on-secondary-fixed-variant: '#38485a'
  tertiary-fixed: '#dbe4ea'
  tertiary-fixed-dim: '#bfc8ce'
  on-tertiary-fixed: '#141d21'
  on-tertiary-fixed-variant: '#3f484d'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is built for a premium, Gen Z-focused floral e-commerce experience. It moves away from traditional, ornate florist tropes in favor of a **minimalist, airy, and editorial aesthetic** reminiscent of high-end fashion and lifestyle digital magazines. 

The brand personality is "Fresh Sophistication"—combining the youthfulness of social media trends with the restraint of premium luxury. The UI leverages generous white space, a distinctive sky-blue signature, and a modern, tactile layout to evoke a sense of calm, delight, and effortless gifting. The visual language draws heavily from **Minimalism** and **Glassmorphism**, emphasizing high-quality imagery as the primary narrative driver.

## Colors
The palette is dominated by a "Sky & Canvas" philosophy. **Pure White (#FFFFFF)** and **Off-white (#FAFAFA)** form the base of all interfaces to ensure a breathable, high-end feel. 

- **Primary:** Soft Sky Blue (#AEE2FF) is used for key actions and brand moments. It should feel fresh and light, never heavy.
- **Secondary:** Dark Navy (#1A2B3C) provides the necessary grounding for typography and high-contrast UI elements, ensuring legibility and a premium "ink" feel.
- **Tertiary:** Very Light Blue (#F0F9FF) acts as a structural color for card backgrounds and section alternates to provide subtle depth without breaking the minimal aesthetic.

## Typography
This design system utilizes **Plus Jakarta Sans** across all levels to maintain a contemporary, rounded, and welcoming feel. 

- **Headlines:** Use "Display" roles for hero sections with generous tracking (0.02em) to mimic editorial print layouts. 
- **Body:** Keep body text clean and legible with ample line heights to support the airy aesthetic.
- **Labels:** Use the "Label-caps" style for category tags or small metadata to create a rhythmic contrast against the larger, softer headlines.

## Layout & Spacing
The layout follows a **Fluid Grid** model with extreme emphasis on vertical breathing room. 

- **Desktop:** A 12-column grid with 24px gutters. Wide outer margins (64px) keep content centered and premium.
- **Mobile:** A 4-column grid with 20px margins. 
- **Rhythm:** Use large section gaps (120px on desktop) to separate different flower collections. This prevents the "cluttered shop" feel and allows each product to be viewed as a piece of art.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Ambient Shadows** rather than harsh lines. 

- **Surfaces:** Use the Tertiary Light Blue (#F0F9FF) for cards sitting on white backgrounds.
- **Shadows:** Use a "Sky Glow" shadow—very low opacity (4-8%), large blur radius (32px+), with a slight blue tint (#1A2B3C with 0.05 alpha). 
- **Glassmorphism:** Navigation bars and sticky filters should use a backdrop blur (20px) with a semi-transparent white fill (80% opacity) to maintain the "airy" feel while scrolling through colorful imagery.

## Shapes
The shape language is **exclusively organic and soft**. 

- **Large Elements:** Product cards and hero imagery must use a minimum of 24px (rounded-lg) to 32px (rounded-xl) corner radius.
- **Interactive Elements:** Buttons and tags use a full **Pill-shape** (100px radius) to emphasize the youthful, approachable Gen Z aesthetic.
- **Containers:** Avoid any sharp 90-degree corners to maintain the gentle, premium brand voice.

## Components
- **Buttons:** Primary buttons are pill-shaped, using the Sky Blue (#AEE2FF) background with Dark Navy text. Secondary buttons should be transparent with a thin Navy border or ghost-style.
- **Product Cards:** Cards should be borderless. Use a soft shadow on hover. The image should occupy 80% of the card area, with typography tucked neatly at the bottom in the Very Light Blue surface.
- **Chips/Filters:** Use pill-shaped outlines. When active, fill with Sky Blue.
- **Input Fields:** Soft grey or light blue backgrounds with 16px corner radius. Focus states should transition to a Sky Blue border glow.
- **Interactive States:** Use subtle scale-up transforms (e.g., scale 1.02) for product cards and buttons to give a tactile, responsive feel.
- **Imagery:** All placeholders should represent high-saturation, natural lighting photography.