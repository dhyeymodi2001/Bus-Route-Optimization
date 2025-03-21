import React from "react";
import "./Home.css";
import header_img from "../../images/bus_route.jpeg";

const HeroSection = () => {
  const handleScrollToSection = () => {
    const section = document.getElementById("predict-price");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-container">
      <div className="content">
        <h1 className="heading">Optimize Your Bus Routes with our model.</h1>
        <p className="subheading">
          Upload your dataset and get intelligent route optimization suggestions
          in minutes. Save time, reduce costs, and improve efficiency.
        </p>
        <button className="cta-button" onClick={handleScrollToSection}>
          Start Optimizing Now
        </button>
      </div>
      <div className="map-container">
        <img src={header_img} alt="Map_Image" className="map-image" />
      </div>
    </div>
  );
};

export default HeroSection;
