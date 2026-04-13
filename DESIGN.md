# DESIGN.md

Break and Shift — Design System

## 1. Visual Theme & Atmosphere

Dark noir investigation. Protagonist "境界ユウ" (Boundary Yū) guides the reader through probability theory in a philosophical, atmospheric narrative. Deep oceanic blues and silver text create an underwater feeling — as if exploring the depths of mathematical truth. Serif typography adds literary weight. HSP3Dish.js simulators embed as portals into the experiments.

Inspirations: detective noir fiction, deep-sea exploration UIs, academic textbook layouts.

## 2. Color Palette & Roles

Tailwind extended palette in `tailwind.config.js`. 7 colors total.

| Token             | Hex       | Usage                            |
| ----------------- | --------- | -------------------------------- |
| `boundary-darker` | `#050810` | Page background, body            |
| `boundary-dark`   | `#0a0e1a` | Cards, info boxes                |
| `boundary-blue`   | `#2d3e5f` | Interactive elements, nav active |
| `boundary-indigo` | `#1a2332` | Secondary containers             |
| `boundary-cyan`   | `#4a7c8c` | Accents, links, headings         |
| `boundary-silver` | `#c0c5ce` | Primary text                     |
| `boundary-mist`   | `#8b95a8` | Secondary text, dimmed content   |

Opacity modifiers used heavily: `/20`, `/30`, `/50`, `/70`, `/80`.

## 3. Typography Rules

### Font Families

| Context   | Family                       | Usage                      |
| --------- | ---------------------------- | -------------------------- |
| Narrative | `"Noto Serif JP", serif`     | Body, monologues, headings |
| UI        | `"Noto Sans JP", sans-serif` | Buttons, labels            |

Body default: `font-serif`. Both loaded from Google Fonts at 300/400/500/700.

### Type Scale

| Element       | Class                  | Notes                          |
| ------------- | ---------------------- | ------------------------------ |
| H1 (home)     | `text-5xl md:text-6xl` | Serif, silver                  |
| Chapter title | `text-3xl md:text-4xl` | Serif, `tracking-wide`, `mb-8` |
| H2            | `text-2xl`             | Serif                          |
| H3            | `text-xl`              | Cyan accent                    |
| Body          | `text-lg md:text-xl`   | `leading-relaxed`, mist color  |
| Monologue     | `text-lg md:text-xl`   | Serif, `tracking-wide`, mist   |
| Small         | `text-sm`              | Mist                           |
| Tiny          | `text-xs`              | Mist at 70% opacity            |

`.monologue` class: serif, tracked wide, relaxed leading — the protagonist's voice.

## 4. Component Stylings

### Buttons — Primary

```
px-6 py-3 bg-boundary-blue hover:bg-boundary-cyan
text-boundary-silver font-sans rounded
border border-boundary-cyan
hover:shadow-lg hover:shadow-boundary-cyan/20
transition-all duration-300
```

### Buttons — Secondary

```
px-4 py-2 bg-transparent border border-boundary-mist/30
text-boundary-mist hover:text-boundary-silver hover:border-boundary-cyan
rounded transition-all duration-300 font-sans
```

### Simulator Container

```
bg-boundary-indigo border border-boundary-blue
rounded-lg p-6 shadow-2xl backdrop-blur-sm
```

Used for monologue blocks, info boxes, chapter cards.

### Boundary Line (Section Divider)

```
h-px bg-gradient-to-r from-transparent via-boundary-cyan to-transparent
my-12 opacity-30
```

Subtle cyan gradient line between sections.

### HSP Embed

```
w-full rounded-lg overflow-hidden
border border-boundary-blue/30 bg-black
aspect-ratio: 4/3
```

Black background iframe for HSP3Dish.js simulators.

### Range Input (Sliders)

```
w-full h-2 bg-boundary-blue rounded-lg
appearance-none cursor-pointer accent-boundary-cyan
```

### Navigation Links

- Active: `bg-boundary-blue text-boundary-silver`
- Inactive: `text-boundary-mist hover:text-boundary-silver hover:bg-boundary-blue/50`
- All: `px-4 py-2 rounded transition-all duration-300`

### Chapter Cards (Home Grid)

- Base: `.simulator-container` + `hover:border-boundary-cyan`
- Title: `text-boundary-cyan group-hover:text-boundary-silver`

## 5. Layout Principles

### Container

- Max width: `max-w-4xl` (56rem)
- Padding: `px-4 sm:px-6 lg:px-8`
- Centered: `mx-auto`

### Page Structure

```
min-h-screen bg-boundary-darker
  nav (sticky top-0 z-50 backdrop-blur-md)
  flex
    aside (w-64 hidden lg:block, sticky sidebar)
    main (flex-1)
      max-w-4xl mx-auto px-4 py-12
  footer
```

### Spacing

- Section dividers: `.boundary-line` with `my-12`
- Internal sections: `space-y-6` or `space-y-12`
- Card padding: `p-6`

### Grid

- Two-column: `grid md:grid-cols-2 gap-4`
- Three-column stats: `grid grid-cols-3 gap-4`
- Four-column results: `grid grid-cols-2 md:grid-cols-4 gap-2`

## 6. Depth & Elevation

### Shadows

- Simulator container: `shadow-2xl`
- Button hover: `shadow-lg shadow-boundary-cyan/20`
- No other shadows

### Backdrop

- Navigation: `backdrop-blur-md`
- Simulator container: `backdrop-blur-sm`

### Border Radius

- Buttons: `rounded` (4px)
- Containers: `rounded-lg` (8px)
- HSP embed: `rounded-lg`

### Z-Index

- Navigation: `z-50`

## 7. Do's and Don'ts

### Do

- Use serif (Noto Serif JP) for narrative content — it defines the literary tone
- Use sans (Noto Sans JP) for UI elements only
- Apply `tracking-wide` on display text and monologues
- Use `.boundary-line` (cyan gradient divider) between major sections
- Keep the 7-color palette strict — no additional colors
- Use opacity modifiers (`/20`, `/30`, `/50`) for subtle variations
- Apply `transition-all duration-300` on all interactive elements
- Give HSP embeds black backgrounds with subtle blue borders

### Don't

- Use sans-serif for body text — serif is the narrative voice
- Add bright or warm colors — the palette is cold and oceanic
- Remove the backdrop blur from navigation
- Apply sharp shadows — only `shadow-2xl` and `shadow-lg` with cyan tint
- Break the max-w-4xl container width

### Transitions

| Context       | Duration | Notes                         |
| ------------- | -------- | ----------------------------- |
| All hover     | 300ms    | `transition-all duration-300` |
| Color changes | 300ms    | `transition-colors`           |

## 8. Responsive Behavior

### Breakpoints

| Name | Value  | Changes                         |
| ---- | ------ | ------------------------------- |
| sm   | 640px  | Padding increase                |
| md   | 768px  | Font size increase, 2-col grids |
| lg   | 1024px | Sidebar visible, wider padding  |

### Sidebar

- Desktop (lg+): `w-64`, fixed sidebar with navigation
- Mobile (< lg): hidden (mobile nav is a known TODO)

## 9. Agent Prompt Guide

### Color Quick Reference

```
boundary-darker:  #050810  (body bg)
boundary-dark:    #0a0e1a  (cards)
boundary-blue:    #2d3e5f  (interactive)
boundary-indigo:  #1a2332  (secondary containers)
boundary-cyan:    #4a7c8c  (accent, links, headings)
boundary-silver:  #c0c5ce  (primary text)
boundary-mist:    #8b95a8  (secondary text)
```

### When generating UI for this project

- Dark noir atmosphere. Cold oceanic blues only
- Noto Serif JP for narrative, Noto Sans JP for UI — never mix them wrong
- `.monologue` class for protagonist's voice: serif, tracked, relaxed leading
- 7 named colors in Tailwind config, modulated with opacity
- HSP3Dish.js embeds in iframes with black bg + subtle blue border
- Cyan gradient dividers (`.boundary-line`) between sections
- `backdrop-blur-md` on sticky navigation
- Sidebar at `w-64`, hidden on mobile
- `max-w-4xl` content container centered
- `300ms` transitions everywhere

### Color Emotion Reference

- **Darker (#050810):** The void, the unknown
- **Cyan (#4a7c8c):** Truth, revelation, the boundary
- **Silver (#c0c5ce):** Clarity, the narrator's voice
- **Mist (#8b95a8):** Uncertainty, secondary thoughts
- **Blue (#2d3e5f):** Action, interaction, choice
