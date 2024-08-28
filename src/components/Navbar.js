import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleDropdown = () => setDropdown(!dropdown);
  const closeDropdownMenu = () => {
    setDropdown(false);
    closeMobileMenu();
  };

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
          <li
            className="nav-item"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            onClick={toggleDropdown}
          >
            <Link to="/opportunities" className="nav-links">
              Opportunities <i className="fas fa-caret-down"></i>
            </Link>
            {dropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/funding"
                    className="dropdown-links"
                    onClick={closeDropdownMenu}
                  >
                    Funding
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <Link
              to="/geospatial-data"
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
              to="/sign-up"
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
