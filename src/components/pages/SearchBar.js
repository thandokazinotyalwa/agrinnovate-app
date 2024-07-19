import React from "react";
import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a course..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
