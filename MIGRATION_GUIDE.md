# React + Marp Migration Guide

## ✅ Setup Complete!

Your NATO-RE GitHub Pages site has been successfully migrated to a modern React + Marp architecture. Here's everything you need to know.

---

## 📋 What Was Done

### 1. **Clean Repository**
- Removed old static files
- Initialized fresh Vite + React project
- Set up modern tooling (Node.js, npm, ES modules)

### 2. **Project Structure**
```
nato-re.github.io/
├── .github/workflows/
│   └── deploy.yml              ← 🚀 GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── PresentationList.jsx    ← Dynamic slide list
│   │   └── PresentationList.css
│   ├── App.jsx                 ← Router setup
│   ├── App.css
│   ├── main.jsx                ← React entry point
│   └── index.css               ← Global styles
├── slides/                      ← ⭐ Your Markdown files go here
│   └── example-presentation.md
├── scripts/
│   └── build-slides.js         ← Marp automation script
├── dist/                        ← 📦 Build output
│   ├── index.html              ← React app
│   ├── slides-manifest.json    ← Slide metadata
│   ├── slides/                 ← Compiled HTML slides
│   ├── css/
│   ├── js/
│   └── .nojekyll               ← Prevents Jekyll processing
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── .gitignore
```

### 3. **Automated Workflow**

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. ✅ Installs dependencies
2. ✅ Builds React app with Vite
3. ✅ Converts Markdown → HTML with Marp CLI
4. ✅ Creates `.nojekyll` file
5. ✅ Deploys everything to GitHub Pages

---

## 🚀 Getting Started (Local Development)

### Install & Run

```bash
# 1. Install dependencies (already done, but here for reference)
npm install

# 2. Add your presentations
#    Create .md files in the slides/ directory

# 3. Build slides
npm run build:slides

# 4. Build React app
npm run build

# 5. Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📝 Adding Presentations

### Step 1: Create a Markdown File

Create a new file in `slides/` directory (e.g., `slides/my-talk.md`):

```markdown
# My Awesome Presentation

> A brief description of my talk

---

## Slide 1

Content here...

---

## Slide 2

More content...
```

### Step 2: Required Format

The first line must be a **level-1 heading** (will become the slide title):
```markdown
# This becomes the presentation title
```

Optional: Add a **blockquote** on the next line for description:
```markdown
> This appears on the presentation list
```

### Step 3: Build & Deploy

```bash
# Build locally to test
npm run build:slides
npm run build

# Push to main branch
git add slides/my-talk.md
git commit -m "Add my new presentation"
git push origin main
```

GitHub Actions will automatically build and deploy!

---

## 🔄 How the Build Process Works

### Local Build Command

```bash
npm run build:slides
```

This script (`scripts/build-slides.js`):
1. Scans `slides/` for `.md` files
2. Uses **Marp CLI** to convert each file to HTML
3. Extracts title from `# Heading` (level-1)
4. Extracts description from `> blockquote` (if present)
5. Generates `slides-manifest.json` with metadata
6. Places HTML files in `dist/slides/`

### Example Build Output

Input: `slides/example-presentation.md`
```markdown
# Example Presentation

> This is an example presentation to demonstrate the Marp + React setup
```

Output: `dist/slides-manifest.json`
```json
{
  "presentations": [
    {
      "id": "example-presentation",
      "title": "Example Presentation",
      "description": "This is an example presentation to demonstrate...",
      "file": "example-presentation.md",
      "url": "/slides/example-presentation.html"
    }
  ]
}
```

---

## 🌐 How Routing Works (No Conflicts!)

### Frontend Routes

1. **Home Page (`/`):**
   - React Router serves `PresentationList` component
   - Loads `slides-manifest.json`
   - Displays all presentations as cards

2. **Slide Pages (`/slides/*.html`):**
   - **Direct static file requests** (not React Router)
   - Served as plain HTML files
   - Marp CLI generates self-contained HTML
   - Opens in same tab or new tab

### Why No Conflicts?

- React handles `/` routes only
- `/slides/*.html` are **static files**, not React routes
- Browser fetches them directly from the `dist/slides/` folder
- No React routing interference

### Linking to Slides

In `PresentationList.jsx`:
```javascript
<a 
  href={presentation.url}      // e.g., "/slides/example-presentation.html"
  target="_blank"              // Optional: open in new tab
  rel="noopener noreferrer"
>
  View Presentation
</a>
```

The URL is generated from the manifest, so it's always correct!

---

## 💾 GitHub Pages Configuration

### Automatic Setup

The `.github/workflows/deploy.yml` handles everything:
- Builds your site
- Deploys to GitHub Pages
- **No manual configuration needed**

### Manual GitHub Pages Settings (Optional)

If needed, verify in your repository:
1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (created automatically by Actions)
4. Folder: **/ (root)**

---

## 🎨 Customization

### Change Slide Styling

Marp supports themes. In `scripts/build-slides.js`, modify the build command:

```javascript
// Use a built-in theme
const marpCommand = `npx @marp-team/marp-cli@latest "${inputPath}" --output "${outputPath}" --html --theme gaia`

// Options: default, gaia, uncover
```

Or create a custom theme file and reference it:
```javascript
const marpCommand = `npx @marp-team/marp-cli@latest "${inputPath}" --output "${outputPath}" --html --css-paths "./my-theme.css"`
```

### Change React App Styling

Edit `src/components/PresentationList.css` to customize:
- Card design
- Colors
- Layout
- Responsive behavior

Edit `src/index.css` for global styles:
- Background
- Fonts
- Overall theme

### Change React Router Base

If your site is at `username.github.io/repo-name/`:
```javascript
// src/App.jsx
<BrowserRouter basename="/repo-name">
  <Routes>...</Routes>
</BrowserRouter>
```

And update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/repo-name/',  // Match your repository name
  // ...
})
```

---

## 📚 Marp Markdown Features

### Basic Formatting

```markdown
# Large Heading
## Medium Heading
### Small Heading

Regular paragraph text

**Bold text**
*Italic text*
~~Strikethrough~~
`inline code`
```

### Slide Separators

```markdown
# Slide 1

---

# Slide 2

---

# Slide 3
```

### Code Blocks

````markdown
```javascript
const greet = (name) => console.log(`Hello, ${name}!`)
greet('NATO-RE')
```

```python
def greet(name):
    print(f"Hello, {name}!")
```
````

### Lists

```markdown
## Bullet Points
- Item 1
- Item 2
  - Nested item
  - Another nested

## Numbered List
1. First
2. Second
3. Third
```

### Images

```markdown
![Alt text](./path/to/image.png)

<!-- Or with size -->
![Alt text](./image.png){width=500px}
```

### Links

```markdown
[Link text](https://example.com)

[Relative link](./another-slide.md)
```

### Highlights & Emphasis

```markdown
> **Note:** This is important!

> **Warning:** Be careful here

> This is a quote or callout
```

### Columns & Layout

```markdown
<!-- Two columns -->
# Slide Title

---

## Left Column | Right Column
- Left content | - Right content
- More left | - More right
```

### Presenter Notes

```markdown
# Slide Title

Visible on slide

<!--
This is a presenter note
It won't appear on the slide
-->
```

More: https://marp.app/

---

## 🐛 Troubleshooting

### Issue: Presentations Not Showing

**Solution:**
1. Check that `.md` files are in `slides/` directory
2. Run `npm run build:slides` to regenerate manifest
3. Check `dist/slides-manifest.json` exists
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: Styling Looks Wrong

**Solution:**
1. Ensure `.nojekyll` file exists in `dist/`
2. Verify GitHub Pages is serving from `/` (root)
3. Clear browser cache
4. Check Network tab in DevTools for failed requests

### Issue: Slides Not Converting

**Solution:**
1. Check file is named `*.md`
2. Ensure first line is `# Title`
3. Check terminal output for Marp CLI errors
4. Try: `npx @marp-team/marp-cli@latest --version`

### Issue: GitHub Actions Failing

**Solution:**
1. Check "Actions" tab in GitHub repository
2. Look at the workflow run logs
3. Common issues:
   - Node.js version mismatch (use 18.x)
   - npm cache issues (try `npm ci` instead of `npm install`)
   - Missing files (check `.gitignore`)

### Issue: CSS Not Applied in Slides

**Solution:**
Marp generates self-contained HTML. Styling is built-in.
To customize:
1. Create `custom-theme.css`
2. Reference in `build-slides.js`
3. Rebuild: `npm run build:slides`

---

## 📦 File Reference

### `package.json`
- Defines dependencies and build scripts
- Main scripts: `dev`, `build`, `build:slides`

### `vite.config.js`
- Vite bundler configuration
- Controls build output structure
- Can customize asset paths

### `index.html`
- Entry point for React app
- Links to root `<div id="root"></div>`

### `.github/workflows/deploy.yml`
- Automatic build & deploy workflow
- Triggers on push to `main` branch
- Deploys to `gh-pages` branch

### `scripts/build-slides.js`
- Converts `.md` files to HTML
- Generates manifest
- Extracts metadata from markdown

### `src/App.jsx`
- React Router setup
- Routes `/` to `PresentationList`

### `src/components/PresentationList.jsx`
- Fetches `slides-manifest.json`
- Displays cards for each presentation
- Links to `/slides/*.html`

---

## ✨ Pro Tips

### 1. **Use Markdown Frontmatter**

Add metadata at the top of slides (optional):
```markdown
---
theme: gaia
paginate: true
---

# Your Slide
```

### 2. **Organize Multiple Presentations**

```
slides/
├── team-kickoff.md
├── quarterly-review.md
├── training-session.md
└── project-demo.md
```

Build all at once with `npm run build:slides`!

### 3. **Use Custom CSS**

Create `themes/custom.css`:
```css
section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

Then in `build-slides.js`:
```javascript
const marpCommand = `npx @marp-team/marp-cli@latest "${inputPath}" --output "${outputPath}" --html --css-paths "./themes/custom.css"`
```

### 4. **Local Testing Before Deploy**

```bash
# Build everything locally
npm run build:slides
npm run build

# Start local server to test
npm run dev

# Or serve the dist folder
npx http-server dist/
```

Then open http://localhost:8080 (or shown port)

### 5. **Version Control**

Commit everything except:
- `node_modules/` (handled by `.gitignore`)
- `dist/` (regenerated on each build)

```bash
git status      # See what will be committed
git add .       # Stage all changes
git commit -m "Add new presentations"
git push origin main
```

---

## 🔗 Useful Links

- **Marp Documentation:** https://marp.app/
- **Marp CLI:** https://github.com/marp-team/marp-cli
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/
- **GitHub Pages:** https://pages.github.com/

---

## 📞 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server (localhost:5173)

# Building
npm run build           # Build React app
npm run build:slides    # Convert .md → .html

# Combined build (recommended for CI/CD)
npm run build && npm run build:slides

# Testing
npm run preview         # Preview production build locally
```

---

## 🎯 Next Steps

1. **Add Your First Presentation**
   ```bash
   # Create slides/your-presentation.md
   # Run: npm run build:slides
   # Commit and push to main
   ```

2. **Customize Styling**
   - Edit `src/components/PresentationList.css`
   - Edit `src/index.css`
   - Create custom Marp theme

3. **Monitor Deployments**
   - Check GitHub Actions tab for build status
   - Verify site at https://nato-re.github.io

4. **Share & Present**
   - Share links to presentations
   - View slides in any browser
   - Full Marp features available

---

## ✅ Verification Checklist

- [x] React app builds successfully
- [x] Marp CLI installed and working
- [x] `.nojekyll` file created
- [x] `slides-manifest.json` generates correctly
- [x] Example presentation renders
- [x] GitHub Actions workflow configured
- [x] All files committed to git

You're ready to go! 🚀
