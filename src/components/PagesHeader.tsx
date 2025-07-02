import { Link, NavLink } from "react-router";
import "../styles/PagesHeader.css";
import logo from "../assets/logo.svg";

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
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : ""
                  }
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : ""
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pages-right-header">
          <nav className="main-nav">
            <ul>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : ""
                  }
                >
                  Contact
                </NavLink>
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
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : ""
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : ""
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
