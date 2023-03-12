import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom"
import Home from "./pages/home/Home"
import ThreeScroller from "./pages/three-scroller/ThreeScroller"
import DripText from "./pages/drip-text/DripText"
import TitleMotion from "./pages/title-motion/TitleMotion"
import LetterMotion from "pages/letter-motion/LetterMotion"
import LoadingAnimations from "pages/loading-animations/LoadingAnimations"
import IntroAnimations from "pages/intro-animations/IntroAnimations"
import Porthole from "pages/porthole/Porthole"

function App() {
  const PortholePages = ["/porthole", "/porthole#1", "/porthole#2"]
  const PortholeRoutes = PortholePages.map((path, index) => (
    <>
      <Route path={path} element={<Porthole key={index} />} />
    </>
  ))
  const IntroAnimationsPages = [
    "/intro-animations",
    "/intro-animations#1",
    "/intro-animations#2",
    "/intro-animations#3",
    "/intro-animations#4",
    "/intro-animations#5",
  ]
  const IntroAnimationsRoutes = IntroAnimationsPages.map((path, index) => (
    <>
      <Route path={path} element={<IntroAnimations key={index} />} />
    </>
  ))
  const LoadingAnimationsPages = [
    "/loading-animations",
    "/loading-animations#1",
    "/loading-animations#2",
    "/loading-animations#3",
    "/loading-animations#4",
    "/loading-animations#5",
    "/loading-animations#6",
  ]
  const LoadingAnimationsRoutes = LoadingAnimationsPages.map((path, index) => (
    <>
      <Route path={path} element={<LoadingAnimations key={index} />} />
    </>
  ))
  const LetterMotionPages = [
    "/letter-motion",
    "/letter-motion#0",
    "/letter-motion#1",
    "/letter-motion#2",
    "/letter-motion#3",
    "/letter-motion#4",
    "/letter-motion#5",
    "/letter-motion#6",
    "/letter-motion#7",
  ]

  const LetterMotionRoutes = LetterMotionPages.map((path, index) => (
    <>
      <Route path={path} element={<LetterMotion key={index} />} />
    </>
  ))

  const TitleMotionPages = [
    "/title-motion",
    "/title-motion#0",
    "/title-motion#1",
    "/title-motion#2",
    "/title-motion#3",
    "/title-motion#4",
    "/title-motion#5",
    "/title-motion#6",
    "/title-motion#7",
  ]

  const TitleMotionRoutes = TitleMotionPages.map((path, index) => (
    <>
      <Route path={path} element={<TitleMotion key={index} />} />
    </>
  ))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/three-js" element={<ThreeScroller />} />
        <Route path="/drip-text" element={<DripText />} />
        {TitleMotionRoutes}
        {LetterMotionRoutes}
        {LoadingAnimationsRoutes}
        {IntroAnimationsRoutes}
        {PortholeRoutes}
      </Routes>
    </Router>
  )
}

export default App
