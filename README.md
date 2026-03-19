# Automa8 Website

Static multi-page marketing website for Automa8, built with plain HTML/CSS/JS and deployed via Nginx.

## Implementation Overview

### Architecture
- No build step, no framework.
- Each page is a standalone HTML document.
- Shared styling lives in `css/styles.css`.
- Shared behavior (header interactions, modal, reveal effects) lives in `js/main.js`.

### Pages
- `index.html`: Landing page (hero, feature highlights, privacy, pricing, CTA).
- `features.html`: Product feature deep-dive page.
- `contact.html`: Philosophy + contact form page.
- `blog.html`: Blog listing page.

### Shared UI Patterns
- Sticky top navigation with mobile hamburger behavior.
- Reusable CTA buttons (`btn-primary`, `btn-outline`, etc.).
- Waitlist modal (`#modal-overlay`) used across pages.
- Card-based content blocks and responsive grid sections.

### Styling System
- Core token and component styles are in `css/styles.css`.
- Page-specific visual adjustments are kept in page-level `<style>` blocks when required.
- Main brand color: `#10b77f`.
- Font stack: Inter via Google Fonts.
- Icon set: Material Symbols Outlined.

### JavaScript Behavior (`js/main.js`)
- Adds header shadow on scroll.
- Handles mobile nav open/close.
- Handles waitlist modal open/close and escape key support.
- Handles waitlist form success state.
- Uses `IntersectionObserver` for elements explicitly marked with `.observe`.

## Project Structure

```txt
finance-cloud-lp/
├── index.html
├── features.html
├── contact.html
├── blog.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── img/
│   └── forest.jpg
├── nginx.conf
├── deploy.sh
└── README.md
```

## Local Development

### Option 1: Python
```bash
python3 -m http.server 8181
# open http://localhost:8181/index.html
```

### Option 2: Node
```bash
npx serve .
```

## Deployment (Current Setup)

`deploy.sh` is set up for Oracle VM deployment:
- Installs/configures Nginx.
- Syncs site files into `/var/www/automa8`.
- Uses `nginx.conf` as the web server config.

`nginx.conf` defaults to:
- Root: `/var/www/automa8`
- Index: `index.html`
- Cache headers for static assets
- No-cache headers for HTML
- 404 fallback to `index.html`

## Cleanup Performed

Removed unused file:
- `features-mock.html`

## Notes

- Keep nav order consistent across pages: `Product`, `Pricing`, `Features`, `Contact`.
- Homepage route in this project is `index.html`.
