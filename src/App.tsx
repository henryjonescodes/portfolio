import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SvgTracing from "./pages/svg-tracing/SvgTracing"
import Home from "./pages/home/Home"
import ThreeScroller from "./pages/three-scroller/ThreeScroller"

const Test = () => {
  return <div>test</div>
}

const Test2 = () => {
  return <div>test2</div>
}

const App = () => {
  // return <div>whouy??? </div>
  // return <Test />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThreeScroller />} />
        {/* <Route path="/test2" element={<Test2 />} /> */}
      </Routes>
    </BrowserRouter>
  )
  // // return (
  // <Route path="/" element={<div>whuy??? </div>} />
  // <Router>
  //   <Routes>
  // </Routes>
  // </Router>
  // )
}

export default App
