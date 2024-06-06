import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WindowDimensionsProvider from './context/WindowDimensionsContext'
import Home from './pages/Home/Home'
import Links from '@pages/Links/Links'

function App() {
  return (
    <WindowDimensionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/links" element={<Links />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </WindowDimensionsProvider>
  )
}

export default App
