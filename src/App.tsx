import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WindowDimensionsProvider from './context/WindowDimensionsContext'
import Home from './pages/Home/Home'

function App() {
  return (
    <WindowDimensionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/gallery" element={<Gallery />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </WindowDimensionsProvider>
  )
}

export default App
