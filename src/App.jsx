import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PresentationList from './components/PresentationList'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PresentationList />} />
        {/* Slides are served as static HTML files in /slides/* */}
      </Routes>
    </Router>
  )
}

export default App
