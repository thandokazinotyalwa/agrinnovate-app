import React from 'react';
import './Cards.css';

function App() {
  const cards = [
    {
      image: 'https://via.placeholder.com/300',
      title: 'Card 1',
      info: 'More information about Card 1.',
      summary: 'Summary of Card 1'
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Card 2',
      info: 'More information about Card 2.',
      summary: 'Summary of Card 2'
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Card 3',
      info: 'More information about Card 3.',
      summary: 'Summary of Card 3'
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Card 4',
      info: 'More information about Card 4.',
      summary: 'Summary of Card 4'
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
