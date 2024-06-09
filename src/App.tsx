import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WindowDimensionsProvider from './context/WindowDimensionsContext'
import Home from './pages/Home/Home'
import Links from '@pages/Links/Links'
import { experienceMap } from '@pages/Home/components/experience/experience.contents'

function App() {
  return (
    <WindowDimensionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/links" element={<Links />} />
          <Route path="/" element={<Home />} />
          {Object.keys(experienceMap).map((key) => (
            <Route key={key} path={`/${key}`} element={<Home />} />
          ))}
        </Routes>
      </BrowserRouter>
    </WindowDimensionsProvider>
  )
}

export default App
