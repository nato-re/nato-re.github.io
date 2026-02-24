import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const slidesDir = path.join(projectRoot, 'slides')
const outputDir = path.join(projectRoot, 'dist', 'slides')
const themePath = path.join(projectRoot, 'themes', 'nato-re-theme.css')

console.log('👀 Watching slides directory for changes...')
console.log(`📁 Watching: ${slidesDir}`)

let debounceTimer = null

export const buildSingleSlide = (filename) => {
  const inputPath = path.join(slidesDir, filename)
  const outputFile = filename.replace('.md', '.html')
  const outputPath = path.join(outputDir, outputFile)

  console.log(`\n🔄 Converting: ${filename}`)

  try {
    // Extract title from the first heading in the markdown file
    const content = fs.readFileSync(inputPath, 'utf-8')
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : filename.replace('.md', '')

    // Build the Marp command with custom CSS theme for single file
    const marpCommand = `npx @marp-team/marp-cli@latest "${inputPath}" --output "${outputPath}" --html --css "${themePath}" --no-stdin`

    execSync(marpCommand, { stdio: 'inherit' })

    // Inject slide tracker script into the HTML
    const htmlContent = fs.readFileSync(outputPath, 'utf-8')
    const trackerScript = fs.readFileSync(path.join(projectRoot, 'slides-tracker.js'), 'utf-8')
    const injectedHtml = htmlContent.replace(
      '</body>',
      `<script>${trackerScript}</script></body>`
    )
    fs.writeFileSync(outputPath, injectedHtml)

    console.log(`✅ Converted: ${outputFile}`)
    
    // Update the slides manifest
    updateManifest()
  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message)
  }
}

const updateManifest = () => {
  try {
    // Read all HTML files in output directory
    const htmlFiles = fs.readdirSync(outputDir).filter(file => file.endsWith('.html'))
    
    const presentations = htmlFiles.map(file => {
      const mdFile = file.replace('.html', '.md')
      const mdPath = path.join(slidesDir, mdFile)
      
      let title = file.replace('.html', '')
      let description = ''
      
      if (fs.existsSync(mdPath)) {
        const content = fs.readFileSync(mdPath, 'utf-8')
        const titleMatch = content.match(/^#\s+(.+)$/m)
        const descriptionMatch = content.match(/^>\s+(.+?)$/m)
        
        title = titleMatch ? titleMatch[1].trim() : title
        description = descriptionMatch ? descriptionMatch[1].trim() : ''
      }
      
      return {
        id: file.replace('.html', ''),
        title,
        description,
        file: mdFile,
        url: `/slides/${file}`
      }
    })

    const manifest = { presentations }
    const manifestPath = path.join(projectRoot, 'dist', 'slides-manifest.json')
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    
    // Also sync to public folder
    const publicManifestPath = path.join(projectRoot, 'public', 'slides-manifest.json')
    fs.writeFileSync(publicManifestPath, JSON.stringify(manifest, null, 2))
    
    console.log(`📊 Updated manifest`)
  } catch (error) {
    console.error(`❌ Error updating manifest:`, error.message)
  }
}

