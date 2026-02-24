# 🎬 SlideViewer Template - What's New

## Summary

You now have a **professional React-based template wrapper** for all your Marp presentations. Every slide is displayed inside a customizable template with headers, footers, and navigation.

## What Changed

### ✨ New Components

| File | Purpose |
|------|---------|
| `src/components/SlideViewer.jsx` | Main template component |
| `src/components/SlideViewer.css` | Template styling |
| `SLIDEVIEWER_GUIDE.md` | Full documentation |
| `SLIDEVIEWER_SETUP.md` | Quick start guide |
| `SLIDEVIEWER_COMPLETE.md` | Complete reference |

### 🔄 Updated Components

| File | Changes |
|------|---------|
| `src/App.jsx` | Added route `/slide/:slideId` |
| `src/components/PresentationList.jsx` | Links now use SlideViewer instead of direct HTML |
| `src/components/PresentationList.css` | Added focus/active states for keyboard nav |

## Features

### Header
- **Back Button** - Return to presentation list
- **Title Display** - Shows current presentation name
- **Refresh Button** - Reload slide without refetching

### Content Area
- **Centered Display** - Professional slide container
- **Shadow Effects** - Modern visual styling
- **Responsive** - Works on all device sizes

### Footer
- **Metadata** - Filename and description
- **Keyboard Hints** - Navigation instructions
- **Status Info** - Current slide information

### Full Marp Integration
- ✅ Arrow key navigation
- ✅ Presenter mode (P key)
- ✅ Fullscreen (F key)
- ✅ Click to advance
- ✅ Black screen (. key)

## How to Use

### View a Slide

1. Run dev server: `npm run dev`
2. Open http://localhost:5174/
3. Click any presentation card
4. SlideViewer loads with template

### Navigate

**Keyboard:**
- Arrow keys → Previous/Next
- P → Presenter view
- F → Fullscreen

**Mouse:**
- Click slide → Next
- "← Home" button → Back to list

## Customization

### Quick Color Change

Edit `src/components/SlideViewer.css`:

```css
.slide-viewer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change gradient colors here */
}
```

### Hide Footer

```css
.slide-viewer-footer {
  display: none;
}
```

### Add Logo

Place `logo.png` in `public/` folder, then edit `SlideViewer.jsx` header.

## File Structure

```
nato-re.github.io/
├── src/
│   ├── components/
│   │   ├── SlideViewer.jsx (NEW)
│   │   ├── SlideViewer.css (NEW)
│   │   ├── PresentationList.jsx (updated)
│   │   └── PresentationList.css (updated)
│   └── App.jsx (updated)
├── SLIDEVIEWER_GUIDE.md (NEW)
├── SLIDEVIEWER_SETUP.md (NEW)
└── SLIDEVIEWER_COMPLETE.md (NEW)
```

## Development Workflow

```bash
# 1. Start dev server
npm run dev

# 2. Build slides (when you add new .md files)
npm run build:slides

# 3. Open browser
http://localhost:5174/

# 4. Click a presentation → SlideViewer loads it
```

## Before vs After

### Before (Direct HTML)
```
PresentationList
    ↓ (click)
Static HTML slide
    ↓
Bare presentation (no navigation)
```

### After (SlideViewer)
```
PresentationList
    ↓ (click)
SlideViewer Template
    ├─ Header [← Home] [Title] [Refresh]
    ├─ Content (Marp HTML)
    └─ Footer [Filename] [Description]
```

## What You Get

✅ **Professional Appearance** - Styled header and footer  
✅ **Easy Navigation** - Back button, refresh option  
✅ **Responsive Design** - Works on desktop/tablet/mobile  
✅ **Full Marp Features** - All controls still work  
✅ **Easy Customization** - Simple CSS changes  
✅ **No Breaking Changes** - Your presentations still work  

## Next Steps

1. **Test** - Run `npm run dev` and click a presentation
2. **Customize** - Edit colors in SlideViewer.css
3. **Create** - Add new .md files to slides/
4. **Deploy** - Push to GitHub (automatic deployment)

## Documentation

| Document | Purpose |
|----------|---------|
| `SLIDEVIEWER_SETUP.md` | How to set up and use |
| `SLIDEVIEWER_GUIDE.md` | Complete customization guide |
| `SLIDEVIEWER_COMPLETE.md` | Full reference with examples |
| `THEME_QUICK_REFERENCE.md` | CSS class cheat sheet |

## Technical Details

### Component Flow
```jsx
App.jsx
  ├── Route: "/" → PresentationList
  └── Route: "/slide/:slideId" → SlideViewer
```

### Data Flow
```
SlideViewer
  ├── Fetch: /slides-manifest.json
  ├── Get slideId from URL
  ├── Fetch: /slides/{slideId}.html
  ├── Extract metadata from manifest
  └── Render template with HTML
```

### Styling
- Header: Purple-blue gradient (customizable)
- Content: White background with shadow
- Footer: Semi-transparent with white text
- Responsive breakpoints: 768px and 480px

## Browser Support

✅ Chrome  
✅ Firefox  
✅ Safari  
✅ Edge  
❌ IE 11 (not supported)

## Common Questions

**Q: Do my slides still work?**  
A: Yes! All Marp features work inside SlideViewer.

**Q: Can I customize the header/footer?**  
A: Yes! Edit SlideViewer.jsx and SlideViewer.css.

**Q: Does this affect deployment?**  
A: No! GitHub Actions automatically handles everything.

**Q: Can I go back to direct HTML links?**  
A: Yes! Just remove the SlideViewer route in App.jsx.

**Q: How do I add a logo?**  
A: Place image in public/, then import in SlideViewer.jsx.

## Support

See the detailed documentation files for:
- Full customization examples
- Advanced features
- Troubleshooting
- Performance optimization
- Deployment instructions

---

**Ready to present? Run `npm run dev` and visit http://localhost:5174/!** 🚀
