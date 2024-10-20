import "./App.scss";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:page?" element={<Home />} />
      </Routes>
    </Router>
  );
}
