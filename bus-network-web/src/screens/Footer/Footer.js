import React from "react";
import {
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
  FaEnvelope,
  FaPhoneSquare,
} from "react-icons/fa";
import "./Footer.css";
import busLogo from "../../images/bus_icon.png";
import research_paper from "../../data/Modeling and Analysis of Bus Scheduling Systems of Urban Public Bus Transport.pdf";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo and Description */}

        <div className="footer-links">
          <div className="foo-logo">
            <img className="f-logo" src={busLogo} alt="Footer-Logo" />
            Route Optimizer
          </div>
          <p className="footer-link2">
            Intelligent bus route optimization
            <br /> solution for mordern transit
            <br /> solutions.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-link-list">
            <li>
              <a href="/home" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="#optimize-now" className="footer-link">
                Optimize Now
              </a>
            </li>
            <li>
              <a href="#howitworks" className="footer-link">
                How It Works?
              </a>
            </li>
            <li>
              <a href="#contactus" className="footer-link">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="footer-resources">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-link-list">
            <li>
              <a
                href="https://github.com/dhyeymodi2001/Bus-Route-Optimization"
                className="footer-link"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@dhyeymodi21/building-a-house-price-prediction-app-from-dataset-to-deployment-aebf68a9ae5c"
                className="footer-link"
              >
                Medium Article
              </a>
            </li>
            <li>
              <a
                href={research_paper} // Replace with the actual file path
                className="footer-link"
                download="research-paper.pdf" // Specify the desired filename for download
              >
                Research Paper
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="footer-social-icons">
            <a
              href="mailto:dhyeymodi21@gmail.com?body=Hey!%20I%20came%20across%20your%20house%20prediction%model%2C%20and%20wanted%20to%20get%20in%20touch%20with%20you."
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/dhyey-modi-28769b218"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/dhyeymodi2001/House-Price-Prediction"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=16477615235&text=Hi!%20I%20saw%20your%20project"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+1 (647) 761-5235"
              className="footer-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhoneSquare />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Moddsoft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
