import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>What we offer</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="/images/img-8.jpg"
              text="Explore the hidden waterfall deep inside the amazon jungle "
              label="Adventure"
              path="/opportunities"
            />
            <CardItem
              src="/images/img3.jpeg"
              text="Explore the hidden waterfall deep inside the amazon jungle "
              label="Adventure"
              path="/opportunities"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="/images/img-8.jpg"
              text="Explore the hidden waterfall deep inside the amazon jungle "
              label="Adventure"
              path="/opportunities"
            />
            <CardItem
              src="/images/img3.jpeg"
              text="Explore the hidden waterfall deep inside the amazon jungle "
              label="Adventure"
              path="/opportunities"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
