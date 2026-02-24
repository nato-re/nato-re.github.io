import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SlideViewer.css'
// Função simples para gerar um hash/checksum do conteúdo do manifesto
const generateHash = (obj) => {
  return btoa(JSON.stringify(obj)).substring(0, 16);
};
function SlideViewer() {
  const { slideId } = useParams()
  const navigate = useNavigate()
  const [slideMetadata, setSlideMetadata] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allSlides, setAllSlides] = useState([])
  const fragment = window.location.hash.substring(1) // Remove #
// Ref para persistir o hash atual sem disparar re-renders desnecessários
  const lastManifestHash = useRef(localStorage.getItem('manifest_hash'))
  const [currentSlideIndex, setCurrentSlideIndex] = useState(fragment ? parseInt(fragment, 10) : 1)
  const iframeRef = React.useRef(null)

useEffect(() => {
  console.log("[HMR] Registrando ouvinte de slides..."); // Se isso não aparecer, o useEffect não rodou

  if (import.meta.hot) {
    const handleUpdate = (data) => {
      console.log('[HMR] Evento recebido do servidor:', data);
      console.log('[HMR] Slide ID do evento:', slideId);
      if (data.slideId === slideId) {
        if (iframeRef.current) {
          console.log('[HMR] Atualizando iframe para slide:', slideId);
          const url = new URL(iframeRef.current.src);
          url.searchParams.set('t', Date.now());
          iframeRef.current.src = url.pathname + url.search + url.hash;
        }
      }
    };

    import.meta.hot.on('slide-content-update', handleUpdate);

    return () => {
      import.meta.hot.off('slide-content-update', handleUpdate);
    };
  }
}, [slideId]);
// Fetch slides manifest com verificação de Hash
useEffect(() => {
const fetchManifest = async () => {
      try {
        // Adicionamos um timestamp para ignorar o cache do navegador na verificação
        const response = await fetch(`/slides-manifest.json?t=${Date.now()}`)
        if (!response.ok) throw new Error('Failed to load slides manifest')
        
        const manifest = await response.json()
        setAllSlides(manifest.presentations || [])
      } catch (err) {
        console.error('Error loading manifest:', err)
        setError('Erro ao verificar atualizações do manifesto.')
      }
    }
    fetchManifest()
  }, [])
  // Get metadata from manifest when slideId or allSlides change
  useEffect(() => {
    if (!slideId) {
      setLoading(false)
      return
    }

    if (allSlides.length === 0) {
      return
    }

    try {
      // Get metadata from the manifest
      const metadata = allSlides.find(slide => slide.id === slideId)
      if (!metadata) {
        setError('Presentation not found in manifest')
        setLoading(false)
        return
      }
      setSlideMetadata(metadata)
      setError(null)
      setLoading(false)
    } catch (err) {
      setError(`Error loading presentation: ${err.message}`)
    }
  }, [slideId, allSlides])

  // Listen for slide index changes from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      console.log('[SlideViewer] Message event received:', {
        data: event.data,
        origin: event.origin,
        currentOrigin: window.location.origin,
        source: event.source
      })
      
      // Accept messages from same origin or wildcard
      if (event.data && typeof event.data === 'object' && event.data.type === 'slidechange') {
        const index = event.data.index 
        console.log('[SlideViewer] Received slide change message from iframe:', index)
        setCurrentSlideIndex(Number(index))
        // Update URL fragment with slide index - use replaceState to avoid history pollution
        window.history.replaceState(null, '', `#${index}`)
      }
    }

    console.log('[SlideViewer] Setting up message listener')
    window.addEventListener('message', handleMessage)
    
    // Also log when iframe is loaded
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        console.log('[SlideViewer] Iframe loaded')
      }
    }

    return () => {
      console.log('[SlideViewer] Removing message listener')
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // Load slide index from URL fragment on mount and when hash changes
  useEffect(() => {
    const loadSlideIndexFromHash = () => {
      const fragment = window.location.hash.substring(1) // Remove #
      if (fragment) {
        const indexFromUrl = parseInt(fragment, 10)
        if (!isNaN(indexFromUrl)) {
          setCurrentSlideIndex(indexFromUrl)
          return
        }
      }
      // Default to slide 0 if no valid fragment
      setCurrentSlideIndex(1)
    }

    loadSlideIndexFromHash()

    // Listen for hash changes
    window.addEventListener('hashchange', loadSlideIndexFromHash)
    return () => window.removeEventListener('hashchange', loadSlideIndexFromHash)
  }, [])

  // Update iframe hash when currentSlideIndex changes
  useEffect(() => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.location.hash = currentSlideIndex > 0 ? `${currentSlideIndex}` : ''
      } catch (e) {
        // Iframe might be in a different origin or not loaded yet
        console.log('Could not update iframe hash:', e)
      }
    }
  }, [currentSlideIndex])

  // Sync URL fragment whenever slide index changes
  useEffect(() => {
    console.log('[SlideViewer] currentSlideIndex changed to:', currentSlideIndex)
    window.history.replaceState(null, '', `#${currentSlideIndex}`)
  }, [currentSlideIndex])

  if (!slideId) {
    return (
      <div className="slide-viewer-error">
        <h2>No slide selected</h2>
        <p>Select a presentation from the home page to begin.</p>
      </div>
    )
  }

  if (loading) {
    return <div className="slide-viewer-loading">Loading presentation...</div>
  }

  if (error) {
    return (
      <div className="slide-viewer-error">
        <h2>Error Loading Slide</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  return (
    <div className="slide-viewer-container">
      {/* Header with navigation */}
      <div className="slide-viewer-header">
        <div className="slide-viewer-header-left">
          <button 
            className="slide-viewer-nav-btn"
            onClick={() => navigate('/')}
            title="Back to home"
          >
            ← Home
          </button>
        </div>

        <div className="slide-viewer-header-center">
          {slideMetadata && (
            <h1 className="slide-viewer-title">{slideMetadata.title}</h1>
          )}
        </div>

        <div className="slide-viewer-header-right">
          <button 
            className="slide-viewer-nav-btn"
            onClick={() => window.location.reload()}
            title="Refresh slide"
          >
            ⟳ Refresh
          </button>
        </div>
      </div>

      {/* Slide content iframe */}
      <div className="slide-viewer-content">
        <iframe
          ref={iframeRef}
          className="slide-viewer-iframe"
          src={`/slides/${slideId}.html${currentSlideIndex > 0 ? `#${currentSlideIndex}` : ''}`}
          title={slideMetadata?.title || 'Slide'}
          frameBorder="0"
          scrolling="no"
        />
      </div>

      {/* Footer with slide info */}
      {slideMetadata && (
        <div className="slide-viewer-footer">
          <div className="slide-viewer-footer-left">
            <span className="slide-viewer-file-name">{slideMetadata.file}</span>
          </div>
          <div className="slide-viewer-footer-center">
            <span className="slide-viewer-description">
              {slideMetadata.description}
            </span>
          </div>
          <div className="slide-viewer-footer-right">
            <span className="slide-viewer-nav-hint">
              Use arrow keys or click the presentation to navigate
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SlideViewer
