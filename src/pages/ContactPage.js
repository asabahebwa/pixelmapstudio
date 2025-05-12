import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="page-container">
        <div className="content">
          <h1 className="content-header">Contact Us</h1>
          <p className="content-description">
            Get in touch with our team to discuss your project needs.
          </p>
          
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;