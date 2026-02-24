# 🎨 SlideViewer Setup Quick Start

## What's New?

You now have a **React-based SlideViewer template** that wraps all your presentations with:

✅ Professional header with navigation  
✅ Centered slide display  
✅ Footer with presentation info  
✅ Responsive design for all devices  
✅ Full Marp interactivity preserved  

## Architecture

```
Home Page (/)
├── PresentationList Component
│   ├── Fetches /slides-manifest.json
│   ├── Displays all presentations
│   └── Links to SlideViewer
│
└── SlideViewer (/slide/:slideId)
    ├── Header: Back button + Title + Refresh
    ├── Content: Marp HTML slide
    └── Footer: Metadata + Keyboard hints
```

## How It Works

### 1. **Click a Presentation Card**
From the home page, click any presentation to open it in SlideViewer.

### 2. **SlideViewer Loads**
- Fetches presentation metadata from manifest
- Loads the compiled Marp HTML
- Displays with header, content, and footer

### 3. **Use Marp Controls**
- Arrow keys to navigate slides
- Click slide for next slide
- P key for presenter view
- F key for fullscreen

### 4. **Navigate Back**
- Click "← Home" button to return to list
- Click "⟳ Refresh" to reload slide

## File Changes

### New Files
```
src/components/SlideViewer.jsx        - Main template component
src/components/SlideViewer.css        - Template styling
SLIDEVIEWER_GUIDE.md                  - Full documentation
SLIDEVIEWER_SETUP.md                  - This file
```

### Updated Files
```
src/App.jsx                           - Added route: /slide/:slideId
src/components/PresentationList.jsx   - Links now use SlideViewer
src/components/PresentationList.css   - Added focus/active states
```

## Styling the Template

### Colors
Edit `src/components/SlideViewer.css`:

```css
.slide-viewer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change the gradient colors */
}
```

### Button Text
Edit `src/components/SlideViewer.jsx` in the header section:

```jsx
<button className="slide-viewer-nav-btn">← Home</button>
```

### Footer Visibility
```css
.slide-viewer-footer {
  display: none;  /* Hide footer if desired */
}
```

## Common Customizations

### Add Logo to Header

In `SlideViewer.jsx`:
```jsx
<div className="slide-viewer-header-left">
  <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '1rem' }} />
  <button>← Home</button>
</div>
```

### Change Header Colors

In `SlideViewer.css`:
```css
.slide-viewer-header {
  background: #2c3e50;  /* Change to solid color */
  /* or */
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.slide-viewer-nav-btn {
  color: #ffa500;  /* Change button text color */
  border-color: #ffa500;
}
```

### Make Content Full Width

In `SlideViewer.css`:
```css
.slide-viewer-iframe {
  max-width: 100%;  /* Remove max-width constraint */
  border-radius: 0;  /* Remove rounded corners */
}
```

### Hide Navigation Buttons

```jsx
// In SlideViewer.jsx, remove the button divs:
// <div className="slide-viewer-header-left">...</div>
// <div className="slide-viewer-header-right">...</div>
```

## Using with Your Presentations

### Step 1: Create Slide
```bash
cat > slides/my-presentation.md << 'EOF'
# My Presentation Title

> A brief description

---

## Slide 2

Content here...
EOF
```

### Step 2: Build
```bash
npm run build:slides
```

### Step 3: View
Open http://localhost:5174/ and click your presentation.

You'll see:
- Header: "My Presentation Title"
- Footer: "my-presentation.md - A brief description"
- Full Marp controls active

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| SlideViewer | ✅ | ✅ | ✅ | ✅ |
| Marp Slides | ✅ | ✅ | ✅ | ✅ |
| Presenter View | ✅ | ✅ | ✅ | ✅ |
| Keyboard Nav | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Slide shows "Error Loading Slide"
- Check that the presentation was built: `npm run build:slides`
- Verify the filename in the card matches a built slide
- Check browser console for error details

### Buttons not clickable
- Make sure dev server is running: `npm run dev`
- Check that routing is working by visiting `/slide/example-presentation`

### Header/Footer styling looks wrong
- Clear browser cache: Ctrl+Shift+Delete
- Check CSS file for syntax errors
- Verify CSS is imported in SlideViewer.jsx

### Slides not displaying in presentation
- Built with Marp CLI successfully? Run `npm run build:slides`
- Check that public folder is synced: Look in `public/slides/`
- Verify manifest.json exists in public folder

## Next Steps

1. **Customize Colors** - Edit the gradient in SlideViewer.css
2. **Add Branding** - Import your logo and add to header
3. **Create Presentations** - Add .md files to slides/ folder
4. **Build & Test** - Run npm run build:slides, then npm run dev
5. **Deploy** - git push to trigger GitHub Actions

## File Locations

```
Your Presentations:
- Source: slides/*.md
- Built: dist/slides/*.html
- Synced: public/slides/*.html

Manifest:
- Source: dist/slides-manifest.json
- Synced: public/slides-manifest.json

Template Components:
- Component: src/components/SlideViewer.jsx
- Styles: src/components/SlideViewer.css

Routes:
- Home: /
- Slide Viewer: /slide/:slideId
```

## What Happens When You Build

```
1. npm run build:slides
   ├─ Reads all .md files from slides/
   ├─ Runs Marp CLI on each file
   ├─ Applies nato-re-theme.css
   ├─ Generates .html files in dist/slides/
   ├─ Creates slides-manifest.json
   └─ Syncs everything to public/
2. Browser loads manifest
3. SlideViewer fetches manifest
4. User clicks presentation
5. SlideViewer loads HTML and displays with template
```

## Key Concepts

### Why SlideViewer?

Before, clicking a presentation opened a bare HTML file. Now SlideViewer wraps it with:
- **Navigation** - Back button to presentations list
- **Branding** - Header with your styling
- **Info** - Footer showing metadata
- **Controls** - Refresh button, keyboard hints

### How Does It Load Slides?

SlideViewer uses React Router to:
1. Route to `/slide/example-presentation`
2. Extract the `slideId` parameter
3. Fetch the HTML file from `/slides/example-presentation.html`
4. Inject the HTML into the page with a React wrapper
5. Display with header, content area, and footer

### Why Not Iframe?

Traditional slide viewers use iframes, but SlideViewer injects the HTML directly because:
- ✅ Full Marp interactivity (presenter mode, keyboard nav)
- ✅ Better performance (no iframe overhead)
- ✅ Easier styling (all in React context)
- ✅ Simpler codebase (no cross-origin issues)

## Advanced Customization

### Add Presenter Name to Header
```jsx
<h1 className="slide-viewer-title">
  {slideMetadata?.title}
  {slideMetadata?.author && (
    <span className="presenter-name">by {slideMetadata.author}</span>
  )}
</h1>
```

### Add Navigation Shortcuts
```jsx
// Add keyboard shortcuts for faster navigation
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') navigate('/')  // ESC to home
    if (e.key === 'ArrowLeft') {/* prev slide */}
  }
  window.addEventListener('keydown', handleKeyPress)
}, [navigate])
```

### Add Slide Counter
```jsx
// In footer, add current slide number
<span>{currentSlide} / {totalSlides}</span>
```

## Deployment

The SlideViewer automatically deploys with GitHub Pages:

```bash
# Commit your changes
git add src/components/SlideViewer.*
git add SLIDEVIEWER_*.md
git commit -m "Add SlideViewer template"

# Push to main branch
git push origin main

# GitHub Actions automatically:
# 1. Builds React app
# 2. Builds slides with theme
# 3. Deploys to gh-pages branch

# Your slides are now at:
# https://nato-re.github.io/slide/example-presentation
```

## Questions?

See the full documentation: `SLIDEVIEWER_GUIDE.md`

---

**Ready?** Run `npm run dev` and visit http://localhost:5174/ to test! 🚀
