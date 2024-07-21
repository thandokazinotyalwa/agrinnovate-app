// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./GeospatialData.css";

// const GeospatialData = () => {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [recommendations, setRecommendations] = useState(null);

//   useEffect(() => {
//     // Fetch user's location
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });

//         console.log("Location fetched:", { latitude, longitude });

//         try {
//           // Fetch weather data from OpenWeather
//           const weatherResponse = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8c78e9e7e9928cd1a2a6f923072c3dec`
//           );
//           setWeather(weatherResponse.data);
//           console.log("Weather data fetched:", weatherResponse.data);

//           // Fetch tailored recommendations
//           const recommendationsResponse = await axios.get(
//             `https://api.yourapi.com/recommendations?lat=${latitude}&lon=${longitude}`
//           );
//           setRecommendations(recommendationsResponse.data);
//           console.log(
//             "Recommendations data fetched:",
//             recommendationsResponse.data
//           );
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       },
//       (error) => console.error("Error getting location:", error),
//       { timeout: 10000 }
//     );
//   }, []);

//   return (
//     <div className="geospatial-data">
//       {location && weather && recommendations ? (
//         <div className="data-container">
//           <div className="location-info">
//             <h2>Your Location</h2>
//             <p>Latitude: {location.latitude}</p>
//             <p>Longitude: {location.longitude}</p>
//           </div>
//           <div className="weather-info">
//             <h2>Weather Information</h2>
//             <p>Temperature: {weather.main.temp}°C</p>
//             <p>Condition: {weather.weather[0].description}</p>
//           </div>
//           <div className="recommendations-info">
//             <h2>Recommendations</h2>
//             <ul>
//               {recommendations.map((rec, index) => (
//                 <li key={index}>{rec}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default GeospatialData;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill } from 'ol/style';
import 'ol/ol.css';
import './GeospatialData.css';

function GeospatialData() {
  const [farmLocation, setFarmLocation] = useState({ lat: '', lon: '', city: '', country: '' });
  const [cropType, setCropType] = useState('');
  const [weatherConditions, setWeatherConditions] = useState({});
  const [recommendations, setRecommendations] = useState('');
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Reference for the map instance
  const vectorSource = useRef(new VectorSource()); // Reference for vector source
  const vectorLayer = useRef(null); // Reference for vector layer

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setFarmLocation(prev => ({ ...prev, lat: latitude, lon: longitude }));
        await fetchWeatherData(latitude, longitude);
        await fetchLocationDetails(latitude, longitude);
        if (mapInstance.current) {
          updateMapView(latitude, longitude);
          addCircleToMap(latitude, longitude);
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current) {
      vectorLayer.current = new VectorLayer({
        source: vectorSource.current,
        style: new Style({
          stroke: new Stroke({
            color: '#ffcc00',
            width: 2,
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
          }),
        }),
      });

      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer.current,
        ],
        view: new View({
          center: fromLonLat([24, -25]), // Default center for Africa
          zoom: 5, // Default zoom level
        }),
      });
    }
  }, []);

  const updateMapView = (lat, lon) => {
    const view = mapInstance.current.getView();
    view.setCenter(fromLonLat([lon, lat]));
    view.setZoom(10); // Adjust zoom level for better visibility of the location
  };

  const addCircleToMap = (lat, lon) => {
    vectorSource.current.clear(); // Clear existing features
    const circleFeature = new Feature({
      geometry: new Circle(fromLonLat([lon, lat]), 5000), // Circle with a radius of 5000 meters
    });
    vectorSource.current.addFeature(circleFeature);
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const apiKey = '1ee4264117b73d2263eecd562f31ef5c';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const data = response.data;
      setWeatherConditions({
        temperature: data.main.temp,
        wind: data.wind.speed,
        rain: data.rain ? data.rain['1h'] || 0 : 0,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchLocationDetails = async (lat, lon) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
      const { address } = response.data;
      
      console.log('Address details:', address);

      setFarmLocation(prev => ({
        ...prev,
        city: address.city || address.town || address.village || address.suburb || '',
        country: address.country || ''
      }));
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  const handleCropTypeChange = (event) => {
    setCropType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const prediction = predictOptimalPractices(farmLocation, cropType, weatherConditions);
    setRecommendations(prediction);
  };

  const predictOptimalPractices = (farmLocation, cropType, weatherConditions) => {
    // Implement machine learning model logic here
    // Return tailored recommendations to the farmer
    return "Example recommendations based on input data";
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Agri-Assist (Agricultural Decision Support System)</h1>
        <form onSubmit={handleSubmit}>
          <label>Farm Location:</label>
          <input
            type="text"
            value={`${farmLocation.lat}, ${farmLocation.lon} (${farmLocation.city}, ${farmLocation.country})`}
            readOnly
            className="wide-input"
          />
          <br />
          <label>Weather Conditions:</label>
          <textarea
            value={JSON.stringify({
              Temperature: `${weatherConditions.temperature} °C`,
              Wind: `${weatherConditions.wind} m/s`,
              Rain: `${weatherConditions.rain} mm`,
              Pressure: `${weatherConditions.pressure} hPa`,
              Humidity: `${weatherConditions.humidity} %`,
            }, null, 2)}
            readOnly
            className="weather-input"
          />
          <br />
          <label>Crop Type:</label>
          <select value={cropType} onChange={handleCropTypeChange}>
            <option value="">Select Crop</option>
            <option value="spinach">Spinach</option>
            <option value="cabbage">Cabbage</option>
            <option value="carrots">Carrots</option>
            <option value="tomatoes">Tomatoes</option>
            <option value="butternut">Butternut</option>
            <option value="squash">Squash</option>
            <option value="onions">Onions</option>
            <option value="potatoes">Potatoes</option>
            <option value="cassava">Cassava</option>
            <option value="corn">Corn</option>
            <option value="basil">Basil</option>
          </select>
          <br />
          <button type="submit">Get Recommendations</button>
        </form>
        <h2>Recommendations:</h2>
        <p>{recommendations}</p>
      </div>
      <div className="map-container" ref={mapRef}></div>
    </div>
  );
}

export default GeospatialData;