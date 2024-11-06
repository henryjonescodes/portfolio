import "./App.scss";
import { WindowDimensionProvider } from "./context/WindowDimensionContext";
import Experience from "./pages/experience";
import { LandingWrapper } from "./pages/landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects";
import About from "./pages/about";
import Home from "./pages/home";

export default function App() {
  return (
    <WindowDimensionProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<LandingWrapper />}>
            <Route index element={<Home key="home" />} />
            <Route path="about" element={<About key="about" />} />
            <Route
              path="experience"
              element={<Experience key="experience" />}
            />
            <Route path="projects" element={<Projects key="projects" />} />
          </Route>
        </Routes>
      </Router>
    </WindowDimensionProvider>
  );
}
