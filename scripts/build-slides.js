#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const slidesDir = path.join(projectRoot, 'slides')
const outputDir = path.join(projectRoot, 'dist', 'slides')

console.log('🎯 Building Marp slides...')
console.log(`📁 Input directory: ${slidesDir}`)
console.log(`📁 Output directory: ${outputDir}`)

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
  console.log(`✅ Created output directory`)
}

// Check if slides directory exists
if (!fs.existsSync(slidesDir)) {
  console.warn(`⚠️  Slides directory not found: ${slidesDir}`)
  console.log('Creating slides directory...')
  fs.mkdirSync(slidesDir, { recursive: true })
}

// Find all .md files in slides directory
const markdownFiles = fs.readdirSync(slidesDir).filter(file => file.endsWith('.md'))

if (markdownFiles.length === 0) {
  console.log('ℹ️  No Markdown files found in slides directory.')
  
  // Create an empty manifest
  const manifest = { presentations: [] }
  fs.writeFileSync(
    path.join(projectRoot, 'dist', 'slides-manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
  console.log('✅ Created empty slides manifest')
  process.exit(0)
}

console.log(`📝 Found ${markdownFiles.length} Markdown file(s)`)

const presentations = []

// Convert each markdown file to HTML using Marp
markdownFiles.forEach(file => {
  const inputPath = path.join(slidesDir, file)
  const outputFile = file.replace('.md', '.html')
  const outputPath = path.join(outputDir, outputFile)
  
  console.log(`🔄 Converting: ${file}`)
  
  try {
    // Extract title from the first heading in the markdown file
    const content = fs.readFileSync(inputPath, 'utf-8')
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')
    
    // Extract description from the first paragraph
    const descriptionMatch = content.match(/^>\s+(.+?)$/m)
    const description = descriptionMatch ? descriptionMatch[1].trim() : ''
    
    // Build the Marp command
    const marpCommand = `npx @marp-team/marp-cli@latest "${inputPath}" --output "${outputPath}" --html`
    
    execSync(marpCommand, { stdio: 'inherit' })
    
    console.log(`✅ Created: ${outputFile}`)
    
    presentations.push({
      id: file.replace('.md', ''),
      title,
      description,
      file,
      url: `/slides/${outputFile}`
    })
  } catch (error) {
    console.error(`❌ Error converting ${file}:`, error.message)
  }
})

// Write the manifest file
const manifest = { presentations }
const manifestPath = path.join(projectRoot, 'dist', 'slides-manifest.json')
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

console.log(`\n✅ Slides build complete!`)
console.log(`📊 Created manifest with ${presentations.length} presentation(s)`)
console.log(`📄 Manifest: dist/slides-manifest.json`)
