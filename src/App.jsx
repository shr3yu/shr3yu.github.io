import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BootingupPage from './pages/BootingupPage'
import InfoPage from './pages/InfoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/bootingup" element={<BootingupPage />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  )
}

export default App

