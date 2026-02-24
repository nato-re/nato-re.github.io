# 🎨 Quick CSS Theme Reference

## Theme Location
**File:** `themes/nato-re-theme.css`

## Build Command
```bash
npm run build:slides
```

---

## CSS Classes Reference

| Class | Usage | Example |
|-------|-------|---------|
| `.highlight` | Important text | `<span class="highlight">Important</span>` |
| `.success` | ✓ Success messages | `<span class="success">✓ Done</span>` |
| `.warning` | ⚠ Warnings | `<span class="warning">⚠ Careful</span>` |
| `.error` | ✗ Errors | `<span class="error">✗ Failed</span>` |
| `.info` | ℹ Information | `<span class="info">ℹ Note</span>` |
| `.text-center` | Center align | `<div class="text-center">Centered</div>` |
| `.text-left` | Left align | `<div class="text-left">Left</div>` |
| `.text-right` | Right align | `<div class="text-right">Right</div>` |
| `.columns` | Two-column layout | `<div class="columns">...` |
| `.column` | Column in layout | `<div class="column">...` |

---

## Color Palette

```css
--primary-color: #667eea    /* Blue */
--secondary-color: #764ba2  /* Purple */
--accent-color: #f093fb     /* Pink */
--text-color: #333          /* Dark Gray */
--light-bg: #f8f9fa         /* Light Gray */
--border-color: #e0e0e0     /* Border Gray */
```

---

## Common Markdown Patterns

### Pattern 1: Colored Status
```markdown
<span class="success">✓ Complete</span> | <span class="warning">⚠ Pending</span> | <span class="error">✗ Failed</span>
```

### Pattern 2: Two Columns
```markdown
<div class="columns">
<div class="column">

### Left
- Item 1
- Item 2

</div>
<div class="column">

### Right
- Item A
- Item B

</div>
</div>
```

### Pattern 3: Centered Slide
```markdown
<div class="text-center">

# Title

Subtitle here

</div>
```

### Pattern 4: Highlighted Points
```markdown
- <span class="highlight">Key point</span>
- Regular point
- <span class="info">Additional info</span>
```

---

## Slide Template

```markdown
# My Presentation Title

> A brief description appears here

---

## Section Title

Your content with:
- Bullet points
- <span class="highlight">Highlighted items</span>

---

## Two-Column Example

<div class="columns">
<div class="column">

### Left Side
- Point 1
- Point 2

</div>
<div class="column">

### Right Side
- Item A
- Item B

</div>
</div>

---

<div class="text-center">

# Thank You!

Questions?

</div>
```

---

## Workflow

1. **Create slide:** `touch slides/my-slide.md`
2. **Write content:** Add markdown + HTML with classes
3. **Build:** `npm run build:slides`
4. **Preview:** Visit http://localhost:5174/
5. **Customize:** Edit `themes/nato-re-theme.css` if needed
6. **Deploy:** Push to GitHub

---

## File Structure
```
nato-re.github.io/
├── themes/
│   └── nato-re-theme.css       ← Edit colors/styles here
├── slides/
│   ├── template-slide.md       ← Copy as reference
│   └── your-slides.md          ← Create your presentations
├── scripts/
│   ├── build-slides.js         ← Applies theme automatically
│   └── sync-slides.js
└── THEME_GUIDE.md              ← Full documentation
```

---

## Editing the Theme

**File:** `themes/nato-re-theme.css`

**Sections:**
- `:root` - Color variables
- `section` - Slide styling
- `h1, h2, h3` - Headings
- `code`, `pre` - Code blocks
- Utility classes at bottom

---

## Example: Custom Color Theme

```css
/* In themes/nato-re-theme.css */
:root {
  --primary-color: #1e3c72;      /* Dark blue */
  --secondary-color: #2a5298;    /* Medium blue */
  --accent-color: #00d4ff;       /* Cyan */
}
```

Then rebuild: `npm run build:slides`

---

## Tips
✓ Use `<span>` for inline styling  
✓ Use `<div>` for block layouts  
✓ Marp supports HTML in markdown  
✓ Check browser console for errors  
✓ Clear cache if styles don't update  

---

**Need more help?** Read `THEME_GUIDE.md` for detailed examples!
