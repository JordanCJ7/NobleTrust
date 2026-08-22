# NobleTrust Insurance Website

A responsive website for NobleTrust Insurance company, established in 2005, showcasing comprehensive insurance products and services with a modern, user-friendly interface. The site presents NobleTrust as a trusted provider of life, health, vehicle, and property insurance solutions with over 20 years of industry experience.

## Project Status

**Current Version**: 1.0.0  
**Last Updated**: June 2025  
**Status**: Active Development

This project is a fully responsive, static website built with HTML, CSS (via Sass), and vanilla JavaScript. It serves as the online presence for NobleTrust Insurance, allowing potential customers to explore insurance offerings, learn about the company, and make contact for quotes and information.

The website focuses on creating a professional, trustworthy impression while providing an intuitive user experience across all device sizes. The design emphasizes NobleTrust's core values of integrity, customer-centricity, and transparency.

## Features

- Responsive design that works on mobile, tablet, and desktop devices
- Image slider on the homepage showcasing different insurance types
- Product showcase with detailed information about insurance packages:
  - Gold Health Plan with cashless hospitalization and annual checkups
  - Gold Life Cover for family protection
  - Vehicle insurance plans
  - Property insurance coverage
  - Custom business solutions
- Contact form for inquiries with email and phone contact options
- Customer feedback system featuring testimonials from satisfied clients
- About page with company history, mission, vision, and team information
- Smooth page transitions and loading animations between all pages

## Technologies Used

- HTML5 for semantic structure and content
- CSS3 for styling and responsive design
- Sass (SCSS) for modular, maintainable CSS organization
- JavaScript (vanilla) for interactive features and page transitions
- Node.js and npm for development tools and Sass compilation

## Project Structure

```
NobleTrust/
├── css/
│   ├── styles.css              # Compiled CSS file
│   ├── styles.css.map          # Source map for debugging
│   └── scss/                   # Sass source files
│       ├── _about.scss         # About page styles
│       ├── _contact.scss       # Contact page styles
│       ├── _feedback.scss      # Feedback page styles
│       ├── _footer.scss        # Footer styles
│       ├── _header.scss        # Header styles
│       ├── _homepage.scss      # Homepage specific styles
│       ├── _mixins.scss        # Sass mixins
│       ├── _packages.scss      # Packages page styles
│       ├── _reset.scss         # Base reset styles
│       ├── _slider.scss        # Image slider styles
│       ├── _transitions.scss   # Page transition effects and animations
│       ├── _variables.scss     # Sass variables
│       └── main.scss           # Main Sass file that imports all partials
├── images/                     # Optimized WebP image assets & favicons
│   ├── Logo.png                # Master company logo
│   ├── Logo.webp               # Optimized logo
│   ├── CJ.webp                 # CEO photo (Janitha Gamage)
│   ├── Damidu.webp             # Head of Customer Relations photo
│   ├── Savidu.webp             # Claims Manager photo
│   ├── LI 1.webp               # Life Insurance image
│   ├── LI 2.webp               # Health Insurance image
│   ├── LI 3.webp               # Vehicle Insurance image
│   ├── LI 4.webp               # Property Insurance image
│   ├── favicon-32x32.png       # 32x32 browser tab favicon
│   ├── favicon.png             # General favicon
│   ├── icon-192.png            # PWA manifest 192x192 icon
│   └── icon-512.png            # PWA manifest 512x512 icon
├── js/
│   └── scripts.js              # JavaScript functionality
├── site.webmanifest            # Progressive Web App manifest
├── favicon.ico                 # Fallback browser icon
├── about.html                  # About page with company info and team
├── contact.html                # Contact page with form and contact details
├── feedback.html               # Customer testimonials and feedback form
├── index.html                  # Homepage with slider and company overview
├── packages.html               # Insurance packages and product details
└── package.json                # Node.js package file for Sass compilation
```

## Sass Implementation

This project uses Sass (SCSS syntax) for more maintainable and organized CSS. The styles are structured following a component-based approach with the 7-1 pattern (adapted):

- **_variables.scss**: Contains all color definitions, font settings, spacing variables, and breakpoints
- **_mixins.scss**: Contains reusable style patterns including:
  - Flexbox helpers (`flex-center`, `flex-column`)
  - Media query mixins for responsive design
  - Button styling mixins
  - Animation and transition mixins
- **_reset.scss**: Base reset and global styles for consistent cross-browser rendering
- **_transitions.scss**: Page transition animations and loading effects
- **Layout components**:
  - **_header.scss**: Navigation and site header styles
  - **_footer.scss**: Site footer and bottom navigation
  - **_slider.scss**: Image carousel implementation
- **Page-specific styles**:
  - **_homepage.scss**: Styles for the landing page and overview sections
  - **_packages.scss**: Insurance product cards and pricing tables
  - **_contact.scss**: Contact form and information display
  - **_feedback.scss**: Testimonial styling and feedback form
  - **_about.scss**: Company information, team profiles, and history section

The main.scss file imports all partials in the correct order to ensure proper cascade and specificity.

## Page Transitions

The site features smooth page transitions with a loading animation:

- Transition overlay appears when navigating between pages using the primary color scheme
- Custom loader animation with dual-circle design provides visual feedback during page load
- Smooth fade-in and fade-out effects enhance the user experience with 0.5s transition duration
- Implemented using CSS transitions and JavaScript timing controls
- Overlay is automatically triggered on page load and when clicking navigation links

## Getting Started

### Prerequisites

- Node.js and npm (for Sass compilation)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/JordanCJ7/NobleTrust.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile Sass to CSS:
   ```
   npm run sass
   ```

4. For development with auto-recompilation:
   ```
   npm run sass:watch
   ```

## Development

To modify styles:

1. Edit the appropriate .scss file in the css/scss directory
2. The changes will be automatically compiled to styles.css if you're running sass:watch
3. If not running the watch script, manually compile with `npm run sass`

## Insurance Products

NobleTrust offers a comprehensive range of insurance products:

1. **Gold Health Plan**
   - Cashless hospitalization
   - Annual health checkups
   - Family floater plans
   - Wellness rewards

2. **Gold Life Cover**
   - Comprehensive life insurance
   - Flexible terms
   - High coverage
   - Quick claim processing

3. **Vehicle Insurance**
   - Protection for cars, motorcycles, and other vehicles
   - Comprehensive coverage options
   - Roadside assistance

4. **Property Insurance**
   - Home and valuable asset protection
   - Natural disaster coverage
   - Theft and damage protection

5. **Custom Business Solutions**
   - Tailored packages for businesses
   - Industry-specific coverage options
   - Risk management services

## Company Overview

NobleTrust Insurance was founded in 2005 with a mission to deliver affordable, flexible, and transparent insurance coverage. The company has grown to become a trusted industry leader with a strong focus on customer-centricity and innovation.

### Core Values
- **Integrity**: Upholding the highest ethical standards
- **Customer-Centricity**: Placing customer needs at the center of all decisions
- **Innovation**: Continuously improving products and services
- **Transparency**: Providing clear, honest communication
- **Community**: Making a positive impact in served communities

## Build Process

For production builds, use the compressed output option:
```
npm run build
```

This will generate a minified CSS file for production use.

## Design and UI Elements

### Color Scheme
The NobleTrust website uses a carefully selected color palette that conveys trust, stability, and premium service:

- Primary color: Gold (#ffd700) - Represents prestige, value, and excellence
- Primary dark: #bfa100 - Used for hover states and depth
- Background: Light off-white (#f8f8f8) - Provides a clean, professional appearance
- Text colors: Various shades from #222 to #555 - Ensures readability and hierarchy
- Accents: Light cream (#fffbe6) and cream (#faf3c0) - Complement the gold tones

### Typography
- Primary font: Arial, sans-serif - Chosen for excellent readability across devices
- Hierarchical type scale:
  - Base font size: 1rem
  - Headings scale from 1.2rem to 2.5rem
  - Careful line spacing enhances readability

### Responsive Design Implementation
The website employs a mobile-first approach with responsive breakpoints:

- **Mobile view** (< 768px): Single column layout, optimized navigation
- **Tablet view** (768px - 1024px): Two-column grids, expanded navigation
- **Desktop view** (> 1024px): Multi-column layout with enhanced visual elements

The responsive implementation uses:
- Fluid typography with rem units
- Flexbox for component layouts
- CSS Grid for page structure
- Media queries to adjust layouts at breakpoints

### Navigation
- Horizontal navigation bar on desktop
- Collapsible menu on mobile devices
- Current page highlighting
- Smooth hover transitions

### Component Design
- Card-based layout for insurance packages
- Testimonial blocks with quotation styling
- Team member profiles with circular image frames
- Contact form with accessible input styling

## JavaScript Functionality

The website uses vanilla JavaScript to implement several interactive features:

1. **Image Slider**
   - Automatic rotation of insurance product images
   - Touch-enabled swiping on mobile devices
   - Pause on hover functionality

2. **Page Transitions**
   - Event listeners for navigation links
   - DOM manipulation to show/hide the transition overlay
   - Timing control for consistent animation duration

3. **Form Validation**
   - Real-time input validation
   - Custom error messages
   - Form submission handling

4. **Responsive Navigation**
   - Toggle functionality for mobile menu
   - Active state management

## Cross-Browser Compatibility

The website has been tested and optimized for:

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)
- Mobile browsers (iOS Safari, Android Chrome)

## Accessibility Features

The NobleTrust website implements several accessibility features:

- Semantic HTML5 structure for better screen reader compatibility
- ARIA attributes where appropriate for interactive elements
- Sufficient color contrast ratios meeting WCAG AA standards
- Keyboard navigable interface
- Alt text for all images
- Focus states for interactive elements
- Proper heading hierarchy

## Performance Optimization

The website employs several performance optimization techniques:

1. **CSS Optimization**
   - Sass compilation with compression for production
   - Critical CSS inlining for above-the-fold content
   - Efficient selector specificity

2. **JavaScript Performance**
   - Vanilla JS without heavy frameworks
   - Event delegation for efficient event handling
   - Debounced event handlers for scroll and resize events

3. **Asset Optimization**
   - Optimized image sizes and formats
   - Lazy loading for below-the-fold images
   - Minimal HTTP requests

## Deployment Guidelines

For deploying the NobleTrust website to production:

1. Run the production build:
   ```
   npm run build
   ```

2. Verify all assets are properly referenced with correct paths

3. Test the production build on a staging environment

4. Implement a caching strategy for static assets

5. Deploy to the production server via FTP or version-controlled deployment

## Future Enhancements

Planned future enhancements for the NobleTrust website:

1. **Technical Improvements**
   - Integration with a CMS for content management
   - Implementation of a quote calculator tool
   - Addition of a blog section for insurance tips and news
   - Customer portal for account management

2. **Design Enhancements**
   - Dark mode toggle
   - Enhanced animations and micro-interactions
   - Improved mobile navigation experience
   - Multi-language support

3. **Business Features**
   - Online policy purchasing
   - Live chat support
   - Integrated claims filing process
   - Customer dashboard for policy management