# NobleTrust — Technical Documentation & Architecture Guide

This document provides a comprehensive technical overview of the **NobleTrust Insurance** web platform, detailing its architecture, design system, JavaScript engine, performance optimizations, accessibility compliance, and setup workflows.

---

## 🏛️ System Architecture

NobleTrust is built as a high-performance, responsive multi-page web application (MPA) leveraging modular **Dart Sass (SCSS)**, semantic **HTML5**, and modern **vanilla JavaScript** without heavyweight framework dependencies.

```
NobleTrust/
├── css/
│   ├── styles.css                # Compiled and minified production stylesheet
│   ├── styles.css.map            # Source map for debugging
│   └── scss/                     # Modular 7-1 Sass source files
│       ├── _variables.scss       # Design tokens, color palette, breakpoints
│       ├── _mixins.scss          # Responsive media queries, flexbox, card mixins
│       ├── _reset.scss           # Cross-browser reset and box sizing
│       ├── _transitions.scss     # Full-screen page transitions and ripple loader
│       ├── _header.scss          # Header, navigation, and mobile drawer styles
│       ├── _footer.scss          # Global footer styling
│       ├── _slider.scss          # Hero carousel animation and positioning
│       ├── _homepage.scss        # Landing page, highlights, features, feedback grid
│       ├── _packages.scss        # Insurance package cards and pricing tables
│       ├── _contact.scss         # Contact cards, form layout, and embedded map
│       ├── _feedback.scss        # Testimonials, feedback form, and live feed
│       ├── _about.scss           # Company history, mission, vision, team grid
│       └── main.scss             # Master entry point importing all partials
├── images/                       # Optimized WebP image assets & favicons
│   ├── Logo.png                  # Master 1024x1024 brand logo
│   ├── Logo.webp                 # Compressed vector-crisp WebP logo (13.8 KB)
│   ├── CJ.webp                   # Janitha Gamage, CEO (64.6 KB)
│   ├── Damidu.webp               # Damidu Nayanajith, Head of Customer Relations (32.6 KB)
│   ├── Savidu.webp               # Savidu Madusanka, Claims Manager (28.8 KB)
│   ├── LI 1.webp                 # Life / Health Insurance Banner (224.4 KB)
│   ├── LI 2.webp                 # Health / Family Cover Banner (141.2 KB)
│   ├── LI 3.webp                 # Vehicle Insurance Banner (230.9 KB)
│   ├── LI 4.webp                 # Property Insurance Banner (150.2 KB)
│   ├── favicon-32x32.png         # Browser tab icon (32x32)
│   ├── favicon.png               # High-res favicon (32x32)
│   ├── icon-192.png              # PWA Manifest Icon (192x192)
│   └── icon-512.png              # PWA Manifest Icon (512x512)
├── js/
│   └── scripts.js                # Core JS: Transitions, drawer, carousel, persistence
├── site.webmanifest              # Web App Manifest for PWA installation
├── favicon.ico                   # Root fallback browser icon
├── index.html                    # Homepage (Hero carousel, overview, highlights)
├── packages.html                 # Insurance package catalog
├── about.html                    # Company legacy, leadership, and core values
├── contact.html                  # Inquiries, contact cards, interactive map
├── feedback.html                 # Testimonials and live community review submission
├── package.json                  # Node.js build configuration & scripts
├── README.md                     # Brand overview & project README
└── TECHNICAL.md                  # Detailed technical specifications (this document)
```

---

## 🎨 Design System & SCSS Architecture

The styling follows an adapted **7-1 Sass architecture pattern**, ensuring strict separation of concerns and maintainability.

### 1. Color Palette & WCAG AA Contrast Compliance
All primary text colors against their background pairings have been rigorously tuned to exceed the **WCAG AA 4.5:1 minimum contrast ratio**:

| Token Name | Hex Value | Primary Usage | Contrast Ratio |
| :--- | :--- | :--- | :--- |
| `$primary-color` | `#ffd700` | Accent gold, active badges, button backgrounds | N/A (Solid fill) |
| `$primary-color-dark` | `#7a5a00` | Headings, primary links, icons on light cards | **5.6:1** on `#ffffff` (Passes AA) |
| `$primary-color-hover`| `#5c4300` | Button hover states and active focus indicators| **8.2:1** on `#ffffff` (AAA) |
| `$background-color` | `#f8f8f8` | Primary document canvas background | — |
| `$light-cream` | `#fffbe6` | Card backgrounds, testimonial quotes | — |
| `$cream` | `#faf3c0` | Sub-element highlights and accents | — |
| `$text-color-dark` | `#222222` | Body headings and prominent copy | **16.1:1** on `#ffffff` (AAA) |
| `$text-color-medium` | `#3a3a3a` | Paragraphs and feature descriptions | **11.8:1** on `#ffffff` (AAA) |

### 2. Responsive Breakpoint Tokens
```scss
$breakpoint-mobile: 700px;  // Handheld smartphones
$breakpoint-tablet: 900px;  // Tablets and small laptop viewports
$container-width:   900px;  // Max content width
```

### 3. Reusable Mixins (`_mixins.scss`)
- `@mixin card`: Produces golden-accented frosted card surfaces.
- `@mixin card-hover`: Applies subtle 3D lift (`translateY(-8px) scale(1.03)`) and gold shadow expansion.
- `@mixin circular-image($size)`: Standardizes team avatar and highlight icon dimensions with rounded bounds.
- `@mixin mobile` and `@mixin tablet`: Clean media query abstractions.

---

## ⚙️ JavaScript Engine & Client Functionality

All application behaviors are encapsulated in a single, efficient, zero-dependency script: [`js/scripts.js`](file:///c:/Users/janit/OneDrive/Documents/GitHub/NobleTrust/js/scripts.js).

### 1. Non-Intrusive Page Transitions
- Smooth 350ms ripple overlay transition between internal navigation events.
- **Safety Checks:** Automatically suppresses transition hijacking when:
  - User holds modifier keys (`Ctrl`, `Cmd`, `Shift`, `Alt`) to open tabs.
  - Middle-mouse button clicks (`e.button !== 0`) are triggered.
  - Target URL contains an anchor (`#`), external protocol, or `target="_blank"`.
  - Link points to the currently active page.

### 2. Mobile Navigation Drawer
- Hamburger button toggles a sliding frosted-glass drawer (`backdrop-filter: blur(12px)`).
- Synchronizes ARIA states: toggles `aria-expanded="true/false"` and `aria-controls="main-nav"`.
- Features an accessible backdrop overlay that prevents background page scrolling when active.
- Keyboard accessible: closes instantly when pressing the `Escape` key.

### 3. Hero Carousel (Homepage)
- Automatic 3.5-second slide rotation across product banners.
- Intelligent pause on user interaction: halts rotation on `mouseenter` / `touchstart` and resumes on `mouseleave` / `touchend`.

### 4. Feedback System & LocalStorage Schema
- Enables immediate review publishing on [`feedback.html`](file:///c:/Users/janit/OneDrive/Documents/GitHub/NobleTrust/feedback.html).
- Submissions are validated, sanitized against XSS attacks, timestamped, and persisted in `localStorage` under `nobletrust_user_feedbacks`.
- Dynamic toast notifications provide instant visual confirmation for form submissions.

```json
[
  {
    "id": 1740211200000,
    "name": "Sarah Jenkins",
    "message": "NobleTrust processed my health claim within 24 hours. Incredible service!",
    "date": "Aug 22, 2026"
  }
]
```

---

## ⚡ Performance Optimization & Media Benchmarks

During the repository overhaul, all uncompressed legacy PNG and JPG assets were resized and re-encoded into next-generation **WebP** formats, achieving an overall **>96% bandwidth reduction**:

| Asset Name | Original Format & Size | Optimized WebP Size | Reduction |
| :--- | :--- | :--- | :--- |
| `LI 1` (Life Insurance) | PNG (4,465 KB) | **224.4 KB** | **-95.0%** |
| `LI 2` (Health Insurance)| PNG (4,862 KB) | **141.2 KB** | **-97.1%** |
| `LI 3` (Vehicle Insurance)| PNG (6,195 KB) | **230.9 KB** | **-96.3%** |
| `LI 4` (Property Insurance)| PNG (5,835 KB) | **150.2 KB** | **-97.4%** |
| `Damidu` (Team Photo) | JPG (601.5 KB) | **32.6 KB** | **-94.6%** |
| `Savidu` (Team Photo) | PNG (708.9 KB) | **28.8 KB** | **-95.9%** |
| `CJ` (CEO Photo) | JPG (139.0 KB) | **64.6 KB** | **-53.5%** |
| `Logo` (Brand Logo) | PNG (242.6 KB) | **13.8 KB** | **-94.3%** |
| **Total Media Footprint**| **23,050 KB (~23 MB)** | **886 KB (<0.9 MB)**| **>96% Savings** |

### Additional Performance Measures
- **Native Lazy Loading:** All below-the-fold icons and team photos include `loading="lazy"`.
- **Script Deferral:** `scripts.js` is loaded with the `defer` attribute to eliminate render-blocking script execution.
- **Hardware Acceleration:** SCSS animations utilize `transform` and `opacity` properties with `will-change: opacity` hints to leverage GPU rasterization.

---

## 🌐 SEO & Social Graph Integration

Every HTML document includes full Open Graph and Twitter Card metadata for rich social previews:

```html
<!-- Open Graph / Social Sharing -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="NobleTrust Insurance">
<meta property="og:title" content="NobleTrust Insurance - Comprehensive & Trusted Coverage">
<meta property="og:description" content="Affordable and reliable insurance solutions for life, health, vehicles, and property.">
<meta property="og:image" content="images/icon-512.png">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="NobleTrust Insurance - Comprehensive & Trusted Coverage">
<meta name="twitter:description" content="Affordable and reliable insurance solutions for life, health, vehicles, and property.">
<meta name="twitter:image" content="images/icon-512.png">
```

---

## 🛠️ Development & Build Tooling

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/JordanCJ7/NobleTrust.git

# Navigate into project directory
cd NobleTrust

# Install dependencies (Dart Sass)
npm install
```

### Available NPM Scripts
| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run sass` | `sass css/scss/main.scss css/styles.css` | One-time compilation of SCSS to CSS |
| `npm run sass:watch` | `sass --watch css/scss/main.scss css/styles.css` | Watch mode with auto-recompilation on file save |
| `npm run build` | `sass css/scss/main.scss css/styles.css --style compressed` | Production build generating minified CSS |

---

## 🚀 Deployment Guidelines

Because NobleTrust is a static web application, it can be deployed seamlessly to any static hosting provider:

1. **GitHub Pages:**
   - Go to **Repository Settings** > **Pages**.
   - Select the `main` branch as the source folder (`/ (root)`).
   - Save to trigger automated deployment.

2. **Vercel / Netlify / Cloudflare Pages:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `.` (root directory)
