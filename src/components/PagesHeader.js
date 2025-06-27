import React from "react";
import { Link } from "react-router-dom";
import "../styles/PagesHeader.css";
import logo from "../assets/logo.svg"; // Adjust the path to your logo image

export default function Header() {
  return (
    <header className="pages-header-container">
      <div className="pages-header">
        <div className="pages-left-header">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo-img" className="logo-img" />
              <span className="pages-brand-name">PixelMap</span>
            </Link>
          </div>
        </div>
        <div className="pages-center-header">
          <nav className="pages-main-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pages-right-header">
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="pages-mobile-nav">
        <nav className="pages-main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
