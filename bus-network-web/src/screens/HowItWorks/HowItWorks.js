import React from "react";
import { FaRegClipboard, FaBrain, FaClipboardCheck } from "react-icons/fa";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <section id="howitworks" className="ai-prediction-section">
      <div className="container">
        <h2 className="section-heading">How Our Bus Optimizer Works!</h2>
        <div className="steps-container">
          {/* Step 1 */}
          <div className="step-card">
            <FaRegClipboard className="step-icon" />
            <h3 className="step-title">Input Data</h3>
            <p className="step-description">
              Download our sample CSV template, enter your route details
              including route number, passenger demand, trip factor and then
              upload the completed file.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <FaBrain className="step-icon" />
            <h3 className="step-title">Model Analysis</h3>
            <p className="step-description">
              Our model analyzes your data using advanced algorithms to find the
              most efficient route and schedule combinations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <FaClipboardCheck className="step-icon" />
            <h3 className="step-title">Get Results</h3>
            <p className="step-description">
              Receive an optimized route plan, reducing operational costs and
              improving service efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
