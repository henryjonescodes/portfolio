import "./App.scss";
import { WindowDimensionProvider } from "./context/WindowDimensionContext";
import Experience from "./pages/experience";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects";
import About from "./pages/about";

export default function App() {
  return (
    <WindowDimensionProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Home />}>
            <Route path="about" element={<About key="about" />} />
            <Route
              path="experience"
              element={<Experience key="experience" />}
            />
            <Route path="projects" element={<Projects key="projects" />} />
          </Route>
          <Route path="/*" element={<Home />} /> {/* Fallback for root path */}
        </Routes>
      </Router>
    </WindowDimensionProvider>
  );
}
