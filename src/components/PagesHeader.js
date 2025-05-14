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
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Services</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pages-right-header">
          <a href="mailto:lasabahebwa@gmail.com" className="contact">
            Contact
          </a>
        </div>
      </div>
      <div className="pages-mobile-nav">
        <nav className="pages-main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
