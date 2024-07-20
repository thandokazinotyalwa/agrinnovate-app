import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);

    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="/images/Logo.jpg" alt="Logo" className="logo-image" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fa-solid fa-bars"}></i>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/learn" className="nav-links" onClick={closeMobileMenu}>
              Learn
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-links" onClick={closeMobileMenu}>
              ChatRoom
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/opportunities"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Opportunities
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/funding"
                  className="dropdown-links"
                  onClick={closeMobileMenu}
                >
                  Funding
                </Link>
              </li>
              <li>
                <Link
                  to="/job"
                  className="dropdown-links"
                  onClick={closeMobileMenu}
                >
                  Job
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link
              to="/agri-assist"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Agri-Assist
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signup"
              className="nav-links btn--outline"
              onClick={closeMobileMenu}
            >
              SIGN UP
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
