import React, { useState, useEffect } from "react";

function App() {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div>
      <h1>Open Meteo Forecast</h1>
      {forecastData && (
        <div>
          <h2>Current</h2>
          <p>Temperature: {forecastData.current.temperature_2m}°C</p>
          <p>Wind Speed: {forecastData.current.wind_speed_10m} m/s</p>
          <h2>Hourly Forecast</h2>
          <ul>
            {forecastData.hourly.time.map((time, index) => (
              <li key={index}>
                <p>Time: {time}</p>
                <p>
                  Temperature: {forecastData.hourly.temperature_2m[index]}°C
                </p>
                <p>
                  Relative Humidity:{" "}
                  {forecastData.hourly.relative_humidity_2m[index]}%
                </p>
                <p>
                  Wind Speed: {forecastData.hourly.wind_speed_10m[index]} m/s
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
