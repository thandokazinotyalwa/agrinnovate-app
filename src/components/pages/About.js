import React from 'react';
import "../../App.css";
import './About.css';

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <div className="about-us__container">
        <div className="about-us__image">
          <img src="/images/img4.jpeg" alt="About Us" />
        </div>
        <div className="about-us__content">
          
          <p>
          Welcome to AgriInnovate, where we are dedicated to empowering underserved communities through agricultural education and entrepreneurial training. Our mission is to combat poverty and food insecurity by equipping individuals with the knowledge and skills they need to cultivate their own food and establish profitable agricultural businesses. We offer a comprehensive platform that provides practical farming advice, modern techniques, and business management training. Our interactive tools, including real-time chat with experts and access to funding resources, foster a supportive community aimed at sustainable development and economic upliftment. At AgriInnovate, we believe in the power of innovation and community to create lasting change and nurture prosperity for all.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;