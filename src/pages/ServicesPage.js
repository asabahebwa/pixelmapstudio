import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ServicesPage = () => {
  return (
    <>
      <Header />
      <div className="page-container">
        <div className="content">
          <h1 className="content-header">Our Services</h1>
          <p className="content-description">
            We offer a wide range of digital mapping and location-based services.
          </p>
          
          <div className="services-grid">
            <div className="service-item">
              <h3>Custom Google Maps Solutions</h3>
              <p>Expert integration of Google Maps for your business needs.</p>
            </div>
            
            <div className="service-item">
              <h3>Location Intelligence</h3>
              <p>Transform your business with data-driven mapping insights.</p>
            </div>
            
            <div className="service-item">
              <h3>Mobile App Development</h3>
              <p>Location-aware apps built for iOS and Android platforms.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;