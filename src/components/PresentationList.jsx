import React, { useEffect, useState } from 'react'
import './PresentationList.css'

function PresentationList() {
  const [presentations, setPresentations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch the list of presentations from the manifest
    // This assumes we have a slides-manifest.json file in the dist folder
    const fetchPresentations = async () => {
      try {
        const response = await fetch('/slides-manifest.json')
        if (!response.ok) {
          throw new Error('Failed to load presentations')
        }
        const data = await response.json()
        setPresentations(data.presentations || [])
      } catch (err) {
        console.error('Error loading presentations:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPresentations()
  }, [])

  if (loading) {
    return (
      <div className="app-container">
        <div className="app-content">
          <h1>Loading presentations...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="app-content">
          <h1>Error</h1>
          <p>{error}</p>
          <p>Make sure the slides have been built with the Marp CLI.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="header">
          <h1>NATO-RE Presentations</h1>
          <p>Select a presentation to get started</p>
        </header>

        {presentations.length === 0 ? (
          <div className="no-presentations">
            <p>No presentations available yet.</p>
            <p>Add .md files to the <code>slides/</code> directory and build the project.</p>
          </div>
        ) : (
          <div className="presentations-grid">
            {presentations.map((presentation) => (
              <a
                key={presentation.id}
                href={presentation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="presentation-card"
              >
                <div className="card-content">
                  <h2>{presentation.title}</h2>
                  {presentation.description && (
                    <p className="description">{presentation.description}</p>
                  )}
                  <div className="card-meta">
                    <span className="file-name">{presentation.file}</span>
                  </div>
                </div>
                <div className="card-arrow">→</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PresentationList
