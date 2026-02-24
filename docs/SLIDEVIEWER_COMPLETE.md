# 📊 Complete SlideViewer Template System

## Overview

Your NATO-RE presentation system now includes a complete **React + Marp + SlideViewer template** that provides:

### Features ✨

| Feature | Details |
|---------|---------|
| **React App** | Home page with presentation list |
| **SlideViewer** | Professional wrapper template for slides |
| **Marp Compiler** | Automated markdown → HTML conversion |
| **Custom Theme** | Purple-blue gradient with utility classes |
| **Responsive Design** | Works on desktop, tablet, mobile |
| **GitHub Pages** | Automatic deployment via GitHub Actions |
| **Full Controls** | Arrow keys, presenter mode, fullscreen |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    React App (/)                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         PresentationList Component                   │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Presentation Card 1  → Click to open         │  │   │
│  │  │  Presentation Card 2  → Click to open         │  │   │
│  │  │  Presentation Card 3  → Click to open         │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬─────────────────────────────────────────┘
                     │ Click Card
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              SlideViewer (/slide/:slideId)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Header: [← Home]  My Presentation Title  [⟳ Refresh] │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │              Marp Slide (Full Features)              │   │
│  │    - Navigation with arrow keys                      │   │
│  │    - Presenter mode (P key)                          │   │
│  │    - Fullscreen (F key)                              │   │
│  │    - Custom theme styling                            │   │
│  │                                                       │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ Footer: my-presentation.md | Description | Hints     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Structure

```
src/
├── App.jsx
│   └── Routes:
│       ├── "/" → PresentationList
│       └── "/slide/:slideId" → SlideViewer
│
├── components/
│   ├── PresentationList.jsx
│   │   ├── Fetches /slides-manifest.json
│   │   ├── Displays presentation cards
│   │   └── Links to SlideViewer
│   │
│   ├── PresentationList.css
│   │   ├── Grid layout
│   │   ├── Card styling
│   │   └── Responsive design
│   │
│   ├── SlideViewer.jsx ← NEW
│   │   ├── Fetches manifest + HTML
│   │   ├── Renders template wrapper
│   │   └── Manages slide state
│   │
│   └── SlideViewer.css ← NEW
│       ├── Header styling
│       ├── Content area
│       └── Footer info
│
└── index.css (global styles)

slides/
├── example-presentation.md
├── aula3.md
├── template-slide.md
└── your-slides.md

themes/
└── nato-re-theme.css (custom Marp theme)

scripts/
├── build-slides.js (Marp compiler)
└── sync-slides.js (dev server helper)

dist/
├── slides/ (compiled HTML)
│   ├── example-presentation.html
│   ├── aula3.html
│   └── template-slide.html
└── slides-manifest.json (metadata)

public/
├── slides/ (synced for dev server)
└── slides-manifest.json
```

---

## How Everything Works Together

### 1. Development Workflow

```bash
# Terminal 1: Start dev server
npm run dev
→ Vite server on http://localhost:5174/

# Terminal 2: Build slides
npm run build:slides
→ Compiles .md → .html with theme
→ Syncs to public/ for dev server
→ Creates manifest.json

# Browser
Open http://localhost:5174/
→ React app loads
→ PresentationList fetches /slides-manifest.json
→ Cards are displayed
→ Click card → SlideViewer loads slide
```

### 2. File Flow

```
slides/my-presentation.md
            ↓ (npm run build:slides)
            ↓ (Marp CLI + nato-re-theme.css)
dist/slides/my-presentation.html
            ↓ (sync-slides.js)
public/slides/my-presentation.html
            ↓ (dev server serves)
Browser displays in SlideViewer
```

### 3. Request Chain

```
Browser Request:
1. GET / → Loads React app
2. GET /slides-manifest.json → PresentationList reads it
3. Click card → Navigate to /slide/example-presentation
4. SlideViewer fetches /slides-manifest.json (again)
5. SlideViewer fetches /slides/example-presentation.html
6. HTML injected into SlideViewer template
7. Marp controls become active (arrow keys, etc.)
```

---

## Customization Guide

### Change Colors

**File:** `src/components/SlideViewer.css`

```css
.slide-viewer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change to your colors */
}
```

### Change Slide Theme

**File:** `themes/nato-re-theme.css`

```css
:root {
  --primary-color: #667eea;     /* Change these */
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
}
```

### Add Logo

**Step 1:** Place logo in `public/logo.png`

**Step 2:** Edit `SlideViewer.jsx`:
```jsx
<img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
```

### Hide Footer

**File:** `src/components/SlideViewer.css`
```css
.slide-viewer-footer {
  display: none;
}
```

### Full-Width Slides

**File:** `src/components/SlideViewer.css`
```css
.slide-viewer-iframe {
  max-width: none;
  border-radius: 0;
}
```

---

## Creating Presentations

### Step 1: Create Markdown File

```bash
cat > slides/my-talk.md << 'EOF'
# My Awesome Talk

> Learn how to use SlideViewer

---

## Slide 2

- Point 1
- Point 2
- <span class="highlight">Important point</span>

---

<div class="text-center">

# Thank You!

Questions?

</div>
EOF
```

### Step 2: Build Slides

```bash
npm run build:slides
```

### Step 3: View in Browser

1. Visit http://localhost:5174/
2. Click "My Awesome Talk"
3. Use arrow keys to navigate

### Step 4: Deploy

```bash
git add slides/my-talk.md
git commit -m "Add my-talk presentation"
git push origin main

# GitHub Actions automatically builds and deploys!
# Available at: https://nato-re.github.io/slide/my-talk
```

---

## Available CSS Classes

Use these in your markdown with HTML:

```html
<!-- Highlighting -->
<span class="highlight">Important text</span>

<!-- Status indicators -->
<span class="success">✓ Done</span>
<span class="warning">⚠ Warning</span>
<span class="error">✗ Error</span>
<span class="info">ℹ Info</span>

<!-- Text alignment -->
<div class="text-center">Centered text</div>
<div class="text-left">Left aligned</div>
<div class="text-right">Right aligned</div>

<!-- Two-column layout -->
<div class="columns">
<div class="column">

## Left Column
Content here

</div>
<div class="column">

## Right Column
Content here

</div>
</div>
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Arrow Keys** | Next/Previous slide |
| **P** | Presenter view |
| **F** | Fullscreen |
| **. (period)** | Black screen |
| **Esc** | Exit fullscreen/presenter |
| **Click slide** | Next slide |

---

## Deployment

### Automatic Deployment

The system uses GitHub Actions to automatically:
1. Trigger on push to main
2. Install dependencies
3. Build React app
4. Build Marp slides
5. Deploy to GitHub Pages

**No manual deployment needed!**

### Manual Build & Deploy

```bash
# Build everything
npm run build
npm run build:slides

# Check dist/ folder
ls -la dist/

# GitHub Actions will deploy on git push
git push origin main
```

### View Live

After deployment, your slides are at:
```
https://nato-re.github.io/slide/my-talk
```

---

## Troubleshooting

### Slide not appearing in list

**Check:**
- File exists in `slides/` folder
- Ran `npm run build:slides`
- Check browser console for errors
- Verify manifest.json exists in public/

**Fix:**
```bash
npm run build:slides
npm run dev
```

### SlideViewer shows "Error Loading Slide"

**Check:**
- Presentation was built
- Filename matches (no .md extension)
- File exists in dist/slides/

**Fix:**
```bash
npm run build:slides
# Then refresh browser
```

### Dev server not starting

**Check:**
- Port 5174 not in use
- Node.js installed (`node --version`)
- No syntax errors in code

**Fix:**
```bash
# Kill any existing server
pkill -f "vite"

# Start fresh
npm run dev
```

### Styles not updating

**Fix:**
- Hard refresh browser: Ctrl+Shift+R
- Clear cache: Dev Tools → Network → Disable cache
- Restart dev server: Ctrl+C then `npm run dev`

---

## File Reference

### Key Directories

| Path | Purpose |
|------|---------|
| `slides/` | Your markdown presentations |
| `src/` | React source code |
| `dist/` | Production build output |
| `public/` | Static files for dev server |
| `themes/` | Custom Marp CSS theme |
| `scripts/` | Build automation scripts |

### Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app + routes |
| `src/components/SlideViewer.jsx` | Template wrapper |
| `src/components/PresentationList.jsx` | Home page |
| `themes/nato-re-theme.css` | Slide styling |
| `scripts/build-slides.js` | Marp compiler |
| `.github/workflows/deploy.yml` | GitHub Actions |

---

## Performance Tips

### Optimize Build Time
```bash
# Only rebuild what changed
npm run build:slides

# Takes ~2-5 seconds for 3-5 presentations
```

### Optimize File Sizes
- Each slide: 50-200 KB (typical)
- Manifest: ~500 bytes
- Theme CSS: ~15 KB

### Optimize Browser Performance
- Slides cached after first load
- No unnecessary re-renders
- CSS animations use GPU (transform)
- Mobile-optimized media queries

---

## Advanced Features

### Add Presenter Notes

In your markdown:
```markdown
# My Slide

Visible content

<!-- Presenter note: This is only visible in presenter view -->
```

Then press P for presenter mode.

### Export Single Slide

```bash
npx @marp-team/marp-cli slides/my-talk.md --pdf
npx @marp-team/marp-cli slides/my-talk.md --pptx
```

### Custom Slide Backgrounds

In your markdown (Marp supports this):
```markdown
<!-- bg: #333 -->
# Dark Slide
```

### Add Animations

Marp supports slide transitions:
```markdown
---
transition: fade
duration: 1000
---
# Transitioning Slide
```

---

## Support & Resources

### Documentation
- **Marp Docs:** https://marp.app/
- **React Router:** https://reactrouter.com/
- **Vite Guide:** https://vitejs.dev/

### Project Guides
- `THEME_GUIDE.md` - Custom theme reference
- `THEME_QUICK_REFERENCE.md` - Quick CSS cheat sheet
- `SLIDEVIEWER_GUIDE.md` - Detailed SlideViewer docs
- `SLIDEVIEWER_SETUP.md` - Setup instructions

### Local Help
```bash
# Check all available commands
cat package.json | grep scripts

# See what's built
ls -la dist/slides/

# View manifest
cat public/slides-manifest.json
```

---

## Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server

# Building
npm run build                  # Build React app
npm run build:slides           # Build presentations
npm run preview                # Preview production build

# Full workflow
npm run build && npm run build:slides

# Deployment
git add .
git commit -m "message"
git push origin main           # Triggers GitHub Actions
```

---

## Next Steps

1. ✅ **Explore** - Visit http://localhost:5174/
2. ✅ **Create** - Add a new `.md` file to slides/
3. ✅ **Build** - Run `npm run build:slides`
4. ✅ **Customize** - Edit SlideViewer.css colors
5. ✅ **Deploy** - Push to GitHub Pages

---

**Happy presenting! 🎉**

For detailed customization, see the individual documentation files:
- `SLIDEVIEWER_GUIDE.md` - Complete SlideViewer reference
- `THEME_GUIDE.md` - Theme customization
- `THEME_QUICK_REFERENCE.md` - CSS class reference
