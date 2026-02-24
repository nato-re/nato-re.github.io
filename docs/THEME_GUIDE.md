# 🎨 Custom CSS Theme Guide for Marp Slides

## Overview

Your Marp presentation now uses a **custom NATO-RE theme** with beautiful styling and utility classes. This guide explains how to use it.

---

## 📁 File Structure

```
nato-re.github.io/
├── themes/
│   └── nato-re-theme.css        ← Custom theme file
├── slides/
│   ├── example-presentation.md
│   ├── template-slide.md        ← Copy this as a template
│   └── your-presentation.md
└── scripts/
    └── build-slides.js          ← Automatically applies theme
```

---

## 🎯 How It Works

1. **Theme File** (`themes/nato-re-theme.css`)
   - Contains all CSS styling for Marp slides
   - Applied automatically when you build slides
   - Defines colors, fonts, layouts, and utility classes

2. **Build Process**
   - Run: `npm run build:slides`
   - Automatically applies `nato-re-theme.css` to all `.md` files
   - Generates styled HTML in `dist/slides/`

---

## 🎨 Built-in CSS Classes

### Text Styling

```html
<!-- Highlighted text (yellow/orange background) -->
<span class="highlight">Important text</span>

<!-- Success (green text) -->
<span class="success">✓ Success message</span>

<!-- Warning (orange text) -->
<span class="warning">⚠ Warning message</span>

<!-- Error (red text) -->
<span class="error">✗ Error message</span>

<!-- Info (blue text) -->
<span class="info">ℹ Information</span>
```

### Text Alignment

```html
<!-- Center text -->
<div class="text-center">
Centered content
</div>

<!-- Left align -->
<div class="text-left">
Left aligned
</div>

<!-- Right align -->
<div class="text-right">
Right aligned
</div>
```

### Two-Column Layout

```html
<div class="columns">
  <div class="column">
    <!-- Left column content -->
    - Point 1
    - Point 2
  </div>
  <div class="column">
    <!-- Right column content -->
    - Item A
    - Item B
  </div>
</div>
```

---

## 📝 Markdown Examples

### Example 1: Simple Slide with List

```markdown
## Features

- 📊 Data visualization
- ⚛️ React integration
- 🚀 Fast deployment
- 📱 Mobile responsive
```

### Example 2: Slide with Code

````markdown
## Code Example

```javascript
const nato = {
  name: 'NATO-RE',
  awesome: true
}
```
````

### Example 3: Slide with Colors

```markdown
## Status Report

<span class="success">✓ Completed</span>

<span class="warning">⚠ In Progress</span>

<span class="error">✗ Failed</span>
```

### Example 4: Two-Column Slide

```markdown
## Comparison

<div class="columns">
<div class="column">

### Option A
- Pros
- Benefits
- Features

</div>
<div class="column">

### Option B
- Cons
- Trade-offs
- Limitations

</div>
</div>
```

### Example 5: Centered Title

```markdown
---

<div class="text-center">

# Thank You!

Questions?

</div>
```

---

## 🎨 Theme Colors

The theme uses a gradient from **purple to blue**:

- **Primary**: `#667eea` (Blue)
- **Secondary**: `#764ba2` (Purple)
- **Accent**: `#f093fb` (Pink)
- **Text**: `#333` (Dark gray)

To customize colors, edit `themes/nato-re-theme.css`:

```css
:root {
  --primary-color: #667eea;    /* Change this */
  --secondary-color: #764ba2;  /* Change this */
  --accent-color: #f093fb;     /* Change this */
}
```

---

## 📏 Font Sizes

| Element | Size |
|---------|------|
| h1 | 60px |
| h2 | 48px |
| h3 | 36px |
| Regular text | 28px |
| Code | 22px |
| Lists | 28px |

---

## 🚀 Creating a New Presentation

### Step 1: Create a new `.md` file

```bash
touch slides/my-awesome-talk.md
```

### Step 2: Add content (use template-slide.md as reference)

```markdown
# My Awesome Talk

> A brief description of my presentation

---

## Introduction

Welcome to my presentation!

---

## Key Points

- Point 1
- Point 2
- Point 3

---

## Thank You!

Questions?
```

### Step 3: Build the slides

```bash
npm run build:slides
```

### Step 4: View in browser

- Open http://localhost:5174/
- Click on your new presentation card
- Enjoy the styled slides!

---

## 🎯 Advanced Customization

### Add Custom CSS to a Single Slide

Use Marp's YAML frontmatter:

```markdown
---
theme: default
paginate: true
_class: custom-class
---

# My Custom Slide
```

Then add CSS in `themes/nato-re-theme.css`:

```css
.custom-class {
  background: linear-gradient(45deg, red, blue);
}
```

### Hide Pagination

```markdown
---
paginate: false
---

# No page numbers here
```

### Custom Slide Transitions

```markdown
---
transition: fade
---

# Fade transition slide
```

---

## 🔧 Modify Theme Colors

Edit `themes/nato-re-theme.css` and change the `:root` variables:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
}
```

Then rebuild:

```bash
npm run build:slides
```

---

## 📚 Marp Markdown Syntax

### Headers

```markdown
# H1 - Title
## H2 - Section
### H3 - Subsection
```

### Lists

```markdown
- Unordered
- List
- Items

1. Ordered
2. List
3. Items
```

### Code

```markdown
Inline `code` with backticks

\`\`\`javascript
// Code block
const x = 42
\`\`\`
```

### Emphasis

```markdown
**Bold**
*Italic*
~~Strikethrough~~
```

### Links & Images

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

### Horizontal Rule

```markdown
---
```

### Blockquote

```markdown
> This is a blockquote
```

---

## ✅ Tips & Best Practices

1. **Use template-slide.md** as a starting point
2. **Keep slides simple** - Less text, more visuals
3. **Use colors** - Apply `highlight`, `success`, `warning`, `error` classes
4. **Two-column layouts** - Great for comparisons
5. **Consistent formatting** - Use the same heading structure
6. **Test locally** - Run `npm run dev` and preview before deploying
7. **Commit your slides** - Push to GitHub and watch CI/CD build them

---

## 🐛 Troubleshooting

### Slides look plain (no colors)

**Solution:** Run `npm run build:slides` to apply the theme

### Changes not visible

**Solution:** 
1. Run `npm run build:slides`
2. Refresh your browser (Ctrl+Shift+Delete to clear cache)

### CSS classes not working

**Make sure to use HTML syntax:**

```markdown
<!-- ✓ Correct -->
<span class="highlight">Text</span>

<!-- ✗ Wrong -->
[Text]{.highlight}
```

---

## 📖 Resources

- [Marp Documentation](https://marp.app/)
- [Marp CLI](https://github.com/marp-team/marp-cli)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## 🎉 You're Ready!

Start creating amazing presentations with NATO-RE! 🚀
