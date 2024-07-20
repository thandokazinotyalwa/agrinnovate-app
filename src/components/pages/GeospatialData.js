import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GeospatialData.css";

const GeospatialData = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    // Fetch user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        console.log("Location fetched:", { latitude, longitude });

        try {
          // Fetch weather data from OpenWeather
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8c78e9e7e9928cd1a2a6f923072c3dec`
          );
          setWeather(weatherResponse.data);
          console.log("Weather data fetched:", weatherResponse.data);

          // Fetch tailored recommendations
          const recommendationsResponse = await axios.get(
            `https://api.yourapi.com/recommendations?lat=${latitude}&lon=${longitude}`
          );
          setRecommendations(recommendationsResponse.data);
          console.log(
            "Recommendations data fetched:",
            recommendationsResponse.data
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      (error) => console.error("Error getting location:", error),
      { timeout: 10000 }
    );
  }, []);

  return (
    <div className="geospatial-data">
      {location && weather && recommendations ? (
        <div className="data-container">
          <div className="location-info">
            <h2>Your Location</h2>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
          <div className="weather-info">
            <h2>Weather Information</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
          <div className="recommendations-info">
            <h2>Recommendations</h2>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default GeospatialData;
