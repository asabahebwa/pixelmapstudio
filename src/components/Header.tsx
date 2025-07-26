import { useState, useEffect } from "react";
import { Link } from "react-router";
import "../styles/Header.css";
import logo from "../assets/logo.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      <div className="header">
        <div className="left-header">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo-img" className="logo-img" />
              <span className={`brand-name ${scrolled ? "scrolled" : ""}`}>
                PixelMap
              </span>
            </Link>
          </div>
        </div>
        <div className="center-header">
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/" className={scrolled ? "scrolled" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className={scrolled ? "scrolled" : ""}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className={scrolled ? "scrolled" : ""}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right-header">
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/contact" className={scrolled ? "scrolled" : ""}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="mobile-nav">
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/" className={scrolled ? "scrolled" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className={scrolled ? "scrolled" : ""}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className={scrolled ? "scrolled" : ""}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
