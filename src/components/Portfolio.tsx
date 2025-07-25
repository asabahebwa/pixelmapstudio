import { Link } from "react-router";
import "../styles/Portfolio.css";

function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "Markers and InfoWindows",
      category: "Google Maps",
      completed: true,
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/temps.png",
      link: "/projects/markers-and-infowindows",
    },
    {
      id: 2,
      title: "Health-adjusted Life Expectancy",
      category: "ZingChart",
      completed: true,
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/hle.png",
      link: "/projects/health-adjusted-life-expectancy",
    },

    {
      id: 3,
      title: "Earthquake Magnitude Heatmap",
      category: "Google Maps",
      completed: true,
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/eHeatmap.png",
      link: "/projects/earthquake-magnitude-heatmap",
    },
    {
      id: 4,
      title: "Historical FIFA world cup geo map",
      category: "Google Maps",
      completed: true,
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/fifaewc.png",
      link: "/projects/fifa-world-cup",
    },
    {
      id: 5,
      title: "Personal injury road accidents in GB from 1979",
      category: "D3",
      completed: true,
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/gba.png",
      link: "/projects/personal-injury-road-accidents",
    },

    {
      id: 6,
      title: "Uber pick up locations in New York City",
      category: "D3",
      completed: true,
      image:
        "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/upl.png",
      link: "/projects/uber-pickup-locations-in-new-york-city",
    },
  ];

  return (
    <div className="portfolio-wrapper">
      <div className="portfolio-content">
        <div className="portfolio-header">Our Portfolio</div>
        <p className="portfolio-description">
          Explore our recent projects showcasing innovative digital solutions
          that drive business growth and enhance user experiences.
        </p>
        <div className="portfolio-flex-container">
          {portfolioItems.map((item) => (
            <div className="portfolio-item" key={item.id}>
              {item.completed ? (
                <Link to={item.link} className="portfolio-link">
                  <div className="portfolio-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-image"
                    />
                  </div>
                  <div className="portfolio-info">
                    <p>{item.title}</p>
                  </div>
                </Link>
              ) : (
                <div className="portfolio-link">
                  <div className="portfolio-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-image coming-soon-image"
                    />
                  </div>
                  <div className="portfolio-info">
                    <p>{item.title}(Coming Soon)</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
