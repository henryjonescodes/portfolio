import WindowDimensionsProvider from './context/WindowDimensionsContext'
import About from './pages/About'
import Home from './pages/Home'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <WindowDimensionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </WindowDimensionsProvider>
  )
}

export default App
