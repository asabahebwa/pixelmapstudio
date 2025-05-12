import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Portfolio.css";

function Portfolio() {
  // Categories for portfolio filtering
  const categories = ["All", "Google Maps", "Mobile Apps", "Branding", "UI/UX"];
  const [activeCategory, setActiveCategory] = useState("All");

  // Sample portfolio items - replace with your actual projects
  const portfolioItems = [
    {
      id: 1,
      title: "Markers and InfoWindows",
      category: "Google Maps",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "/projects/markers-and-infowindows",
    },
    {
      id: 2,
      title: "Markers and InfoWindows",
      category: "Mobile Apps",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 3,
      title: "Markers and InfoWindows",
      category: "Branding",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 4,
      title: "Markers and InfoWindows",
      category: "UI/UX",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 5,
      title: "Markers and InfoWindows",
      category: "Google Maps",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 6,
      title: "Markers and InfoWindows",
      category: "Mobile Apps",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 7,
      title: "Markers and InfoWindows",
      category: "UI/UX",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 8,
      title: "Markers and InfoWindows",
      category: "Google Maps",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
    {
      id: 9,
      title: "Markers and InfoWindows",
      category: "Mobile Apps",
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/location_temps.png",
      link: "#",
    },
  ];

  // Filter items based on active category
  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="portfolio-wrapper">
      <div className="portfolio-content">
        <div className="portfolio-header">Our Portfolio</div>
        <p className="portfolio-description">
          Explore our recent projects showcasing innovative digital solutions
          that drive business growth and enhance user experiences.
        </p>

        {/* <div className="portfolio-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div> */}

        <div className="portfolio-flex-container">
          {filteredItems.map((item) => (
            <div className="portfolio-item" key={item.id}>
              {item.id === 1 ? (
                <Link to={item.link} className="portfolio-link">
                  <div className="portfolio-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-image"
                    />
                  </div>

                  <div className="portfolio-info">
                    <h3>{item.title}</h3>
                  </div>
                </Link>
              ) : (
                <a href={item.link} className="portfolio-link">
                  <div className="portfolio-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-image"
                    />
                  </div>

                  <div className="portfolio-info">
                    <h3>{item.title}</h3>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
