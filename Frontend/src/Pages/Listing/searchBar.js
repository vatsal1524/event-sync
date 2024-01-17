import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ searchInput, setSearchInput, handleSearchClick }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="search-button" onClick={handleSearchClick}>
        <FiSearch className="search-icon" />
      </button>
    </div>
  );
}

export default SearchBar;
