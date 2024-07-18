import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Harvest horizon newsletter to receive our best course deals
        </p>
        <p className="footer-subscription-text">
          You can Unsubscribe at any time
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/how-it-works" className="footer-link">
              How it works
            </Link>
            <Link to="/testimonials" className="footer-link">
              Testimonials
            </Link>
            <Link to="/careers" className="footer-link">
              Careers
            </Link>
            <Link to="/investors" className="footer-link">
              Investors
            </Link>
            <Link to="/terms-of-services" className="footer-link">
              Terms of Services
            </Link>
          </div>

          {/* Repeat the structure for other sections if needed */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
