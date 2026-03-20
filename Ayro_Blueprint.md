# Ayro (SaaS Template) - Frontend Replication Blueprint

## 1. Global Design System

Based on the Framer-generated CSS architecture, the Ayro design system is highly tokenized with full native support for both Light and Dark modes (`prefers-color-scheme: dark`).

### Colors & Theming
The template uses a robust variable system that flips gracefully for dark mode:
- **Primary Brand (`--token-c5446a54-80de-4f79-b24b-55997bf1fe5e`)**: `#ec6c36` (Vibrant Orange). In dark mode, it brightens slightly to `#f0703b`.
- **Base Background**: Defaults to `--token-681ab5da...` (`#fff`). Flips to `#0d0d0d` in dark mode.
- **Secondary Background**: `--token-5087bb56...` (`#fafafa`). Flips to `#121212` in dark mode.
- **Primary Text (`--token-c5c4fdcb...`)**: `#0d0d0d` (Near Black). Flips to `#ededed` in dark mode.
- **Muted Text (`--token-797a2fb4...`)**: `#0d0d0d99` (60% opacity black). Flips to `#ededed99` in dark mode.
- **Borders (`--token-68c05b50...`)**: `#e8e8e8` (Light gray border). Flips to `#1c1c1c` in dark mode.
- **Success/Green (`--token-05a93a3d...`)**: `#3db15e`.

### Typography
Ayro distinguishes itself with a rich, multi-font stack for different content types:
- **Base UI & Body**: `Inter` (Weights 400, 500, 600, 700, 900). Default UI size is `14px` or `16px`.
- **Display Headlines**: `Satoshi` (Weight 500). Used for massive, clean geometric headers.
- **Secondary/Alternative Body**: `Figtree`.
- **Technical/Code Data**: `Fragment Mono`.
- **Headline Scaling Rules (H1/Display)**:
  - **Desktop (1280px+)**: `64px` font size, `-2px` letter-spacing, `100%` line-height.
  - **Tablet (810px - 1279px)**: `52px` font size, `-1px` letter-spacing, `110%` line-height.
  - **Mobile (< 810px)**: `40px` font size, `0px` letter-spacing, `120%` line-height.

### Spacing & Breakpoints
Layouts use heavily structured flexbox columns with rigid gap definitions:
- **Breakpoints**: 
  - Desktop: [(min-width: 1280px)](file:///Users/gustavoflemingmartins/Downloads/SER/HTMLs/Ayro%20-%20SaaS%20Framer%20Template.html#162-163)
  - Tablet: [(min-width: 810px) and (max-width: 1279.98px)](file:///Users/gustavoflemingmartins/Downloads/SER/HTMLs/Ayro%20-%20SaaS%20Framer%20Template.html#162-163)
  - Mobile: [(max-width: 809.98px)](file:///Users/gustavoflemingmartins/Downloads/SER/HTMLs/Ayro%20-%20SaaS%20Framer%20Template.html#162-163)
- **Macro Spacing**: Sections use deep padding (e.g., `160px 64px 48px` on desktop) and massive flex gaps (`gap: 128px` between major bento/feature blocks).
- **Container Widths**: Max width caps at `1440px` with central content typically constrained to `1280px` or narrower text columns `500px`/`650px`.

---

## 2. Animations & Micro-interactions

As a Framer template, animations are driven by React Framer Motion (inline JS styles), but the CSS lays the groundwork for high performance.
- **Hardware Acceleration**: Global `--framer-will-change-override: transform` ensures layers are promoted to the GPU.
- **Navigation Interaction**: Links (`a.framer-text`) transition gracefully. Hover states shift `color` to the primary brand or `#000` depending on the block, modifying `--framer-link-hover-text-color`.
- **Sticky Elements**: The floating top navigation uses `position: fixed` or `position: sticky` with `top: 40px` (or `top: 32px` on mobile), sitting just below the viewport edge for a "floating island" effect.

---

## 3. Macro Layout & Section Hierarchy

The page architecture is built on stacked flex rows mapping down to grids.

1. **Floating Navigation (`.framer-1xkuonc-container`)**:
   - `position: fixed; z-index: 8; top: 40px; left: 50%; transform: translateX(-50%)`.
   - Instead of Edge-to-Edge, Ayro uses a pill-shaped floating header.
2. **Hero Section (`.framer-qlrful`)**:
   - `flex-flow: column; align-items: center; text-align: center; gap: 32px; padding: 160px 64px 48px`.
   - Text max-width is carefully constrained (`max-width: 500px` for subtext).
3. **Bento / Features Grid Layout (`.framer-zb867y`)**:
   - While largely flexbox (`align-items: flex-start; gap: 128px`), specific data blocks use CSS Grid (`display: grid; grid-template-columns: repeat(3, minmax(50px, 1fr))`) for perfectly balanced metric cards.
4. **Footer / Bottom Anchor (`.framer-2lbdbx-container`)**:
   - Desktop uses `position: sticky; bottom: 0` for a reveal-effect footer. Mobile resets this to `position: relative; bottom: unset`.

---

## 4. Component Library

### 1. The Floating Pill Navigation
The distinctive floating header component.
```html
<nav class="floating-nav">
  <div class="logo">Ayro</div>
  <div class="links">
    <a href="#">Features</a>
    <a href="#">Pricing</a>
  </div>
  <a href="#" class="btn-primary">Get Started</a>
</nav>
```
```css
.floating-nav {
  position: fixed;
  top: 40px; /* 32px on mobile */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: var(--token-4321a524...); /* White/Dark responsive */
  border-radius: 100px;
  padding: 12px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Assumed based on standard Framer pills */
  border: 1px solid var(--token-68c05b50...); /* Light border */
}
```

### 2. Primary Brand Button
Using the vibrant orange token.
```html
<a href="#" class="btn-primary">
  <span>Start free trial</span>
</a>
```
```css
.btn-primary {
  background-color: #ec6c36; /* Flips to #f0703b in dark mode */
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 8px; /* Or pill shape */
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, filter 0.2s ease;
}
.btn-primary:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}
```

### 3. Metric / Stat Grid Box
Used for showing data inside the bento layouts.
```html
<div class="stat-grid">
  <div class="stat-item">
    <h4>1.5M+</h4>
    <p>Active Users</p>
  </div>
  <!-- x3 -->
</div>
```
```css
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  gap: 16px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding-top: 24px;
}
.stat-item h4 {
  font-family: 'Fragment Mono', monospace; /* Used for digits */
  font-size: 24px;
  color: #0d0d0d;
}
.stat-item p {
  color: #0d0d0d99; /* 60% opacity secondary text */
  font-size: 14px;
}
```
