import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogPage = () => {
  return (
    <>
      <Header />
      <div className="page-container">
        <div className="content">
          <h1 className="content-header">Our Blog</h1>
          <p className="content-description">
            Check back soon for our latest articles and updates!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
