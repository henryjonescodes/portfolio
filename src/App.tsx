import "./App.scss";
import { WindowDimensionProvider } from "./context/WindowDimensionContext";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <WindowDimensionProvider>
      <Router>
        <Routes>
          <Route path="/:page?" element={<Home />} />
        </Routes>
      </Router>
    </WindowDimensionProvider>
  );
}
