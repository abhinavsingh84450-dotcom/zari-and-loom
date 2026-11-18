# AGENTS.md — Engineering & SEO Operating Guidelines

> **Project:** Zari & Loom — Boutique Handloom & Bridal Saree Studio  
> **Location:** Sector 12, Dwarka, New Delhi, India  
> **Target Audience:** Brides, wedding families, and connoisseurs of authentic Indian handlooms  
> **Status:** Active Specification & Development Rules

---

## 1. Core Purpose & Mission

This document defines the strict engineering, semantic HTML5, CSS architecture, JavaScript behavior, accessibility (a11y), and SEO standards for the **Zari & Loom** static website. Every automated AI agent, coding assistant, and human developer working on this codebase **must strictly adhere** to these rules. No deviations are permitted without explicit architectural review.

---

## 2. Strict HTML5 & Semantic Structure Rules

1. **Semantic Elements Only**:
   - Every page must use native semantic HTML5 landmark tags:
     - `<header>`: Site-wide brand identity and main navigation.
     - `<nav>`: Primary and secondary navigation links with appropriate `aria-label`.
     - `<main id="main-content">`: Main unique content of the page.
     - `<section>`: Thematic groupings of content with explicit heading associations.
     - `<article>`: Self-contained composition (e.g., individual collection items, craft stories, testimonials).
     - `<aside>`: Complementary or contextual notes (e.g., appointment tips, studio visiting hours callout).
     - `<footer>`: Site-wide copyright, legal links, studio location, and contact details.
   - **No "Div Soup"**: `<div>` tags are permitted **only** when strictly necessary for styling wrappers or CSS grid/flex layout containers where no semantic HTML5 tag applies.

2. **Heading Hierarchy (Strict Rule)**:
   - **Exactly ONE `<h1>` per page**: Every single page must contain one, and only one, `<h1>` representing the unique primary subject of that page.
   - **Logical Descendance**:
     - `<h1>` is followed only by `<h2>` elements for major sections.
     - Subsections within an `<h2>` block must use `<h3>`.
     - Never skip heading levels (e.g., do not jump directly from `<h1>` to `<h3>` or from `<h2>` to `<h4>`).
   - Visual size must be handled in CSS, not by misusing heading tags for styling purposes.

3. **Global Layout Uniformity (Header & Footer)**:
   - The `<header>` and `<footer>` components **must be 100% identical in markup** across all 6 pages (`index.html`, `about.html`, `collections.html`, `contact.html`, `privacy-policy.html`, `thank-you.html`).
   - The active page in the navigation must be marked using `aria-current="page"` and a shared CSS class (`.nav-link.active`).
   - A skip-to-content link (`<a href="#main-content" class="skip-link">Skip to main content</a>`) must be the very first element inside `<body>` across every page.

---

## 3. SEO, Meta Tags & On-Page Optimization Rules

1. **Title Tag Rules**:
   - Every page must have a unique, descriptive `<title>` tag.
   - Maximum length: **Under 60 characters** (including spaces).
   - Brand suffix convention: ` | Zari & Loom`
   - Pre-approved titles:
     - `index.html`: `Zari & Loom | Bridal & Handloom Sarees Dwarka` (50 chars)
     - `about.html`: `Our Heritage & Loom Artisans | Zari & Loom` (44 chars)
     - `collections.html`: `Bridal & Pure Silk Sarees | Zari & Loom` (41 chars)
     - `contact.html`: `Visit Our Dwarka Studio | Zari & Loom` (39 chars)
     - `privacy-policy.html`: `Privacy Policy | Zari & Loom Dwarka` (37 chars)
     - `thank-you.html`: `Thank You for Inquiring | Zari & Loom` (39 chars)

2. **Meta Description Rules**:
   - Every page must have a unique `<meta name="description" content="...">`.
   - Length: **Between 120 and 155 characters** (strictly under 155 characters).
   - Must contain target keywords relevant to the page and local geographic signals ("Dwarka", "New Delhi", "Handloom Sarees", "Bridal Trousseau").
   - Pre-approved meta descriptions:
     - `index.html`: `Explore handcrafted bridal sarees, pure Banarasi & Kanjeevaram weaves at Zari & Loom studio in Sector 12, Dwarka, New Delhi. Book your visit.` (140 chars)
     - `about.html`: `Discover Zari & Loom’s dedication to master weavers and authentic handloom heritage. Curating pure silks and bridal heirlooms in Dwarka, Delhi.` (146 chars)
     - `collections.html`: `Browse exclusive bridal Kanjeevarams, antique Banarasi silks, and fine Chanderi sarees crafted for weddings. Visit our Dwarka Delhi studio.` (142 chars)
     - `contact.html`: `Book a private bridal appointment at Zari & Loom in Sector 12, Dwarka, New Delhi. Call +91 98765 43210 or send an inquiry for custom drapes.` (144 chars)
     - `privacy-policy.html`: `Read the privacy policy of Zari & Loom, Dwarka, New Delhi. Learn how we protect client inquiry information and appointment consultation data.` (144 chars)
     - `thank-you.html`: `Thank you for contacting Zari & Loom, Dwarka, New Delhi. Our bridal consultant will reach out via call or WhatsApp within 24 hours.` (133 chars)

3. **Standard Head Requirements**:
   - `<meta charset="UTF-8">`
   - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   - `<meta name="robots" content="index, follow">`
   - Canonical link tag: `<link rel="canonical" href="...">`
   - Open Graph tags (`og:title`, `og:description`, `og:type`, `og:image`, `og:url`, `og:locale`) on every page.
   - Structured JSON-LD schema on `index.html` and `contact.html` for `LocalBusiness` / `Store` in Dwarka, New Delhi.

4. **Image Optimization & Alt Text**:
   - **Zero Missing Alt Text**: Every single `<img>` must contain a rich, keyword-aware, and descriptive `alt` attribute.
   - Purely decorative icons must use `aria-hidden="true"`.
   - Alt text must describe the weave, fabric, color, and context (e.g., `alt="Crimson Red Pure Katan Silk Banarasi Saree with Antique Gold Zari Floral Jaal"`).
   - All images must include explicit `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS).
   - Native lazy-loading (`loading="lazy"`) must be specified on all below-the-fold images.

---

## 4. CSS Architecture & Styling Rules

1. **Zero Inline Styles**:
   - **Never write inline styles** (`style="..."`) inside any HTML file.
   - All styling must be declared inside the external stylesheet `style.css`.

2. **Mandatory CSS Custom Properties (Variables)**:
   - All colors, font families, font weights, shadows, border-radii, and spacing values must use CSS variables defined in the `:root` block:
     ```css
     :root {
       --color-primary: #6B1D2F; /* Deep Maroon */
       --color-bg: #FAF6F0;      /* Warm Ivory */
       --color-accent: #C59B27;  /* Antique Zari Gold */
       --color-text: #1F1F1F;    /* Charcoal */
       --color-surface: #FFFFFF; /* Pure White */
       --color-error: #B00020;   /* Crimson Red */
     }
     ```
   - No hardcoded hex codes or arbitrary pixel colors outside `:root`.

3. **Typography**:
   - Headings: Serif font stack (`'Playfair Display', Georgia, 'Times New Roman', serif`).
   - Body & Controls: Sans-serif font stack (`'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`).
   - Line height must maintain high legibility: minimum `1.6` for body text and `1.2` to `1.3` for headings.

4. **Mobile-First Responsive Design**:
   - Layouts must be built mobile-first using base CSS rules for screens starting from **360px width**.
   - Progressive enhancement via `min-width` media queries:
     - Small Tablets / Large Phones: `@media (min-width: 576px)`
     - Tablets: `@media (min-width: 768px)`
     - Desktops / Laptops: `@media (min-width: 992px)`
     - Large Desktops: `@media (min-width: 1200px)`
   - Prevent any horizontal overflow (`overflow-x: hidden` on viewport wrappers if needed; ensure containers use `max-width: 100%`).

---

## 5. JavaScript & Interactive Component Rules

1. **Single External Script**:
   - All JavaScript must reside in `script.js` and be loaded with `defer` before the closing `</body>` tag:
     ```html
     <script src="script.js" defer></script>
     ```

2. **Mobile Hamburger Menu**:
   - Must be fully functional from 360px up to 991px.
   - Navigation button must have:
     - `aria-label="Toggle navigation menu"`
     - `aria-expanded="false"` (toggled to `"true"` when active)
     - `aria-controls="primary-navigation"`
   - Keyboard accessibility: pressing `Escape` must close the open mobile menu and return focus to the hamburger button.
   - Background scrolling must be locked when mobile menu is open.

3. **Forms & Client-Side Validation Rules**:
   - Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label for="[field-id]">`.
   - Native HTML5 validation attributes (`required`, `type="email"`, `type="tel"`, `minlength`, `maxlength`) must be present.
   - **STRICT BAN ON `alert()`**: The use of `window.alert()`, `window.confirm()`, or `window.prompt()` is strictly prohibited.
   - **Inline Error Messages**:
     - Form errors must be injected or revealed directly below the invalid input in the DOM.
     - Error messages must use `role="alert"` and be paired with `aria-describedby="[field-id]-error"`.
     - Inputs in an invalid state must have `aria-invalid="true"`.
   - **Redirect on Valid Submission**:
     - Upon successful validation, the form handler in `script.js` must process the submission cleanly and redirect the user directly to `thank-you.html` (`window.location.href = 'thank-you.html'`).

---

## 6. Directory Structure

```
zari-and-loom/
├── index.html              # Homepage: Studio introduction, featured collections, craft highlights
├── about.html              # Brand story, handloom artisan heritage, Dwarka studio culture
├── collections.html        # Curated bridal, Banarasi, Kanjeevaram, and festive silk collections
├── contact.html            # Studio address, map, phone/WhatsApp, bridal appointment booking form
├── privacy-policy.html     # Client privacy policy, data practices, consultation details
├── thank-you.html          # Confirmation page after inquiry/appointment submission
├── style.css               # Unified stylesheet using CSS custom properties
├── script.js               # Mobile navigation, inline form validation, modal controls
├── AGENTS.md               # Strict engineering and SEO operational guidelines
├── design-brief.md         # Visual identity, color palette, typography, and page system
└── assets/                 # Static assets directory
    ├── images/             # Optimized WebP/JPG images with high-contrast silk textures
    └── icons/              # Scalable SVG icons with aria-hidden
```

---

## 7. Quality Assurance & Pre-Flight Checklist

Before completing any file or feature, verify the following:
- [ ] Valid semantic HTML5 markup with no missing closing tags.
- [ ] Exactly one `<h1>` per page.
- [ ] `<title>` is under 60 characters and `<meta name="description">` is under 155 characters.
- [ ] Header and Footer markup match 100% across all 6 pages.
- [ ] All `<img>` tags have descriptive alt text and explicit dimensions.
- [ ] No inline `style="..."` attributes anywhere in HTML.
- [ ] All colors derive from `:root` CSS variables.
- [ ] Layout behaves cleanly at 360px, 412px, 768px, 1024px, and 1440px widths.
- [ ] Forms provide accessible labels and inline errors without any JavaScript `alert()`.
- [ ] Valid form submissions successfully redirect to `thank-you.html`.
