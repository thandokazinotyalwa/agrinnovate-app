import React from "react";
import "./styles.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <input type="text" placeholder="Search..." className="search-bar" />
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#recent">Recent Posts</a>
        <a href="#popular">Popular Threads</a>
      </div>
    </div>
  );
};

export default Navigation;
