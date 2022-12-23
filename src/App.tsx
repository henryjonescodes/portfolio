import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import ThreeScroller from "./pages/three-scroller/ThreeScroller"
import DripText from "./pages/drip-text/DripText"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/three-js" element={<ThreeScroller />} />
        <Route path="/drip-text" element={<DripText />} />
      </Routes>
    </Router>
  )
}

export default App
