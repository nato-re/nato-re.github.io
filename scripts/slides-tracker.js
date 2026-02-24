/**
 * Slide Tracker - Tracks Marp slide changes and sends them to parent window
 * This script should be included in all Marp-generated HTML files
 */

(function() {
  'use strict'

  let currentSlideIndex = 0
  let iframeMode = window.parent !== window
  let marpInstance = null

  console.log('[SlideTracker] Script loaded. iframeMode:', iframeMode)

  // Try to get Marp instance
  function getMarpInstance() {
    if (window.marp) {
      return window.marp
    }
    // Try common Marp variable names
    for (let key in window) {
      if (window[key] && window[key].slides) {
        return window[key]
      }
    }
    return null
  }

  // Extract slide index from URL hash
  function getSlideIndexFromHash() {
    const hash = window.location.hash.substring(1)
    if (hash) {
      const index = parseInt(hash, 10)
      if (!isNaN(index)) {
        return index
      }
    }
    return 0
  }

  // Send slide change message to parent window
  function notifySlideChange(index) {
    if (iframeMode) {
      console.log('[SlideTracker] Notifying parent of slide change:', index)
      const message = {
        type: 'slidechange',
        index: index
      }
      console.log('[SlideTracker] Sending message:', message)
      window.parent.postMessage(message, '*')
    } else {
      console.log('[SlideTracker] Not in iframe mode, skipping notification')
    }
  }

  // Detect slide changes using mutation observer
  function setupMutationObserver() {
    console.log('[SlideTracker] Setting up mutation observer')
    
    const observer = new MutationObserver(() => {
      const newIndex = getSlideIndexFromHash()
      if (newIndex !== currentSlideIndex) {
        console.log('[SlideTracker] Mutation detected, index changed from', currentSlideIndex, 'to', newIndex)
        currentSlideIndex = newIndex
        notifySlideChange(currentSlideIndex)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-slide'],
      subtree: true,
      characterData: false
    })

    return observer
  }

  // Initialize
  function init() {
    currentSlideIndex = getSlideIndexFromHash()
    console.log('[SlideTracker] Initialized with slide index:', currentSlideIndex)

    // Listen for hash changes (when user navigates slides)
    window.addEventListener('hashchange', function() {
      const newIndex = getSlideIndexFromHash()
      console.log('[SlideTracker] Hash changed event. New index:', newIndex, 'Current:', currentSlideIndex)
      if (newIndex !== currentSlideIndex) {
        currentSlideIndex = newIndex
        notifySlideChange(currentSlideIndex)
      }
    })

    // Also listen for popstate (browser back/forward)
    window.addEventListener('popstate', function() {
      const newIndex = getSlideIndexFromHash()
      console.log('[SlideTracker] Popstate detected, index:', newIndex)
      if (newIndex !== currentSlideIndex) {
        currentSlideIndex = newIndex
        notifySlideChange(currentSlideIndex)
      }
    })

    // Set up mutation observer to detect DOM changes
    setupMutationObserver()

    // Try to hook into Marp's internal events
    setTimeout(function() {
      marpInstance = getMarpInstance()
      if (marpInstance) {
        console.log('[SlideTracker] Found Marp instance:', marpInstance)
        // Marp might have an event emitter
        if (marpInstance.on) {
          marpInstance.on('change', function(index) {
            console.log('[SlideTracker] Marp change event:', index)
            currentSlideIndex = index
            notifySlideChange(currentSlideIndex)
          })
        }
      }
    }, 500)

    // Notify parent of current slide on load
    setTimeout(function() {
      console.log('[SlideTracker] Sending initial notification, index:', currentSlideIndex)
      notifySlideChange(currentSlideIndex)
    }, 100)
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    console.log('[SlideTracker] DOM still loading, waiting for DOMContentLoaded')
    document.addEventListener('DOMContentLoaded', init)
  } else {
    console.log('[SlideTracker] DOM already loaded, initializing immediately')
    init()
  }
})()
