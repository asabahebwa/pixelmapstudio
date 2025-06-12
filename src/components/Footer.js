import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-columns">
          <div className="column-one">
            <div className="logo">
              <p className="brand-name">PixelMap</p>
            </div>

            <p className="brand-slogan">precise data-viz craftsmanship</p>
            <div className="brand-social-icons">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="xTwitter"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://bluesky.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
              >
                <FontAwesomeIcon icon={faBluesky} />
              </a>
            </div>
          </div>
          <div className="column-two">
            <div className="column-three">
              <p className="footer-column-heading mb-3">Products & Services</p>
              <p className="footer-column-option mb-3">For Business</p>
              <p className="footer-column-option mb-3">For Partners</p>
              <p className="footer-column-option mb-3">For Advertising</p>
              <p className="footer-column-option mb-3">For Developers</p>
            </div>

            <div className="column-four">
              <p className="footer-column-heading mb-3">Contact</p>
              <p className="footer-column-option mb-3">lasabahebwa@gmail.com</p>
              <p className="footer-column-option mb-3">(+256) 785 759096</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-trademark">
            {" "}
            &copy; 2025 PixelMap, Inc. "PixelMap" and the logo design are
            registered trademarks of PixelMap. All Rights Reserved.{" "}
          </div>
          <div className="footer-bottom-links">
            <span>Terms of Use</span>|<span>Privacy Policy</span>|
            <span>Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
