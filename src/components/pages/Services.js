import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Services.css";

// Define custom icons using Font Awesome
const createIcon = (iconClass, color) =>
  new L.DivIcon({
    className: "custom-icon",
    html: `<div style="color: ${color}; font-size: 24px;"><i class="${iconClass}"></i></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const Services = () => {
  const [filter, setFilter] = useState("all");

  // Sample data of agriculture opportunities and events
  const opportunities = [
    {
      id: 1,
      lat: -33.9249,
      lng: 18.4241,
      title: "Farm Opportunity",
      type: "agriculture",
      city: "Cape Town",
      summary:
        "A great opportunity to work on a local farm and learn new skills.",
    },
    {
      id: 2,
      lat: -29.8587,
      lng: 31.0218,
      title: "Training Event",
      type: "event",
      city: "Durban",
      summary:
        "Join us for a comprehensive training session on sustainable farming practices.",
    },
    {
      id: 3,
      lat: -26.2041,
      lng: 28.0473,
      title: "Agriculture Fair",
      type: "agriculture",
      city: "Johannesburg",
      summary: "Explore the latest trends in agriculture at this year's fair.",
    },
    {
      id: 4,
      lat: -25.746,
      lng: 28.188,
      title: "Workshop on Sustainable Farming",
      type: "event",
      city: "Pretoria",
      summary:
        "Participate in a hands-on workshop focused on sustainable farming techniques.",
    },
    // Add more opportunities as needed
  ];

  // Filter opportunities based on the selected city
  const filteredOpportunities =
    filter === "all"
      ? opportunities
      : opportunities.filter((opportunity) => opportunity.city === filter);

  return (
    <div className="main-content">
      <div className="map-container">
        <div className="left-column">
          <h2>Agriculture Opportunities in South Africa</h2>
          <p>
            Explore agriculture opportunities and upcoming events. Use the
            buttons to filter by city.
          </p>
          <div className="filter-buttons">
            <button
              className="btn btn-primary"
              onClick={() => setFilter("all")}
            >
              All Cities
            </button>
            <button
              className="btn btn-success"
              onClick={() => setFilter("Cape Town")}
            >
              Cape Town
            </button>
            <button
              className="btn btn-warning"
              onClick={() => setFilter("Durban")}
            >
              Durban
            </button>
            <button
              className="btn btn-info"
              onClick={() => setFilter("Johannesburg")}
            >
              Johannesburg
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setFilter("Pretoria")}
            >
              Pretoria
            </button>
          </div>
          <MapContainer
            center={[-28.4793, 24.6727]}
            zoom={5}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            {filteredOpportunities.map((opportunity) => (
              <Marker
                key={opportunity.id}
                position={[opportunity.lat, opportunity.lng]}
                icon={createIcon(
                  opportunity.type === "event"
                    ? "fas fa-calendar-alt"
                    : "fas fa-seedling",
                  opportunity.type === "event" ? "#007bff" : "#28a745" // Event icon: blue, Agriculture icon: green
                )}
              >
                <Popup>
                  <b>{opportunity.title}</b>
                  <br />
                  <span>{opportunity.city}</span>

                  <br />
                  <p>{opportunity.summary}</p>
                  <Link to={`/job/${opportunity.id}`} className="btn btn-info">
                    View Opportunity
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="right-column">
          <h2>Upcoming Events</h2>
          <ul>
            {filteredOpportunities.map((opportunity) => (
              <li key={opportunity.id}>
                <b>{opportunity.title}</b>
                <b> - {opportunity.city}</b>
                <p>{opportunity.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
