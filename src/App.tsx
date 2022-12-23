import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import ThreeScroller from "./pages/three-scroller/ThreeScroller"
import DripText from "./pages/drip-text/DripText"
import TitleMotion from "./pages/title-motion/TitleMotion"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/three-js" element={<ThreeScroller />} />
        <Route path="/title-motion" element={<TitleMotion />} />
        <Route path="/drip-text" element={<DripText />} />
      </Routes>
    </Router>
  )
}

export default App
