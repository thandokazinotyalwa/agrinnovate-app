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
    if (!cropType) {
      alert("Please select a crop type.");
      return;
    }
    const prediction = predictOptimalPractices(cropType, weatherConditions);
    setRecommendations(prediction);
  };

  const predictOptimalPractices = (cropType, weather) => {
    const { temperature, wind, rain, pressure, humidity } = weather;

    let recommendation = "";

    switch (cropType.toLowerCase()) {
      case "spinach":
        recommendation += `Spinach Recommendations:\n\n`;
        if (temperature >= 15 && temperature <= 21) {
          recommendation += `-Planting Time: Ideal during early spring or fall when temperatures are cool.\n`;
        } else if (temperature > 21) {
          recommendation += `- Temperature: High temperatures detected (${temperature}°C). Provide partial shade and ensure consistent watering to prevent bolting.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) is a bit low. Spinach can still grow, but monitor for any frost conditions.\n`;
        }

        if (humidity >= 50) {
          recommendation += `- Humidity: Adequate humidity (${humidity}%) is beneficial. Ensure good air circulation to prevent fungal diseases.\n`;
        } else {
          recommendation += `- Humidity: Low humidity (${humidity}%). Consider using mulches to retain soil moisture.\n`;
        }

        break;

      case "butternut":
        recommendation += `### Butternut Squash Recommendations:\n\n`;
        if (temperature >= 24 && temperature <= 30) {
          recommendation += `-Planting Time: Perfect for warm, sunny conditions. Ensure planting after the last frost.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) may not be ideal. Consider delaying planting or using protective covers.\n`;
        }

        if (rain > 0) {
          recommendation += `- Rainfall: Adequate rainfall (${rain} mm) detected. Ensure proper drainage to prevent root rot.\n`;
        } else {
          recommendation += `- Rainfall: Low rainfall (${rain} mm). Implement irrigation strategies to maintain soil moisture.\n`;
        }

        break;

      case "squash":
        recommendation += ` Summer Squash Recommendations:\n\n`;
        if (temperature >= 21 && temperature <= 30) {
          recommendation += `- Planting Time: Best grown in warm conditions. Plant after the danger of frost has passed.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) is not ideal for summer squash. Consider providing shade if planting now.\n`;
        }

        if (humidity >= 50) {
          recommendation += `- Humidity: Good humidity levels (${humidity}%) support healthy growth. Ensure adequate air flow.\n`;
        } else {
          recommendation += `- Humidity: Low humidity (${humidity}%). Use mulches to retain soil moisture.\n`;
        }

        break;

      case "corn":
        recommendation += ` Corn Recommendations:\n\n`;
        if (temperature >= 16 && temperature <= 35) {
          recommendation += `- Planting Time: Suitable for warm temperatures. Ensure soil has warmed up before planting.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) may affect germination. Adjust planting time accordingly.\n`;
        }

        if (rain >= 10) {
          recommendation += `- Rainfall: Adequate rainfall (${rain} mm). Ensure proper drainage to prevent waterlogging.\n`;
        } else {
          recommendation += `- Rainfall: Low rainfall (${rain} mm). Implement irrigation to support growth, especially during tasseling and silking stages.\n`;
        }

        break;

      case "carrots":
        recommendation += `Carrot Recommendations:\n\n`;
        if (temperature >= 10 && temperature <= 25) {
          recommendation += `- Planting Time: Ideal during cool to mild temperatures. Plant in early spring or late summer.\n`;
        } else if (temperature > 25) {
          recommendation += `- Temperature: High temperatures (${temperature}°C) can cause roots to become tough. Mulch to retain soil moisture.\n`;
        } else {
          recommendation += `- Temperature: Low temperatures (${temperature}°C) are manageable. Carrots can tolerate light frost.\n`;
        }

        if (humidity >= 50) {
          recommendation += `- Humidity: Good humidity (${humidity}%) helps in root development. Ensure consistent watering.\n`;
        } else {
          recommendation += `- Humidity: Low humidity (${humidity}%). Use mulches to maintain soil moisture.\n`;
        }

        break;

      case "onions":
        recommendation += ` Onion Recommendations:\n\n`;
        if (temperature >= 13 && temperature <= 24) {
          recommendation += `- Planting Time: Suitable for cool to warm temperatures. Plant in early spring.\n`;
        } else if (temperature > 24) {
          recommendation += `- Temperature: High temperatures (${temperature}°C) detected. Ensure regular watering to support bulb formation.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) is on the lower side. Onions can tolerate light frost.\n`;
        }

        if (humidity >= 50) {
          recommendation += `- Humidity: Adequate humidity (${humidity}%) supports healthy growth. Prevent fungal issues by ensuring good air circulation.\n`;
        } else {
          recommendation += `- Humidity: Low humidity (${humidity}%). Mulch to retain soil moisture.\n`;
        }

        break;

      case "potatoes":
        recommendation += `Potato Recommendations:\n\n`;
        if (temperature >= 15 && temperature <= 24) {
          recommendation += `- Planting Time: Best grown in cool to mild temperatures. Plant in early spring.\n`;
        } else if (temperature > 24) {
          recommendation += `- Temperature: High temperatures (${temperature}°C) can cause heat stress. Provide shade and ensure consistent watering.\n`;
        } else {
          recommendation += `- Temperature: Low temperatures (${temperature}°C) are manageable. Protect from heavy frost.\n`;
        }

        if (rain >= 10) {
          recommendation += `- Rainfall: Adequate rainfall (${rain} mm). Ensure well-drained soil to prevent tuber rot.\n`;
        } else {
          recommendation += `- Rainfall: Low rainfall (${rain} mm). Implement irrigation to maintain soil moisture.\n`;
        }

        break;

      case "cassava":
        recommendation += `Cassava Recommendations:\n\n`;
        if (temperature >= 24 && temperature <= 30) {
          recommendation += `- Planting Time: Thrives in warm to hot temperatures. Plant during the rainy season for optimal growth.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) may not be ideal. Cassava requires consistently warm temperatures.\n`;
        }

        if (rain >= 100) {
          recommendation += `- Rainfall: Adequate rainfall (${rain} mm) supports growth. Ensure good drainage to prevent root diseases.\n`;
        } else if (rain >= 50) {
          recommendation += `- Rainfall: Moderate rainfall (${rain} mm). Cassava is drought-tolerant but benefits from regular watering during initial growth.\n`;
        } else {
          recommendation += `- Rainfall: Low rainfall (${rain} mm). Implement irrigation strategies to support growth.\n`;
        }

        break;

      case "tomatoes":
        recommendation += ` Tomato Recommendations:\n\n`;
        if (temperature >= 18 && temperature <= 27) {
          recommendation += `- Planting Time: Ideal in warm weather after the last frost. Ensure soil is well-drained and rich in organic matter.\n`;
        } else if (temperature > 27) {
          recommendation += `- Temperature: High temperatures (${temperature}°C) can cause fruit scorching. Provide shade and mulch to retain soil moisture.\n`;
        } else {
          recommendation += `- Temperature: Current temperature (${temperature}°C) is on the cooler side. Tomatoes are sensitive to frost and require warm soil.\n`;
        }

        if (humidity >= 50) {
          recommendation += `- Humidity: Adequate humidity (${humidity}%) supports healthy growth. Ensure good air circulation to prevent fungal diseases.\n`;
        } else {
          recommendation += `- Humidity: Low humidity (${humidity}%). Use mulches to maintain soil moisture and prevent blossom end rot.\n`;
        }

        break;

      default:
        recommendation = "No recommendations available for the selected crop.";
    }

    // General Tips
    recommendation += `\n General Tips:\n`;
    recommendation += `- Soil Preparation: Ensure the soil is well-drained and rich in organic matter for optimal growth.\n`;
    recommendation += `- Watering: Adjust watering based on current weather conditions—more frequent in hot, dry weather, and less in cool, wet conditions.\n`;
    recommendation += `- Frost Protection: Use row covers or mulch to protect sensitive crops from unexpected frosts.\n`;
    recommendation += `- Crop Rotation: Rotate crops each season to prevent soil depletion and reduce the risk of pests and diseases.\n`;

    return recommendation;
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
              value={`${farmLocation.lat ? farmLocation.lat.toFixed(4) : ""}, ${
                farmLocation.lon ? farmLocation.lon.toFixed(4) : ""
              } (${farmLocation.city}, ${farmLocation.country})`}
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
                  Temperature: weatherConditions.temperature
                    ? `${weatherConditions.temperature} °C`
                    : "",
                  Wind: weatherConditions.wind
                    ? `${weatherConditions.wind} m/s`
                    : "",
                  Rain: weatherConditions.rain
                    ? `${weatherConditions.rain} mm`
                    : "",
                  Pressure: weatherConditions.pressure
                    ? `${weatherConditions.pressure} hPa`
                    : "",
                  Humidity: weatherConditions.humidity
                    ? `${weatherConditions.humidity} %`
                    : "",
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
              <option value="butternut">Butternut Squash</option>
              <option value="squash">Summer Squash</option>
              <option value="corn">Corn</option>
              <option value="carrots">Carrots</option>
              <option value="onions">Onions</option>
              <option value="potatoes">Potatoes</option>
              <option value="cassava">Cassava</option>
              <option value="tomatoes">Tomatoes</option>
              {/* You can add more crops here */}
            </select>
          </div>

          <button type="submit" className="geospatial-submit-btn">
            Get Recommendations
          </button>
        </form>

        <h2>Recommendations:</h2>
        <pre className="geospatial-recommendations">{recommendations}</pre>
      </div>
      <div className="geospatial-map-container" ref={mapRef}></div>
    </div>
  );
}

export default GeospatialData;
