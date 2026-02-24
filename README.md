# NATO-RE Presentations

A modern React + Marp presentation hosting platform with automated deployment to GitHub Pages.

## 📋 Project Structure

```
nato-re.github.io/
├── src/
│   ├── components/
│   │   ├── PresentationList.jsx    # Main page with slide links
│   │   └── PresentationList.css
│   ├── App.jsx                      # React Router setup
│   ├── App.css
│   ├── main.jsx                     # React entry point
│   └── index.css
├── slides/                           # ⭐ Add your .md files here
│   └── .gitkeep
├── scripts/
│   └── build-slides.js              # Marp build automation
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions workflow
├── package.json
├── vite.config.js
├── index.html
└── .gitignore
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your Markdown slides:**
   Create `.md` files in the `slides/` directory. Example structure:
   ```markdown
   # My Presentation Title
   
   > A brief description of the presentation
   
   ---
   
   ## Slide 1
   
   Content here...
   ```

3. **Build slides locally:**
   ```bash
   npm run build:slides
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Open http://localhost:5173 to view the presentation list.

5. **Build for production:**
   ```bash
   npm run build
   ```

### Adding Presentations

1. Create a new `.md` file in the `slides/` directory
2. Add a level-1 heading as the title (first line)
3. Optionally add a blockquote on the next line as description
4. Use `---` to separate slides

Example (`slides/my-presentation.md`):
```markdown
# My Awesome Presentation

> This is a description of my presentation

---

## Introduction

Welcome to my presentation!

---

## Main Content

Key points go here.
```

## 🔄 GitHub Actions Workflow

The `deploy.yml` workflow automatically:

1. Checks out your code
2. Installs Node.js dependencies
3. Builds the React app with Vite
4. Converts all `.md` files to HTML using Marp CLI
5. Creates `.nojekyll` to prevent Jekyll processing
6. Deploys everything to GitHub Pages

**Trigger:** The workflow runs automatically when you push to the `main` branch.

## 🌐 How It Works

### Frontend Flow

1. **PresentationList.jsx** loads at the home page (`/`)
2. It fetches `slides-manifest.json` generated during build
3. The manifest contains metadata about each presentation
4. Users click on a presentation card to view the HTML slide

### Build Process

The build script (`build-slides.js`):
- Scans the `slides/` directory for `.md` files
- Uses Marp CLI to convert each file to HTML
- Generates a `slides-manifest.json` with metadata
- Places all HTML files in `dist/slides/`
- Extracts titles and descriptions from markdown headings

### Deployment

- React app is served from `/` (home page with slide list)
- Marp slides are served from `/slides/*.html`
- No routing conflicts because Marp slides are static files
- `.nojekyll` prevents GitHub Pages from processing underscore-prefixed files

## ⚙️ Configuration

### Vite Configuration (`vite.config.js`)

Customize build output paths, asset handling, etc.

### Marp Options

In `build-slides.js`, you can add Marp CLI options:
```javascript
const marpCommand = `npx @marp-team/marp-cli@latest "${inputPath}" --output "${outputPath}" --html --theme custom`
```

Available Marp CLI options:
- `--theme <name>`: Use a built-in or custom theme
- `--html`: Enable HTML in markdown
- `--allow-local-files`: Allow loading local images
- `--watch`: Watch for file changes

## 📝 Markdown Features (Marp)

Marp supports standard Markdown with extensions:

```markdown
---
theme: default
paginate: true
---

# Slide Title

---

## Content Slide

Regular markdown content with:
- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

---

### Code Example

\`\`\`javascript
console.log('Hello, World!')
\`\`\`

---

![Image Alt](./path/to/image.png)
```

## 🎨 Customization

### React App Styling

Edit `src/components/PresentationList.css` to customize the presentation list page.

### Marp Slide Theming

Create a custom CSS theme file and reference it in `build-slides.js`:

```javascript
const marpCommand = `... --css-paths "./path/to/custom-theme.css"`
```

## 🐛 Troubleshooting

### Slides not showing up
- Ensure `.md` files are in the `slides/` directory
- Run `npm run build` to regenerate the dist folder
- Check that `slides-manifest.json` exists in `dist/`

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure `.nojekyll` file exists in dist folder
- Check Marp CLI version: `npx @marp-team/marp-cli@latest --version`

### Deployment fails
- Check GitHub Actions logs in the "Actions" tab of your repository
- Verify `.github/workflows/deploy.yml` is in the main branch
- Ensure GitHub Pages is enabled in repository settings

## 📚 Resources

- [Marp Documentation](https://marp.app/)
- [Marp CLI](https://github.com/marp-team/marp-cli)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

This project is part of NATO-RE. See LICENSE file for details.
