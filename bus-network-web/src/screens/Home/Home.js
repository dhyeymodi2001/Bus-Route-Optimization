import React from "react";
import "./Home.css";
import header_img from "../../images/bus_route.jpeg";
import bus_dataset from "../../data/bus_dataset.csv";

const csvFileURL = bus_dataset; // Replace with the actual URL

const handleDownloadCSV = () => {
  // Create a link element
  const link = document.createElement("a");
  link.href = csvFileURL;
  link.setAttribute("download", "sample_route_data.csv"); // Set the download attribute

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
};

const HeroSection = () => {
  const handleScrollToSection = () => {
    const section = document.getElementById("optimize-now");
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
        <div className="button-container">
          <button className="cta-button" onClick={handleScrollToSection}>
            Start Optimizing Now
          </button>
          <button className="cta-button" onClick={handleDownloadCSV}>
            Download Sample CSV
          </button>
        </div>
      </div>
      <div className="map-container">
        <img src={header_img} alt="Map_Image" className="map-image" />
      </div>
    </div>
  );
};

export default HeroSection;
