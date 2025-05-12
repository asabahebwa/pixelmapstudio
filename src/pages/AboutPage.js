import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="page-container">
        <div className="content">
          <h1 className="content-header">About Us</h1>
          <p className="content-description">
            PixelMap Studio is a digital agency specializing in location-based
            services and custom mapping solutions for businesses of all sizes.
          </p>
          
          <div className="about-content">
            <p>
              Founded in 2020, our team brings together expertise in
              cartography, software development, and UX design to create
              powerful mapping experiences.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;