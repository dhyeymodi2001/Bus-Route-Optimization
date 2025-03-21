import React from "react";
import "./BusResults.css";
import Results_img from "../../images/Results_img.jpg";

const BusResults = ({ data }) => {
  if (!data || !data.results) return <p>No data available</p>;

  const totalBusITrips = data.total_bus_type_i_trips;
  const totalBusIITrips = data.total_bus_type_ii_trips;

  const totalRoutes = data.results.reduce((acc, result) => {
    if (!acc.includes(result.route)) {
      acc.push(result.route);
    }
    return acc;
  }, []).length;

  return (
    <div className="bus-results-container">
      <h2 className="r-heading">Optimized Route Results</h2>
      <p className="r-sub-heading">Here's your optimized bus route plan</p>

      <div className="content-grid">
        {/* Route Map (Placeholder - Replace with actual map component) */}
        <div className="map-container">
          <div className="map-placeholder">
            <img
              src={Results_img}
              alt="Route Map"
              className="map-image-placeholder"
            />
          </div>
        </div>

        {/* Route Statistics (Updated) */}
        <div className="stats-container">
          <div className="stat-card" style={{ backgroundColor: "#e0f7fa" }}>
            <span className="stat-label">Total Routes</span>
            <span className="stat-value">{totalRoutes}</span>
          </div>
          <div className="stat-card" style={{ backgroundColor: "#e8f5e9" }}>
            <span className="stat-label">Total Buses</span>
            <span className="stat-value">2</span>
          </div>
          <div className="stat-card" style={{ backgroundColor: "#fff3e0" }}>
            <span className="stat-label">Buses Used (Type I)</span>
            <span className="stat-value">{totalBusITrips}</span>
          </div>
          <div className="stat-card" style={{ backgroundColor: "#fce4ec" }}>
            <span className="stat-label">Buses Used (Type II)</span>
            <span className="stat-value">{totalBusIITrips}</span>
          </div>
        </div>
      </div>
      <div>
        {/* Your Existing Table (Optional - Include if needed in this layout) */}
        <div className="existing-table">
          <table className="results-table">
            <thead>
              <tr>
                <th className="th">Route</th>
                <th className="th">Shift</th>
                <th className="th">Bus Type I Trips</th>
                <th className="th">Bus Type II Trips</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((result, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                >
                  <td className="td">{result.route}</td>
                  <td className="td">{result.shift}</td>
                  <td className="td">{result.bus_type_i_trips}</td>
                  <td className="td">{result.bus_type_ii_trips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusResults;
