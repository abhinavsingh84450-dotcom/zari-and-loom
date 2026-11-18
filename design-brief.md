# Design Brief & Visual System Specification

> **Brand:** Zari & Loom — Handloom & Bridal Saree Boutique  
> **Location:** Sector 12, Dwarka, New Delhi, India  
> **Category:** Luxury Indian Ethnic Wear, Handwoven Bridal Sarees & Bespoke Trousseau  
> **Document Purpose:** Definitive design tokens, UI component specifications, and page architecture for web implementation

---

## 1. Brand Identity & Creative Direction

### 1.1 Brand Story
**Zari & Loom** is an intimate, high-end bridal and handloom saree studio rooted in Dwarka, New Delhi. Born from a reverence for India’s legendary weaving traditions, the boutique connects discerning brides and textile connoisseurs directly with master weavers from Varanasi, Kanchipuram, Chanderi, and Paithan. 

### 1.2 Brand Values & Persona
- **Heritage & Authenticity:** Genuine silk-mark and handloom weaves, pure silver and gold zari threads (kadwa, meenakari, korvai).
- **Artisanal Luxury:** Uncompromising craftsmanship, slow fashion, timeless heirlooms passed through generations.
- **Warmth & Bespoke Hospitality:** An unhurried, private salon experience in Dwarka where brides and their families explore drapes over kahwa and curated consultations.
- **Modern Refinement:** Timeless tradition presented with contemporary editorial restraint and sophistication.

---

## 2. Color System & CSS Custom Properties

All styling throughout the project must consume CSS custom properties defined in `:root`. No arbitrary hex codes or color literals may be used within component styles.

### 2.1 Core Palette Tokens
```css
:root {
  /* Brand Core Colors */
  --color-primary: #6B1D2F;      /* Deep Maroon / Crimson Heritage */
  --color-bg: #FAF6F0;           /* Warm Ivory / Raw Silk Canvas */
  --color-accent: #C59B27;       /* Antique Zari Gold / Metallic Accent */
  --color-text: #1F1F1F;         /* Charcoal / Deep Graphite */
  --color-surface: #FFFFFF;      /* Crisp Pure White */
  --color-error: #B00020;        /* Vivid Ruby / Accessible Error State */

  /* RGB Components for Alpha Channels */
  --color-primary-rgb: 107, 29, 47;
  --color-accent-rgb: 197, 155, 39;
  --color-bg-rgb: 250, 246, 240;
  --color-text-rgb: 31, 31, 31;

  /* Extended Functional Palette */
  --color-primary-dark: #4A1320;
  --color-primary-light: #8E2840;
  --color-accent-light: #E0BC52;
  --color-accent-subtle: rgba(197, 155, 39, 0.15);
  --color-border: rgba(197, 155, 39, 0.28);
  --color-text-muted: #575757;
  --color-surface-tinted: #F4EFE6;
}
```

### 2.2 Semantic Color Application
| Token | Role & Usage | Visual Impact |
| :--- | :--- | :--- |
| `--color-primary` (`#6B1D2F`) | Primary buttons, brand headers, footer canvas, royal borders | Regal, grounded, ceremonial |
| `--color-bg` (`#FAF6F0`) | Universal body background, secondary section backgrounds | Warm, natural silk texture, reduces eye fatigue |
| `--color-accent` (`#C59B27`) | Badges, iconography, decorative dividers, hover highlights | Gleaming antique gold, metallic zari touch |
| `--color-text` (`#1F1F1F`) | Primary body copy, article text, high-contrast headings | High legibility, softer than harsh pure `#000000` |
| `--color-surface` (`#FFFFFF`) | Cards, modal sheets, input field surfaces, dropdown menus | Clean elevation against ivory background |
| `--color-error` (`#B00020`) | Inline form error messages, invalid input borders | Immediate warning with WCAG AA compliance |

---

## 3. Typography System

The typography pairs an editorial, high-fashion serif for titles with a clean, highly legible sans-serif for reading comfort across mobile and desktop.

### 3.1 Font Families
```css
:root {
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### 3.2 Typographic Hierarchy & Scale
| Level | Font Family | Size (Fluid / Responsive) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`h1`)** | `--font-heading` | `clamp(2.25rem, 5vw, 3.5rem)` | 700 (Bold) | 1.15 | -0.01em |
| **Section Heading (`h2`)** | `--font-heading` | `clamp(1.75rem, 3.5vw, 2.35rem)`| 600 (SemiBold)| 1.25 | 0 |
| **Card / Item Title (`h3`)**| `--font-heading` | `clamp(1.25rem, 2vw, 1.5rem)` | 600 (SemiBold)| 1.30 | 0.01em |
| **Subheadings (`h4`)** | `--font-body` | `1.125rem` (18px) | 600 (SemiBold)| 1.40 | 0.02em |
| **Lead Paragraph** | `--font-body` | `1.125rem` (18px) | 400 (Regular) | 1.65 | 0 |
| **Body Copy** | `--font-body` | `1.0rem` (16px) | 400 (Regular) | 1.65 | 0 |
| **Eyebrow / Category Tag** | `--font-body` | `0.75rem` (12px) | 700 (Bold) | 1.20 | 0.12em (UPPERCASE) |
| **Captions / Input Notes** | `--font-body` | `0.875rem` (14px) | 400 (Regular) | 1.45 | 0 |

---

## 4. Spacing, Layout & Elevation

### 4.1 Spacing Scale
```css
:root {
  --space-2xs: 0.25rem;  /* 4px */
  --space-xs:  0.5rem;   /* 8px */
  --space-sm:  0.75rem;  /* 12px */
  --space-md:  1.0rem;   /* 16px */
  --space-lg:  1.5rem;   /* 24px */
  --space-xl:  2.0rem;   /* 32px */
  --space-2xl: 3.0rem;   /* 48px */
  --space-3xl: 4.5rem;   /* 72px */
  --space-4xl: 6.0rem;   /* 96px */
}
```

### 4.2 Containers & Breakpoints
- **Mobile Foundation:** Default styles target **360px** viewport width upwards.
- **Tablet Gutter:** `min-width: 768px`
- **Desktop Grid:** `min-width: 992px`
- **Max Content Width:** `1200px` (with `padding-inline: clamp(1rem, 4vw, 2rem)`).

### 4.3 Borders & Shadows
```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  --shadow-subtle: 0 2px 8px rgba(31, 31, 31, 0.06);
  --shadow-card:   0 8px 24px rgba(107, 29, 47, 0.08);
  --shadow-hover:  0 14px 32px rgba(107, 29, 47, 0.14);
}
```

---

## 5. UI Component Design Specifications

### 5.1 Site Header & Navigation
- **Branding:** 
  - Logo Text: "Zari & Loom" in `--font-heading`, Deep Maroon with subtle gold flourish.
  - Subtitle: "Handloom & Bridal Studio • Dwarka" in 11px uppercase sans-serif with gold letter spacing.
- **Navigation Bar:**
  - Identical markup across all 6 pages.
  - Desktop: Center-aligned or right-aligned link items with animated gold underlines on `:hover` and `.active` state.
  - Mobile: Hamburger icon (accessible 44x44px target) toggling a clean slide-down drawer with full focus trap and `Escape` key listener.
  - Quick Action CTA: "Book Studio Visit" button in navigation.

### 5.2 Buttons & Links
- **Primary Button (`.btn-primary`):**
  - Background: `var(--color-primary)` (Deep Maroon)
  - Color: `var(--color-surface)` (White)
  - Border: `1px solid var(--color-accent)`
  - Hover: Background `var(--color-primary-dark)`, box-shadow `0 0 12px rgba(197, 155, 39, 0.45)`.
  - Padding: `0.75rem 1.75rem`, rounded `var(--radius-sm)`, uppercase tracking `0.05em`.
- **Secondary Button (`.btn-secondary`):**
  - Background: `transparent`
  - Color: `var(--color-primary)`
  - Border: `1.5px solid var(--color-accent)`
  - Hover: Background `var(--color-accent-subtle)`, border-color `var(--color-primary)`.
- **Text Links (`.text-link`):**
  - Color: `var(--color-primary)`, bottom-border in Antique Gold, transition on hover.

### 5.3 Collection & Showcase Cards
- **Structure:**
  - Aspect ratio: `4:5` portrait image frame showcasing fine drape, pallu detail, and woven border.
  - Subtle gold border (`1px solid var(--color-border)`).
  - Background: `var(--color-surface)` (White).
  - Floating badge: Pure Katan Silk / Handloom Certified / Bridal Edit.
  - Card content: Saree title in serif, weave description, craft origin, and inquiry action button.

### 5.4 Form Controls & Inline Validation
- **Input Fields:**
  - Surface: `var(--color-surface)`
  - Border: `1px solid #D5CBBF`
  - Focus State: `outline: 2px solid var(--color-primary); border-color: var(--color-primary);`
  - Error State: `border-color: var(--color-error); aria-invalid="true"`
- **Inline Error Styling:**
  - Injected directly below input as `<span class="form-error" id="[input-id]-error" role="alert">`.
  - Color: `var(--color-error)` with an icon or bullet prefix.
  - No popups or browser alerts under any circumstance.
- **Form Submission Behavior:**
  - Submit button shows loading/processing state upon validation success.
  - Programmatic redirect to `thank-you.html`.

### 5.5 Site Footer
- **Background:** `var(--color-primary)` (Deep Maroon).
- **Text & Accent:** Warm Ivory text (`var(--color-bg)`) with Antique Zari Gold headers (`var(--color-accent)`).
- **Content Blocks:**
  - Studio Column: Address (Sector 12, Dwarka, New Delhi 110078), Visiting Hours (10:30 AM – 8:00 PM, Tue–Sun), Phone (+91 98765 43210), WhatsApp direct link.
  - Collections Navigation: Direct links to Bridal Sarees, Banarasi Silk, Kanjeevarams, Festive Drapes.
  - Quick Links: About, Visit Studio, Contact, Privacy Policy.
  - Trust & Craft Note: "100% Certified Authentic Handlooms • Direct Weaver Guild Partnerships".
  - Copyright statement and landmark credit.

---

## 6. Page-by-Page Information Architecture

The website comprises exactly **6 core pages**:

```
Zari & Loom Site Map
│
├── 1. index.html (Home)
├── 2. about.html (Heritage & Craft)
├── 3. collections.html (Saree Showcase & Drapes)
├── 4. contact.html (Dwarka Studio & Bridal Appointments)
├── 5. privacy-policy.html (Client Data & Privacy Terms)
└── 6. thank-you.html (Appointment Confirmation & Next Steps)
```

### 6.1 `index.html` — Homepage
- **Hero Section:**
  - Headline: "Where Sacred Threads Meet Bridal Elegance"
  - Subheading: "Bespoke handloom sarees, pure Banarasi heirlooms, and South Indian Kanjeevarams in the heart of Dwarka, New Delhi."
  - CTAs: "Explore Collections" & "Book Studio Appointment"
- **Featured Weaves Section:** Highlights 4 core saree genres: Pure Banarasi Katan, Royal Kanjeevaram Silk, Tissue Bridal Drapes, and Handspun Tussar/Chanderi.
- **The Dwarka Studio Experience:** Visual teaser of the private bridal salon in Sector 12, personalized draping assistance, and heirloom preservation guidance.
- **Artisan Guilds Highlight:** Explaining the master weavers behind the looms.
- **Client Stories / Testimonials:** Words from Delhi brides and families.
- **Consultation Callout:** Studio visit booking preview.

### 6.2 `about.html` — Heritage & Artisan Story
- **Hero Section:**
  - Headline: "The Soul of Handloom: Preserving India's Living Heirlooms"
- **The Zari & Loom Genesis:** Founded to bring authentic, unadulterated handlooms to West Delhi brides without middlemen markups.
- **The Weavers' Guilds:** Deep dive into Varanasi's Kadwa weavers, Kanchipuram's Korvai masters, and Madhya Pradesh's Chanderi artisans.
- **Purity Standards:** Real Zari craftsmanship (gold and silver wrapped silk threads), Silk Mark certification, and hand-dyeing processes.
- **Studio Philosophy:** Why an offline studio visit in Dwarka offers a tactile, emotional experience unmatched by digital catalogs.

### 6.3 `collections.html` — Saree Catalog & Bridal Trousseau
- **Hero Section:**
  - Headline: "Curated Handloom Sarees for Weddings & Celebrations"
- **Filter / Category Navigation:**
  - "All Weaves", "Bridal Banarasi", "Temple Kanjeevaram", "Organza & Tissue", "Heritage Tussar".
- **Product Showcase Grid:**
  - High-detail cards with saree title, weave technique, color palette, fabric purity, and "Inquire / Book Drape" buttons.
- **Custom Bridal Saree Service Callout:** Bespoke bridal color matching and customized pallu embroidery requests.

### 6.4 `contact.html` — Studio Location & Bridal Appointments
- **Hero Section:**
  - Headline: "Visit Our Dwarka Studio for a Private Bridal Consultation"
- **Two-Column Interactive Layout:**
  - **Left Column (Location & Hours):**
    - Address: Sector 12, Dwarka, New Delhi, Delhi 110078 (Near Dwarka Sector 12 Metro Station).
    - Hours: Tuesday – Sunday: 10:30 AM – 8:00 PM (Mondays by appointment only).
    - Phone: +91 98765 43210
    - WhatsApp: Direct inquiry link.
    - Metro & Parking Guide: Easy road access with dedicated customer valet parking.
  - **Right Column (Appointment Form):**
    - Fields: Full Name, Email Address, Phone Number, Preferred Date, Occasion (Bridal, Trousseau, Festive, Connoisseur), Message / Weave Preferences.
    - Inline validation on all fields.
    - Submission redirects to `thank-you.html`.

### 6.5 `privacy-policy.html` — Privacy & Data Protection
- **Hero Section:**
  - Headline: "Privacy Policy & Client Data Protection"
- **Sections:**
  - Information We Collect (names, phone numbers, appointment preferences).
  - How We Use Client Information (confirming appointments, personalized bridal consultations, direct WhatsApp updates).
  - Strict No-Spam & Confidentiality Pledge (client details are never sold or shared).
  - Storage & Security Measures.
  - Contact details for data inquiries at the Dwarka studio.

### 6.6 `thank-you.html` — Confirmation & Next Steps
- **Hero / Confirmation Box:**
  - Headline: "Thank You — Your Studio Consultation Request is Received"
  - Summary: Confirmation message detailing that a senior bridal draping consultant from our Dwarka studio will contact the client within 24 hours.
- **Consultation Details & Preparation:**
  - What to expect during your private studio appointment.
  - Directions reminder to Sector 12, Dwarka.
  - Quick action: "Chat Directly on WhatsApp" for urgent inquiries.
  - Secondary CTA: "Browse Collections While You Wait".

---

## 7. Accessibility, Responsiveness & Performance Standards

1. **Accessibility (WCAG 2.1 AA Compliant):**
   - High text-to-background contrast ratio (exceeding 4.5:1 for body and 3:1 for large headings).
   - Visible keyboard `:focus-visible` styling using `outline: 2px solid var(--color-primary)`.
   - Form inputs with explicit `<label for="...">` matching input `id`.
   - Error messages announced via `role="alert"`.
2. **Mobile-First Responsive Guarantees:**
   - Seamless presentation from `360px` smartphones (e.g. Galaxy S series, iPhones) through large `1440px+` 4K displays.
   - Touch targets for all interactive buttons and navigation links strictly at or above `44px x 44px`.
3. **Asset & Image Performance:**
   - All saree photography compressed with WebP format fallbacks.
   - Images specified with explicit `width` and `height` to protect against Cumulative Layout Shift (CLS).
   - Below-the-fold assets loaded with native `loading="lazy"`.
