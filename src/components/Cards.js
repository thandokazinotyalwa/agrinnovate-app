import React from 'react';
import './Cards.css';

function App() {
  const cards = [
    {
      image: 'https://media.licdn.com/dms/image/D4D12AQH316SYOwGhlA/article-inline_image-shrink_1000_1488/0/1709646539097?e=1726099200&v=beta&t=TlIGNRyO5t56-jyyzZR4E3piKhc7w7Z4Rlw4ntcIg1k',
      // title: 'Card 1',
      info: 'We offer hands-on education and training in sustainable farming and modern agricultural techniques. Our goal is to empower underserved communities with the knowledge and skills to improve their livelihoods and promote food security.',
      summary: 'Agricultural Education'
    },
    {
      image: 'https://sarep.ucdavis.edu/sites/g/files/dgvnsk9171/files/styles/sf_large_width/public/media/images/AdobeStock_147024160.jpeg?itok=W0K4tNi1',
      // title: 'Card 2',
      info: 'We offer training in business planning, financial management, and marketing to help individuals start and grow their own ventures, boosting economic opportunities and community resilience.',
      summary: 'Entrepreneurial & Business skills'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCJwatM_uYsU-BZUQyzcfPBiLUq4G_Jh1cA&s',
      // title: 'Card 3',
      info: 'We facilitate connections between local communities and agricultural experts, providing access to valuable knowledge and resources. This collaboration enhances local farming practices and fosters a supportive network for growth and innovation.',
      summary: 'Community & Expert connection'
    },
    {
      image: 'https://www-idc-co-za.b-cdn.net/wp-content/uploads/2021/06/AgrI-industrial-square-V3-1.jpg',
      // title: 'Card 4',
      info: 'We provide access to essential resources and funding opportunities to support agricultural projects. Our goal is to help individuals and communities secure the financial and material support they need to achieve their agricultural goals and drive sustainable development..',
      summary: 'Resource Access & Funding'
    },
  ];

  return (
    <div className="App">
      <h1 className="heading">What we offer</h1>
      <div className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-summary">
              <h2>{card.summary}</h2>
            </div>
            <div className="card-info">
              <h2>{card.title}</h2>
              <p>{card.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
