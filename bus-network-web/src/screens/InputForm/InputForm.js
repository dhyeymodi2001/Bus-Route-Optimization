import React, { useState } from "react";
import "./InputForm.css";

const InputForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [numberOfBuses, setNumberOfBuses] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      if (
        uploadedFile.type !== "text/csv" &&
        !uploadedFile.name.endsWith(".csv")
      ) {
        setError("Only CSV files are allowed.");
        setFile(null);
      } else {
        setError("");
        setFile(uploadedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file before uploading.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("number_of_buses", numberOfBuses);
    formData.append("time_window", timeWindow);

    try {
      const response = await fetch("http://127.0.0.1:5000/optimize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Your Route Data</h1>
      <p className="upload-description">
        Upload your CSV file containing route information and additional
        parameters
      </p>

      <div className="upload-section">
        <div className="file-upload">
          <div className="drag-drop">
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="csv-upload" className="file-drop-area">
              <span className="upload-icon">📁</span> Drag & Drop your CSV file
            </label>
            <p>or</p>
            <button className="browse-button">
              <label htmlFor="csv-upload">Browse Files</label>
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="form-section">
          <div className="input-group">
            <label htmlFor="number-of-buses">Number of Buses</label>
            <input
              type="number"
              id="number-of-buses"
              value={numberOfBuses}
              onChange={(e) => setNumberOfBuses(e.target.value)}
              placeholder="Enter number of buses"
            />
          </div>

          <div className="input-group">
            <label htmlFor="time-window">Time Window</label>
            <input
              type="text"
              id="time-window"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              placeholder="Start Time - End Time"
            />
          </div>
        </div>

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload & Optimize"}
        </button>
      </div>

      {result && (
        <div className="result-section">
          <h2>Optimization Results</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InputForm;
