import React from "react";

function SortBySelect({ sortBy, handleSortByChange }) {
  return (
    <div className="form-group sort-by-group">
      <label>Sort By</label>
      <select value={sortBy} onChange={handleSortByChange}>
        <option>Ticket Price</option>
        <option>Time</option>
      </select>
    </div>
  );
}

export default SortBySelect;
