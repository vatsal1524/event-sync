import React from "react";
import { FiFilter } from "react-icons/fi";

function FilterButton({ handleFilterClick }) {
  return (
    <div className="filter-button-container">
      <button className="filter-button" onClick={handleFilterClick}>
        <FiFilter className="filter-icon" /> Filter
      </button>
    </div>
  );
}

export default FilterButton;
