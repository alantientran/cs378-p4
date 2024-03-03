import React, { useState } from "react";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const cities = [
    { name: "New York", latitude: 40.7128, longitude: -74.006 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
    // Add more cities as needed
  ];

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/weather?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Reset weather data if an error occurs
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <h2>Select a City</h2>
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => fetchWeather(city.latitude, city.longitude)}
          >
            {city.name}
          </button>
        ))}
      </div>
      {weatherData && (
        <div>
          <h2>Weather Information</h2>
          <p>Temperature: {weatherData.hourly.temperature_2m[0].value}°C</p>
          {/* Add more weather information here */}
        </div>
      )}
    </div>
  );
};

export default App;
