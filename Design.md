# Admox Media — Design System Document

## 1. Brand Identity Summary

**Brand Name:** Admox Media  
**Tagline:** *Your Brand. Our Vision.*  
**Brand Archetype:** Creator (primary) + Magician (secondary)  
**Positioning:** Next-generation AI-powered creative agency

---

## 2. Color Palette

Extracted directly from the brand book PDF:

| Name         | Hex       | RGB          | Usage                        |
|--------------|-----------|--------------|------------------------------|
| Classic Linen| `#EEF7E8` | 238, 247, 232| Primary background            |
| Ocean Teal   | `#256951` | 37, 105, 81  | Primary text / CTA / accents  |
| Onyx Black   | `#252F2C` | 37, 47, 44   | Secondary text / headings     |

**Color Meanings (per brand strategy):**
- Green: Growth, intelligence, trust, innovation
- Off-White/Linen: Simplicity, clarity, sophistication
- Dark Onyx: Authority, professionalism, premium positioning

### CSS Variables
```css
--color-bg:       #EEF7E8;   /* Classic Linen */
--color-primary:  #256951;   /* Ocean Teal */
--color-dark:     #252F2C;   /* Onyx Black */
--color-white:    #FFFFFF;
--color-subtle:   #D4E8CC;   /* Linen tinted darker for dividers */
```

---

## 3. Typography

### Primary Typeface — **Sora**
- Role: Headings, display text, hero type
- Character: Clean, modern, geometric
- Google Fonts: `https://fonts.google.com/specimen/Sora`
- Weights used: 400, 600, 700, 800

### Secondary Typeface — **Space Grotesk**
- Role: Sub-headings, UI labels, navigation
- Character: Technical yet human, slightly quirky
- Google Fonts: `https://fonts.google.com/specimen/Space+Grotesk`
- Weights used: 300, 400, 500

### Body Typeface — **DM Sans** (per brand strategy body suggestion)
- Role: Body text, descriptions, small copy
- Character: Highly readable, neutral, clean
- Google Fonts: `https://fonts.google.com/specimen/DM+Sans`
- Weights used: 300, 400

### Type Scale
| Role          | Font         | Size       | Weight | Line-height |
|---------------|--------------|------------|--------|-------------|
| Hero Display  | Sora         | 80–96px    | 800    | 0.95        |
| H1            | Sora         | 56–64px    | 700    | 1.0         |
| H2            | Sora         | 40–48px    | 600    | 1.1         |
| H3            | Space Grotesk| 24–28px    | 500    | 1.3         |
| Body Large    | DM Sans      | 18–20px    | 300    | 1.7         |
| Body          | DM Sans      | 16px       | 400    | 1.7         |
| Label/UI      | Space Grotesk| 12–13px    | 500    | 1.5         |

---

## 4. Logo

- **Symbol:** Stylized "A" chevron / tent shape in Onyx Black with a 4-pointed star (sparkle) in Ocean Teal at the center base
- **Background:** Classic Linen green
- **Clear Space:** 190px minimum on each side
- **Minimum Width:** 152px / 1.58 inch
- The logo communicates: precision, creativity, a spark of AI/innovation

---

## 5. Aesthetic Direction

### Brand Aesthetic Labels (from PDF Brand Voice page)
- Geometric minimalism
- Forest-inspired modernism
- Structured serenity
- Celestial earthiness
- Refined outdoors

### Design Language Translation
| Brand Word        | Design Decision                                              |
|-------------------|--------------------------------------------------------------|
| Geometric         | Grid-based layouts, sharp spacing, clean shapes              |
| Minimalism        | Generous whitespace, single accent color, no clutter         |
| Forest-inspired   | Green palette, organic motion, subtle natural textures       |
| Modern Luxury     | Large type, editorial spacing, premium feel                  |
| AI-powered        | Subtle grid/node motifs, clean interfaces, precision         |
| Human-centric     | Warm tones, conversational copy, human faces in imagery      |

---

## 6. Spacing System

```
--space-xs:   4px
--space-sm:   8px
--space-md:   16px
--space-lg:   24px
--space-xl:   40px
--space-2xl:  64px
--space-3xl:  96px
--space-4xl:  128px
```

---

## 7. Motion Principles & WebGL

- **Page Load:** Staggered fade-up reveals (0.15s delay increments via Framer Motion)
- **Hover States:** Gentle lift + teal highlight, scale on button CTAs (framer-motion micro-interactions)
- **Transitions:** 300–500ms ease-out, never abrupt
- **Scroll Parallax (WebGL):** 
  - A programmatically generated 3D Chevron A and Star Sparkle logo motif floats in a fixed-position background canvas.
  - Position, rotation, scale, and star-separation offset interpolate smoothly in sync with scroll progress using spring-smoothed motion curves (`framer-motion`'s `useSpring`).
  - Subtle mouse-tracking tilts the object based on pointer coordinates.
- **Personality:** Calm, confident, structured, high-luxury magic

---

## 8. Component Patterns

### CTA Buttons
- Primary: Ocean Teal bg + white text, no border-radius (sharp = premium)
- Secondary: Transparent + Ocean Teal border + Teal text
- Hover: Subtle scale + shadow

### Cards
- Background: White with subtle Linen tint border
- Shadow: Very subtle, 0 4px 24px rgba(37,105,81,0.08)
- Hover: Slight lift + border teal highlight

### Dividers
- Use generous vertical padding, not horizontal rules
- Section transitions via background color shifts (Linen → White → Linen)

---

## 9. Imagery Direction

- Human + AI collaboration imagery
- Clean interfaces / tech-forward visuals
- Premium editorial photography style
- Bold typographic compositions
- AI-generated visual concepts shown as mockups

---

## 10. Next.js & Tailwind CSS v4 Theme Integration

### Tailwind CSS v4 Configuration (`app/globals.css`)
```css
@theme {
  --color-brand-linen: #EEF7E8;
  --color-brand-teal: #256951;
  --color-brand-onyx: #252F2C;
  --color-brand-subtle: #D4E8CC;

  --font-sora: var(--font-sora);
  --font-space: var(--font-space-grotesk);
  --font-sans: var(--font-dm-sans);

  --animate-marquee: marquee 25s linear infinite;
}
```

### Google Fonts Config (`app/layout.tsx`)
- **Headings:** Sora (weights: 400, 600, 700, 800) loaded as `--font-sora`
- **UI Labels/Headers:** Space Grotesk (weights: 300, 400, 500) loaded as `--font-space-grotesk`
- **Body Text:** DM Sans (weights: 300, 400) loaded as `--font-dm-sans`

