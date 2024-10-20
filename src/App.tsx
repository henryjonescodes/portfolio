import "./App.scss";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Define a route that takes a string as a parameter */}
        <Route path="/:page" element={<Home />} />
        {/* Default route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
