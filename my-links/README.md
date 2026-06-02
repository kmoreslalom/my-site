# My Links

A personal link-in-bio page. Clean, fast, and ready to share from your social profiles.

## Features
- **Dark mode by default** with light/dark toggle
- **Mobile-first design** centered card layout (max 480px)
- **Zero dependencies** — pure HTML, CSS, JavaScript
- **Smooth animations** on link buttons and subtle animated background
- **Google fonts** — Inter typeface
- **Icons & emojis** for visual hierarchy
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation

## Files
- `index.html` — markup
- `styles.css` — responsive design, dark/light themes, animations
- `app.js` — theme toggle with localStorage
- `vercel.json` — Vercel deployment config (static site)

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial my-links project"
git remote add origin https://github.com/YOUR_USERNAME/my-links.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (or create an account)
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository
4. Framework: **Other** (or leave blank)
5. Build & Output settings: Leave default (no build needed)
6. Deploy

Your site will be live at `https://YOUR_PROJECT.vercel.app/`

### Local Testing
```bash
# Open in your browser
open index.html
# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## Customization
Edit `index.html` to change:
- Name, bio, and links
- Profile photo placeholder text (currently "KM")
- Footer text

Edit `styles.css` to adjust:
- Colors and gradients (CSS variables in `:root`)
- Spacing and typography
- Card dimensions
- Animation timings

## Browser Support
Works in all modern browsers (Chrome, Firefox, Safari, Edge).

---
Made with coffee & Copilot
