#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const distSlides = path.join(projectRoot, 'dist')
const publicDir = path.join(projectRoot, 'public')

console.log('📋 Syncing slides to public folder...')

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// Copy slides-manifest.json
const manifestSrc = path.join(distSlides, 'slides-manifest.json')
const manifestDest = path.join(publicDir, 'slides-manifest.json')

if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, manifestDest)
  console.log('✅ Copied slides-manifest.json')
} else {
  console.warn('⚠️  slides-manifest.json not found in dist')
}

// Copy slides directory
const slidesSrc = path.join(distSlides, 'slides')
const slidesDest = path.join(publicDir, 'slides')

if (fs.existsSync(slidesSrc)) {
  // Remove old slides directory
  if (fs.existsSync(slidesDest)) {
    fs.rmSync(slidesDest, { recursive: true })
  }
  
  // Copy entire slides directory
  fs.cpSync(slidesSrc, slidesDest, { recursive: true })
  console.log('✅ Synced slides directory')
} else {
  console.warn('⚠️  slides directory not found in dist')
}

console.log('✅ Sync complete!')
