import React from "react";

function FilterDropdowns({
  selectedLocation,
  setSelectedLocation,
  selectedPrice,
  setSelectedPrice,
  selectedCategory,
  setSelectedCategory,
  locations,
  categories,
}) {
  return (
    <div className="inline-dropdown-group">
      <div className="form-group inline-dropdown dropdown-group">
        <label>Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group inline-dropdown dropdown-group">
        <label>Price</label>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="<20">Less than 20</option>
          <option value="20-50">20-50</option>
          <option value="50-100">51-100</option>
          <option value=">100">More than 100</option>
        </select>
      </div>
      <div className="form-group inline-dropdown dropdown-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterDropdowns;
