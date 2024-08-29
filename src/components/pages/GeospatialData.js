import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Circle from "ol/geom/Circle";
import { fromLonLat } from "ol/proj";
import { Style, Stroke, Fill } from "ol/style";
import "ol/ol.css";
import "./GeospatialData.css";

function GeospatialData() {
  const [farmLocation, setFarmLocation] = useState({
    lat: "",
    lon: "",
    city: "",
    country: "",
  });
  const [cropType, setCropType] = useState("");
  const [weatherConditions, setWeatherConditions] = useState({});
  const [recommendations, setRecommendations] = useState("");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSource = useRef(new VectorSource());
  const vectorLayer = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setFarmLocation((prev) => ({ ...prev, lat: latitude, lon: longitude }));
        await fetchWeatherData(latitude, longitude);
        await fetchLocationDetails(latitude, longitude);
        if (mapInstance.current) {
          updateMapView(latitude, longitude);
          addCircleToMap(latitude, longitude);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current) {
      vectorLayer.current = new VectorLayer({
        source: vectorSource.current,
        style: new Style({
          stroke: new Stroke({
            color: "#ffcc00",
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(255, 255, 0, 0.1)",
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
      const apiKey = "1ee4264117b73d2263eecd562f31ef5c";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      setWeatherConditions({
        temperature: data.main.temp,
        wind: data.wind.speed,
        rain: data.rain ? data.rain["1h"] || 0 : 0,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchLocationDetails = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const { address } = response.data;

      console.log("Address details:", address);

      setFarmLocation((prev) => ({
        ...prev,
        city:
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          "",
        country: address.country || "",
      }));
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const handleCropTypeChange = (event) => {
    setCropType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const prediction = predictOptimalPractices(
      farmLocation,
      cropType,
      weatherConditions
    );
    setRecommendations(prediction);
  };

  const predictOptimalPractices = (
    farmLocation,
    cropType,
    weatherConditions
  ) => {
    return "Example recommendations based on input data";
  };

  return (
    <div className="geospatial-container">
      <div className="geospatial-form-container">
        <h1>Agri-Assist (Agricultural Decision Support System)</h1>
        <form onSubmit={handleSubmit} className="geospatial-form">
          <div className="form-group">
            <label className="geospatial-label" htmlFor="location">
              Farm Location:
            </label>
            <input
              type="text"
              id="location"
              value={`${farmLocation.lat}, ${farmLocation.lon} (${farmLocation.city}, ${farmLocation.country})`}
              readOnly
              className="geospatial-input"
            />
          </div>

          <div className="form-group">
            <label className="geospatial-label" htmlFor="weather">
              Weather Conditions:
            </label>
            <textarea
              id="weather"
              value={JSON.stringify(
                {
                  Temperature: `${weatherConditions.temperature} °C`,
                  Wind: `${weatherConditions.wind} m/s`,
                  Rain: `${weatherConditions.rain} mm`,
                  Pressure: `${weatherConditions.pressure} hPa`,
                  Humidity: `${weatherConditions.humidity} %`,
                },
                null,
                2
              )}
              readOnly
              className="geospatial-weather-input"
            />
          </div>

          <div className="form-group">
            <label className="geospatial-label" htmlFor="cropType">
              Crop Type:
            </label>
            <select
              id="cropType"
              value={cropType}
              onChange={handleCropTypeChange}
              className="geospatial-select"
            >
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
          </div>

          <button type="submit" className="geospatial-submit-btn">
            Get Recommendations
          </button>
        </form>

        <h2>Recommendations:</h2>
        <p>{recommendations}</p>
      </div>
      <div className="geospatial-map-container" ref={mapRef}></div>
    </div>
  );
}

export default GeospatialData;
