import React from 'react';
import './Cards.css';

function App() {
  const cards = [
    {
      image: 'https://media.licdn.com/dms/image/D4D12AQH316SYOwGhlA/article-inline_image-shrink_1000_1488/0/1709646539097?e=1726099200&v=beta&t=TlIGNRyO5t56-jyyzZR4E3piKhc7w7Z4Rlw4ntcIg1k',
      info: 'We offer hands-on education and training in sustainable farming and modern agricultural techniques, as well as training in business planning, financial management, and marketing. Our goal is to empower underserved communities with the knowledge and skills to improve their livelihoods, promote food security, and boost economic opportunities and community resilience.',
      summary: 'Agricultural Education, Training & Business Skills'
    },
    {
      image: "/images/img8.png",
      info: 'We offer advanced tools and analytics to support agricultural decision-making. Our systems help farmers optimize their operations, improve crop yields, and make informed decisions based on real-time data.',
      summary: 'Agricultural Decision Support System'
    },
    {
      image: "/images/img1.jpg",
      info: 'We facilitate connections between local communities and agricultural experts, providing access to valuable knowledge and resources. This collaboration enhances local farming practices and fosters a supportive network for growth and innovation.',
      summary: 'Community & Expert connection'
    },
    {
      image: 'https://www-idc-co-za.b-cdn.net/wp-content/uploads/2021/06/AgrI-industrial-square-V3-1.jpg',
      info: 'We provide access to essential resources and funding opportunities to support agricultural projects. Our goal is to help individuals and communities secure the financial and material support they need to achieve their agricultural goals and drive sustainable development.',
      summary: 'Resource Access & Funding'
    },

  ];

  return (
    <div className="App">
      <h1 className="heading">What we offer</h1>
      <div className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.summary} className="card-image" />
            <div className="card-summary">
              <h2>{card.summary}</h2>
            </div>
            <div className="card-info">
              <p>{card.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
