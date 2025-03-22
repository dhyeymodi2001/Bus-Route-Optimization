import React, { useState, useEffect } from "react";
import "./Navbar.css";
import busLogo from "../../images/bus_icon.png";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Add drawer state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle drawer
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-logo">
          <img className="logo" src={busLogo} alt="Main-Logo" />
          Route Optimizer
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <a href="#howitworks">How It Works?</a>
            </li>
            <li>
              <a href="https://github.com/dhyeymodi2001/Bus-Route-Optimization">
                Source Code
              </a>
            </li>
            <li>
              <a href="https://medium.com/@dhyeymodi21/building-a-house-price-prediction-app-from-dataset-to-deployment-aebf68a9ae5c">
                Blog
              </a>
            </li>
            <li>
              <a href="#contactus">Contact</a>
            </li>
          </ul>
        </div>
        <div className="menu-container">
          <div onClick={handleDrawerToggle} className="menu-button">
            {isDrawerOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {isDrawerOpen && (
        <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
          <div onClick={handleDrawerToggle} className="close-button">
            <FaTimes />
          </div>
          <ul className="drawer-list">
            <li>
              <a href="#howitworks" onClick={handleDrawerToggle}>
                How It Works?
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dhyeymodi2001/Bus-Route-Optimization"
                onClick={handleDrawerToggle}
              >
                Source Code
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@dhyeymodi21/building-a-house-price-prediction-app-from-dataset-to-deployment-aebf68a9ae5c"
                onClick={handleDrawerToggle}
              >
                Blog
              </a>
            </li>
            <li>
              <a href="#contactus" onClick={handleDrawerToggle}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
