import { Link } from "react-router";
import "../styles/Services.css";

function Services() {
  const serviceItems = [
    {
      id: 1,
      title: "Mapping",
      icon: "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/mapping.png",
      description:
        "Creating maps to show data distribution, density, and relationships. Our mapping solutions help you visualize geographical data patterns and make informed decisions based on spatial information.",
    },
    {
      id: 2,
      title: "3D Modeling",
      icon: "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/3dmodelling.png",
      description:
        "Representing geographical areas in three dimensions for a more immersive view. Our 3D modeling brings depth and perspective to your spatial data, creating engaging and intuitive visualizations.",
    },

    {
      id: 3,
      title: "Dashboards",
      icon: "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/dashboards.png",
      description:
        "Developing dashboards with interactive maps and visualizations for exploration and analysis. Our interactive solutions allow users to dynamically engage with data for deeper insights.",
    },
    {
      id: 4,
      title: "Interactivity",
      icon: "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/interactivity.png",
      description:
        "Enabling users to zoom, pan, filter, and interact with the data on the map",
    },
    {
      id: 5,
      title: "Scalability",
      icon: "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/scalability.png",
      description:
        "Handling large datasets and providing access to visualizations through web and mobile platforms.",
    },

    {
      id: 6,
      title: "Customization",
      icon: "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/customization.png",
      description:
        "Offering options to customize map styles, visualizations, and user interfaces.",
    },
  ];
  return (
    <div data-testid="services-container" className="services-container">
      <div className="services-hero-container">
        <div className="services-hero-image">
          <div className="services-hero-content">
            <h1 className="services-hero-title">
              We help you explore, understand, and communicate your data in a
              visually impactful way.
            </h1>
            <Link to="/contact" className="contact-button">
              Let's talk
            </Link>
          </div>
        </div>
      </div>
      <div className="services-approach-container">
        <div className="services-approach-wrapper">
          <div className="services-approach-image">
            <img
              src={
                "https://weathersasa.lon1.cdn.digitaloceanspaces.com/pixelmapstudio/images/layouts.png"
              }
              alt="approach"
            />
          </div>
          <div className="services-approach-content">
            <h3> Our Approach</h3>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
              <div className="flex flex-col items-center gap-1 pt-3">
                <div
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <div className="w-[1.5px] bg-[#dbe0e6] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#ffffff] text-base font-medium leading-normal">
                  Strategy
                </p>
                <p>
                  In the initial phase, we collaborate to define the project's
                  goals and expectations. This involves understanding the
                  availability and structure of the dataset to be visualized.
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#ffffff] h-2"></div>
                <div
                  data-icon="PencilSimple"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </div>
                <div className="w-[1.5px] bg-[#dbe0e6] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#ffffff] text-base font-medium leading-normal">
                  Pre-production
                </p>
                <p>
                  In this phase, I develop a demo version of the final product.
                  A smaller subset of the dataset is analyzed and visualized,
                  incorporating preliminary user experience elements.
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 pb-3">
                <div className="w-[1.5px] bg-[#dbe0e6] h-2"></div>
                <div
                  data-icon="FilmSlate"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07-22.62,6L147.42,51.83Zm-66.69,17.6,28.12,16.24-36.94,9.75L88.53,67.37Zm-79.4,44.62-6-22.08,26.5-7L94.69,89.4ZM208,200H48V120H208v80Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#ffffff] text-base font-medium leading-normal">
                  Production
                </p>
                <p>
                  In the final phase, the entire dataset is integrated. All
                  visual and interactive elements—such as styles, fonts, colors,
                  layers, and transitions—are tailored to match the project's
                  overarching aesthetic and functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actual-services">
        <h2>Services to grow your brand</h2>

        <div className="services-flex-container">
          {serviceItems.map((item) => (
            <div className="service-item" key={item.id}>
              <div className="service-icon">
                <img
                  src={item.icon}
                  alt="customization"
                  width={60}
                  height={60}
                />
              </div>
              <div className="service-info">
                <h5 className="service-title">{item.title}</h5>
                <p className="service-description">{item.description}</p>
              </div>
              <div className="service-portfolio-link">
                See {item.title.toLowerCase()} demos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 inline-block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          className="mb-12 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Let's talk
        </Link>
      </div>
    </div>
  );
}

export default Services;
