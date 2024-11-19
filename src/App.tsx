import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { WindowDimensionProvider } from "./context/WindowDimensionContext";
import { Landing } from "./pages/landing";
import { PageLoading } from "./components/Loading";
import Home from "./pages/home";
import Links from "./pages/links";

const About = lazy(() => import("./pages/about"));
const Experience = lazy(() => import("./pages/experience"));
const Projects = lazy(() => import("./pages/projects"));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <WindowDimensionProvider>
              <Landing />
            </WindowDimensionProvider>
          }
        >
          <Route index element={<Links key="home" />} />
          {/* <Route index element={<Home key="home" />} /> */}
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoading />}>
                <About key="about" />
              </Suspense>
            }
          />
          <Route
            path="experience"
            element={
              <Suspense fallback={<PageLoading />}>
                <Experience key="experience" />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<PageLoading />}>
                <Projects key="projects" />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
