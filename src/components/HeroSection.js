import React from 'react';
import { Carousel } from 'react-bootstrap'; // Import Carousel component from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './HeroSection.css'; // Import your custom CSS

function HeroSection() {
  return (
    <div className="hero-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/img1.jpg" 
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h1>Agrinnovate</h1>
            <p>Cultivating modern solutions for a sustainable future</p>
            <div className="hero-btns">
              <button className="btn btn-outline-light">Our services</button>
              <button className="btn btn-primary">Get started</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/img6.jpg" 
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h1>AgriCademy</h1>
            <p>Empowering you with agricultural knowledge</p>
            <div className="hero-btns">
              <button className="btn btn-primary">Learn more</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/images/img5.jpeg" 
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h1>Opportunities</h1>
            <p>Unlocking potential for growth and success</p>
            <div className="hero-btns">
              <button className="btn btn-primary">Learn more</button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroSection;
