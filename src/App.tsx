import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LocationMapsPage from "./pages/LocationMapsPage";
import HeatmapPage from "./pages/HeatmapPage";
import NotFoundPage from "./pages/NotFoundPage";
import LifeExpectancyPage from "./pages/LifeExpectancyPage";
import WorldCupPage from "./pages/WorldCupPage";
import HexagonLayerPage from "./pages/HexagonLayerPage";
import HeatmapLayerPage from "./pages/HeatmapLayerPage";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/projects/fifa-world-cup" element={<WorldCupPage />} />
          <Route
            path="/projects/health-adjusted-life-expectancy"
            element={<LifeExpectancyPage />}
          />
          <Route
            path="/projects/personal-injury-road-accidents"
            element={<HexagonLayerPage />}
          />
          <Route
            path="/projects/uber-pickup-locations-in-new-york-city"
            element={<HeatmapLayerPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
