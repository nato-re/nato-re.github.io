# 🎬 SlideViewer Template Documentation

## Overview

The **SlideViewer** is a React component that wraps your Marp-generated HTML presentations with a professional template. It provides:

✅ **Header Navigation** - Back button, presentation title, refresh button  
✅ **Centered Display** - Properly sized slide container with shadow effects  
✅ **Footer Information** - Filename, description, and keyboard hints  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Easy Integration** - Links directly from PresentationList component  

## Architecture

### File Structure
```
src/
├── components/
│   ├── PresentationList.jsx       ← Updated to link to SlideViewer
│   ├── PresentationList.css       ← Updated with focus states
│   ├── SlideViewer.jsx            ← NEW: Wraps slides
│   └── SlideViewer.css            ← NEW: Template styling
├── App.jsx                        ← Updated routing
└── ...
```

### Component Flow

```
PresentationList (Home Page)
       ↓ (click card)
  SlideViewer (/slide/:slideId)
       ↓ (fetches from manifest)
  Renders Marp HTML with Header + Footer
       ↓
  User navigates or returns home
```

## Usage

### 1. View a Presentation

Simply click any presentation card on the home page. You'll be directed to:
```
http://localhost:5174/slide/example-presentation
```

The SlideViewer will:
1. Fetch `/slides-manifest.json` to get presentation metadata
2. Fetch `/slides/example-presentation.html` (Marp-generated file)
3. Display it with the template wrapper

### 2. Navigation

**Header Buttons:**
- **← Home** - Return to presentation list
- **⟳ Refresh** - Reload the slide without re-fetching

**Keyboard Shortcuts (native Marp):**
- Arrow keys - Navigate between slides
- Click slide - Navigate (Marp default controls)
- P - Presenter view
- F - Fullscreen

**Footer:**
- Filename, description, and keyboard hints

## Customization

### Change Header Style

Edit `src/components/SlideViewer.css`:

```css
.slide-viewer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  /* Modify colors, padding, font-size, etc. */
}
```

### Change Button Colors

```css
.slide-viewer-nav-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  /* Customize button appearance */
}
```

### Hide Footer Info

```css
.slide-viewer-footer {
  display: none; /* Hide footer */
}
```

### Adjust Content Size

```css
.slide-viewer-content {
  padding: 1rem;      /* Change padding */
  margin-top: 10px;   /* Add top margin */
}

.slide-viewer-iframe {
  border-radius: 8px; /* Adjust corner radius */
  max-width: 1280px;  /* Limit max width */
}
```

## Key Features

### 1. Responsive Design

The SlideViewer adapts to all screen sizes:

| Device | Layout | Features |
|--------|--------|----------|
| Desktop (>768px) | Full layout | All buttons visible, normal footer |
| Tablet (480-768px) | Compact | Smaller buttons, wrapped footer |
| Mobile (<480px) | Minimal | Icon buttons, stacked layout |

### 2. Error Handling

If a slide doesn't exist:
```
Error Loading Slide
Could not load slide: Slide not found
[Back to Home]
```

The SlideViewer gracefully handles:
- Missing slides
- Failed manifest loads
- Network errors

### 3. Metadata Display

The footer automatically shows:
- **Filename**: The .md source file name
- **Description**: Extracted from markdown frontmatter (> quote)
- **Navigation Hint**: Keyboard controls reminder

### 4. Loading State

While fetching, displays:
```
Loading presentation... (with spinner animation)
```

## Integration with Marp

The SlideViewer uses Marp's built-in features:

1. **HTML Output**: Marp generates standalone `.html` files with all styles embedded
2. **Slide Navigation**: Native Marp controls work inside the template
3. **Theme Integration**: Your custom theme (nato-re-theme.css) is applied during build
4. **Responsive Slides**: Marp automatically sizes slides to container

### No Iframe Used

Unlike traditional iframe-based viewers, SlideViewer uses `dangerouslySetInnerHTML` to inject Marp's HTML directly. This allows:

✅ Full slide interactivity  
✅ Keyboard navigation  
✅ Presenter mode (P key)  
✅ Native Marp features  

## Workflow

### Step 1: Create Slide
```bash
# Add file to slides/ directory
echo "# My Talk\n\n> My description\n\n---\n\nContent" > slides/my-talk.md
```

### Step 2: Build
```bash
npm run build:slides
```

### Step 3: View
Browser automatically shows in SlideViewer with:
- Header with title
- Footer with metadata
- Full Marp controls

### Step 4: Deploy
```bash
git add .
git commit -m "Add my-talk presentation"
git push origin main
```

GitHub Actions automatically builds and deploys!

## Customization Examples

### Example 1: Dark Theme Header

```css
/* In SlideViewer.css */
.slide-viewer-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.slide-viewer-nav-btn {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
  border-color: rgba(255, 165, 0, 0.3);
}

.slide-viewer-nav-btn:hover {
  background: rgba(255, 165, 0, 0.3);
  border-color: rgba(255, 165, 0, 0.5);
}
```

### Example 2: Hide Footer

```css
/* In SlideViewer.css */
.slide-viewer-footer {
  display: none;
}

.slide-viewer-content {
  /* Extend to bottom */
}
```

### Example 3: Custom Logo/Branding

```jsx
// In SlideViewer.jsx, in the header:
<div className="slide-viewer-header-left">
  <img src="/logo.png" alt="Logo" className="header-logo" />
  <button className="slide-viewer-nav-btn" onClick={() => navigate('/')}>
    ← Home
  </button>
</div>
```

```css
.header-logo {
  height: 40px;
  margin-right: 1rem;
}
```

### Example 4: Disable Refresh Button

```jsx
// In SlideViewer.jsx, simply remove:
<button 
  className="slide-viewer-nav-btn"
  onClick={() => window.location.reload()}
>
  ⟳ Refresh
</button>
```

## API Reference

### SlideViewer Props

SlideViewer uses route parameters (no direct props):

```jsx
<Route path="/slide/:slideId" element={<SlideViewer />} />
```

**Parameters:**
- `slideId` (string) - ID of presentation (matches filename without `.md`)

### State Management

```javascript
const [slideContent, setSlideContent] = useState(null)    // HTML from Marp
const [slideMetadata, setSlideMetadata] = useState(null)  // Title, description, file
const [loading, setLoading] = useState(true)              // Fetch state
const [error, setError] = useState(null)                  // Error message
const [allSlides, setAllSlides] = useState([])            // From manifest
```

### Fetch Behavior

1. **On Mount**: Fetches `/slides-manifest.json`
2. **On ID Change**: Fetches `/slides/{slideId}.html`
3. **Caching**: No caching (always fresh)
4. **Error Handling**: Graceful fallback with user message

## Performance Considerations

### File Sizes
- Marp HTML: ~50-200 KB per presentation
- Manifest JSON: ~500 B per slide
- Total load time: 100-300 ms (typical)

### Optimizations
- Slides cached by browser
- Lazy loading via route
- No unnecessary re-renders
- CSS animations use `transform` (GPU accelerated)

### Mobile Performance
- Responsive CSS media queries
- Touch-friendly button sizes
- Minimal animation on mobile

## Troubleshooting

### "Error Loading Slide"
**Cause**: Slide file doesn't exist  
**Solution**: Check filename in manifest, run `npm run build:slides`

### Slide not responding to clicks
**Cause**: Marp controls disabled  
**Solution**: Check browser console, ensure HTML injected correctly

### Footer overlapping content
**Cause**: Content area too small  
**Solution**: Adjust padding in `.slide-viewer-content`

### Buttons unresponsive on mobile
**Cause**: Touch event not captured  
**Solution**: Add `touch-action: manipulation` to button CSS

## Next Steps

1. **Customize Colors** - Edit gradient in SlideViewer.css
2. **Add Logo** - Place logo in public folder, import in header
3. **Modify Buttons** - Change text, icons, or positioning
4. **Theme Integration** - Align with your organization's colors
5. **Advanced Features** - Add presenter notes, slide search, etc.

## Deployment

SlideViewer automatically deploys with GitHub Pages:

```bash
# Commit changes
git add src/components/SlideViewer.*
git commit -m "Add SlideViewer template"

# Push to trigger GitHub Actions
git push origin main

# Slides available at:
# https://nato-re.github.io/slide/example-presentation
```

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | All features work |
| Firefox | ✅ Full | All features work |
| Safari | ✅ Full | All features work |
| Edge | ✅ Full | All features work |
| IE 11 | ❌ No | Not supported |

## Advanced Features

### Add Presenter Notes
Marp supports presenter notes with `<!-- -->` comments - they display in presenter view (P key).

### Add Slide Search
Use browser Find (Ctrl+F) - works within Marp slides.

### Full-Screen Presenter Mode
Press P on any slide to enter presenter view with:
- Current slide
- Next slide preview
- Presenter notes
- Timer

### Export Slides
Use Marp CLI to export individual slides:
```bash
npx @marp-team/marp-cli slides/my-slide.md --pdf
```

---

**Questions?** Check the Marp documentation: https://marp.app/
