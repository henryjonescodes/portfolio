import Contact from '@pages/Contact'
import ExperiencePage from '@pages/ExperiencePage'
import Gallery from '@pages/Gallery'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WindowDimensionsProvider from './context/WindowDimensionsContext'
import Home from './pages/Home'

function App() {
  return (
    <WindowDimensionsProvider>
      <BrowserRouter>
        {/* <Landing /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </WindowDimensionsProvider>
  )
}

export default App
