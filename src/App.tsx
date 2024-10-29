import "./App.scss";
import { WindowDimensionProvider } from "./context/WindowDimensionContext";
import Experience from "./pages/experience";
import Landing from "./pages/landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects";
import About from "./pages/about";
import { SettingsProvider } from "./context/SettingsContext";

export default function App() {
  return (
    <WindowDimensionProvider>
      <SettingsProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Landing />}>
              <Route path="about" element={<About key="about" />} />
              <Route
                path="experience"
                element={<Experience key="experience" />}
              />
              <Route path="projects" element={<Projects key="projects" />} />
            </Route>
            <Route path="/*" element={<Landing />} />
          </Routes>
        </Router>
      </SettingsProvider>
    </WindowDimensionProvider>
  );
}
