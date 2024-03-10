import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
          latitude
        )}&longitude=${encodeURIComponent(
          longitude
        )}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=7`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Received data:", data);
      setForecastData(data);
      setError(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  // Function to format time to 12-hour format (AM/PM)
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const [latitude, longitude] = location.split(",");
    handleSubmit(latitude.trim(), longitude.trim());
  };

  return (
    <div className="container">
      <h1 className="text-center">Open Meteo Forecast</h1>
      <div className="row mb-3">
        <div className="col">
          <button
            className="btn btn-primary me-2"
            onClick={() => handleSubmit(52.52, 13.41)}
          >
            Berlin
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => handleSubmit(40.7128, -74.006)}
          >
            New York
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit(34.0522, -118.2437)}
          >
            Los Angeles
          </button>
        </div>
      </div>
      <form onSubmit={handleSearch}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="form-control"
              placeholder="Enter latitude,longitude (e.g., 29.7604,-95.3698)"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {forecastData && (
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Hour</h2>
            <table className="table">
              <tbody>
                {forecastData.hourly.time.slice(0, 10).map((time, index) => (
                  <tr key={index}>
                    <td>{formatTime(time)}</td>
                    <td>{forecastData.hourly.temperature_2m[index]}°C</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
