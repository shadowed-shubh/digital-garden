---
name: Deep Harbor Garden
colors:
  surface: '#00132f'
  surface-dim: '#00132f'
  surface-bright: '#063873'
  surface-container-lowest: '#000e26'
  surface-container-low: '#001b3f'
  surface-container: '#001f46'
  surface-container-high: '#002959'
  surface-container-highest: '#00336d'
  on-surface: '#d7e3ff'
  on-surface-variant: '#bec8d1'
  inverse-surface: '#d7e3ff'
  inverse-on-surface: '#002f65'
  outline: '#88929b'
  outline-variant: '#3e4850'
  surface-tint: '#88ceff'
  primary: '#88ceff'
  on-primary: '#00344d'
  primary-container: '#0e9ad9'
  on-primary-container: '#002d43'
  inverse-primary: '#006590'
  secondary: '#d4bbff'
  on-secondary: '#3a2361'
  secondary-container: '#533d7c'
  on-secondary-container: '#c6acf4'
  tertiary: '#9fcaff'
  on-tertiary: '#003259'
  tertiary-container: '#3694eb'
  on-tertiary-container: '#002b4e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c8e6ff'
  primary-fixed-dim: '#88ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#ebdcff'
  secondary-fixed-dim: '#d4bbff'
  on-secondary-fixed: '#240b4b'
  on-secondary-fixed-variant: '#513b79'
  tertiary-fixed: '#d2e4ff'
  tertiary-fixed-dim: '#9fcaff'
  on-tertiary-fixed: '#001d36'
  on-tertiary-fixed-variant: '#00497e'
  background: '#00132f'
  on-background: '#d7e3ff'
  surface-variant: '#00336d'
typography:
  display-lg:
    fontFamily: Space Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Space Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code-block:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.7'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1100px
  gutter: 24px
  section-gap: 64px
  card-padding: 24px
---

## Brand & Style

This design system is engineered for the modern digital gardener who treats information as code. The aesthetic merges the intellectual rigor of a technical documentation site with the atmospheric depth of a late-night terminal session.

The personality is **precise, atmospheric, and immersive**. It utilizes a "Control Panel" philosophy: every piece of information is treated as a modular node within a larger knowledge graph. The visual style is a hybrid of **Minimalism** and **Glassmorphism**, leaning into deep oceanic blues and subtle luminescent accents to create a sense of focused calm. 

**Emotional Response:**
- **Clarity:** Through structured, monospaced hierarchies.
- **Focus:** Minimized distractions via a dark, high-contrast color strategy.
- **Discovery:** Soft glows and lavender accents invite exploration of hyperlinked thought.

## Colors

The palette is anchored in a deep navy spectrum to reduce eye strain during long reading sessions.

- **Background (#023671):** A deep, nocturnal navy that provides the foundational "ocean" for the garden.
- **Surface (#071e2c):** A near-black navy used for cards, panels, and code blocks to create distinct structural depth.
- **Primary / Headings (#0197d6):** A technical cyan-blue that commands attention without being jarring.
- **Secondary / Links (#af96dc):** A soft lavender-purple that stands out against the blue hues, indicating inter-connectedness.
- **Body / Tertiary (#3896ed):** A lighter, high-legibility blue specifically tuned for long-form reading.

## Typography

This design system uses a dual-font strategy to balance technical utility with reading comfort.

- **Space Mono** is used for all "Structural UI" and "Headings." This reinforces the developer-focused, "control panel" feel. It is used for headers, labels, and metadata.
- **Geist** is used for the "Content Layer." It is a highly legible, modern sans-serif that ensures the actual "garden notes" are easy to digest.

**Implementation Notes:**
- All headings should be rendered in `text_heading_hex`.
- Use `all-caps` for `label-md` to enhance the "instrument panel" aesthetic.
- Links within body text should be underlined with a 1px offset.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the central content column to ensure readability, while utilizing **Fluid Sidebars** for navigation and backlink exploration.

- **The Reading Column:** Max width of 720px, centered within the 1100px main container.
- **The Dashboard Grid:** 12-column grid for the homepage/index, with 24px gutters.
- **Rhythm:** A 4px baseline grid ensures tight vertical alignment for technical data, while larger 64px gaps separate distinct conceptual sections in the garden.
- **Mobile:** Sidebars collapse into a "Bottom Sheet" or "Hamburger Menu." Margins reduce to 16px.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Subtle Glows** rather than heavy shadows.

- **Level 0 (Base):** The Background (#023671).
- **Level 1 (Panels):** Surface (#071e2c) with a subtle 1px border (#3896ed at 10% opacity).
- **Interactive Depth:** When a card or button is hovered, it gains a "Subtle Glow"—a box-shadow of `0 0 20px 0` using the primary cyan color at 15% opacity.
- **Glassmorphism:** Use a `backdrop-filter: blur(12px)` for sticky headers and floating navigation elements to maintain visual context of the garden beneath.

## Shapes

The shape language is "Optimistically Technical." While the typography is rigid and monospaced, the containers are significantly rounded to provide a modern, "liquid" feel.

- **Standard Elements:** Buttons and input fields use `rounded-lg` (1rem).
- **Feature Elements:** Cards, Panels, and Code Blocks use `rounded-xl` (1.5rem) to create a friendly, approachable interface for complex data.
- **Icons:** Use linear, 2px stroke icons with slightly rounded terminals to match the font weight of Geist.

## Components

### Buttons
- **Primary:** Solid `primary_color_hex` with black text. No border.
- **Secondary:** Transparent with a 1px border of `primary_color_hex` and `primary_color_hex` text.
- **Ghost:** Text-only in `secondary_color_hex`, becoming underlined on hover.

### Cards & Panels
- Background: `surface_color_hex`.
- Border: 1px solid `text_primary_hex` at 10% opacity.
- Corner Radius: `rounded-xl`.

### Code Blocks
- Background: `surface_color_hex` (slightly darker, #04121a).
- Header: A small `label-md` bar showing the language and a "Copy" button.
- Syntax Highlighting: Use a palette of Cyan, Lavender, and Lighter Blue to maintain the brand aesthetic.

### Chips & Tags
- Rounded-pill shape.
- Background: `secondary_color_hex` at 10% opacity.
- Text: `secondary_color_hex`.
- Prefix: A "#" symbol in `Space Mono`.

### Input Fields
- Background: `surface_color_hex`.
- Border: 1px bottom-border only (Control Panel style), or full 1px border with `rounded-lg`.
- Focus state: Border color changes to `primary_color_hex` with a subtle cyan outer glow.

### Backlinks & Graph Nodes
- Represented as a list of "Small Cards" at the bottom of pages.
- Nodes in the visual graph should use `primary_color_hex` for the current page and `secondary_color_hex` for connected thoughts.