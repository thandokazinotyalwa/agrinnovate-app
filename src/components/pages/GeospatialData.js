// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './GeospatialData.css';

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

//         // Fetch weather data
//         const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${latitude},${longitude}`);
//         setWeather(weatherResponse.data);

//         // Fetch tailored recommendations
//         const recommendationsResponse = await axios.get(`https://api.yourapi.com/recommendations?lat=${latitude}&lon=${longitude}`);
//         setRecommendations(recommendationsResponse.data);
//       },
//       (error) => console.error(error),
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
//             <p>Temperature: {weather.current.temp_c}°C</p>
//             <p>Condition: {weather.current.condition.text}</p>
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
