import React from 'react';
import './Footer.css'; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h4>Contact Us</h4>
          <p>123 AgriInnovate Lane, Cape Town, South Africa</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@agriinnovate.com</p>
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="social-media">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.facebook.com/agriinnovate" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com/agriinnovate" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com/company/agriinnovate" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/agriinnovate" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com/agriinnovate" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="legal-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/disclaimer">Disclaimer</a>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AgriInnovate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
