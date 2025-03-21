import React, { useState } from "react";
import "./InputForm.css";
import BusResults from "../Results/Results";

const InputForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [solverType, setSolverType] = useState("lp"); // Default to LP

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
    formData.append("csv_file", file);

    console.log("Uploading file:", file.name);
    console.log("FormData contains:", formData.get("file"));
    console.log("Solver type:", solverType);

    let apiUrl = "https://bus-route-optimization-rsvx.onrender.com/optimize"; // Default to LP URL
    if (solverType === "cp") {
      apiUrl = "https://bus-route-optimization-1-ffhu.onrender.com/optimize"; // CP URL
    }

    try {
      console.log("Uploading file:", file.name);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setResult(data);
    } catch (error) {
      console.error("Upload Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container" id="optimize-now">
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

        <div className="solver-selection">
          <label>
            <input
              type="radio"
              value="lp"
              checked={solverType === "lp"}
              onChange={() => setSolverType("lp")}
            />
            Linear Programming (LP)
          </label>
          <label>
            <input
              type="radio"
              value="cp"
              checked={solverType === "cp"}
              onChange={() => setSolverType("cp")}
            />
            Constraint Programming (CP)
          </label>
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
          <BusResults data={result} />
        </div>
      )}
    </div>
  );
};

export default InputForm;
