import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PresentationList from './components/PresentationList'
import SlideViewer from './components/SlideViewer'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PresentationList />} />
        <Route path="/slide/:slideId" element={<SlideViewer />} />
      </Routes>
    </Router>
  )
}

export default App
