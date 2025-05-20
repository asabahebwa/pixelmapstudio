import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Create this as your main page
import BlogPage from "./pages/BlogPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LocationMapsPage from "./pages/LocationMapsPage";
import HeatmapPage from "./pages/HeatmapPage";
import ScrollToTop from "./components/ScrollToTop"; // Import the ScrollToTop component
import "./styles/App.css";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/projects/markers-and-infowindows"
            element={<LocationMapsPage />}
          />
          <Route
            path="/projects/earthquake-magnitude-heatmap"
            element={<HeatmapPage />}
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
