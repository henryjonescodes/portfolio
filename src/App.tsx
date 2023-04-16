import IntroAnimations from "pages/intro-animations/IntroAnimations"
import LetterMotion from "pages/letter-motion/LetterMotion"
import LoadingAnimations from "pages/loading-animations/LoadingAnimations"
import Porthole from "pages/porthole/Porthole"
import { useContext } from "react"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import { AuthContext, AuthProvider } from "./Auth"
import DripText from "./pages/drip-text/DripText"
import Home from "./pages/home/Home"
import ThreeScroller from "./pages/three-scroller/ThreeScroller"
import TitleMotion from "./pages/title-motion/TitleMotion"
import ThreeHtml from "pages/three-html/ThreeHtml"
import SvgTracing from "pages/svg-tracing/SvgTracing"

type RequireAuthProps = {
  children: JSX.Element
  redirectTo: string
}

function RequireAuth({ children, redirectTo }: RequireAuthProps) {
  const { currentUser } = useContext(AuthContext)
  return !!currentUser ? children : <Navigate to={redirectTo} />
}

function App() {
  const PortholePages = ["/porthole", "/porthole#1", "/porthole#2"]
  const PortholeRoutes = PortholePages.map((path, index) => (
    <>
      <Route
        path={path}
        element={
          <RequireAuth redirectTo="/">
            <Porthole key={index} />
          </RequireAuth>
        }
      />
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
      <Route
        path={path}
        element={
          <RequireAuth redirectTo="/">
            <IntroAnimations key={index} />
          </RequireAuth>
        }
      />
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
      <Route
        path={path}
        element={
          <RequireAuth redirectTo="/">
            <LoadingAnimations key={index} />
          </RequireAuth>
        }
      />
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
      <Route
        path={path}
        element={
          <RequireAuth redirectTo="/">
            <LetterMotion key={index} />
          </RequireAuth>
        }
      />
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
      <Route
        path={path}
        element={
          <RequireAuth redirectTo="/">
            <TitleMotion key={index} />
          </RequireAuth>
        }
      />
    </>
  ))

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/three-js"
            element={
              <RequireAuth redirectTo="/">
                <ThreeScroller />
              </RequireAuth>
            }
          />
          <Route
            path="/drip-text"
            element={
              <RequireAuth redirectTo="/">
                <DripText />
              </RequireAuth>
            }
          />
          <Route
            path="/three-html"
            element={
              <RequireAuth redirectTo="/">
                <ThreeHtml />
              </RequireAuth>
            }
          />
          <Route
            path="/svg-tracing"
            element={
              <RequireAuth redirectTo="/">
                <SvgTracing />
              </RequireAuth>
            }
          />
          {TitleMotionRoutes}
          {LetterMotionRoutes}
          {LoadingAnimationsRoutes}
          {IntroAnimationsRoutes}
          {PortholeRoutes}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
