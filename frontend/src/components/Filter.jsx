import React, { useState } from 'react';

const Filter = ({ onChange }) => {
  const [customRange, setCustomRange] = useState(false);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setCustomRange(value === "custom");
    onChange({ type: value });
  };

  return (
    <section className="self-start px-3 pt-1 pb-3.5 mt-20 ml-4 text-xl text-neutral-400 max-md:mt-10 max-md:max-w-full">
      <label htmlFor="filter" className="mr-2" style={{ marginLeft: "100px" }}>
        Filter by:
      </label>

      <select 
        id="filter" 
        style={{ fontFamily: 'Nunito', marginBottom: "30px", marginLeft: "10px", borderRadius: "5px", border: "1px" }}
        onChange={handleFilterChange}
      >
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="custom">Custom Range</option>
      </select>

      {customRange && (
        <div className="mt-3 flex gap-3" style={{ marginLeft: "176px", marginTop: "-25px", marginBottom: "20px" }}>
          <input type="date" style={{ fontFamily: "Nunito", marginRight: "5px", border: "1px", borderRadius: "5px" }} />
          <input type="date" style={{ fontFamily: "Nunito", border: "1px", borderRadius: "5px" }} />
        </div>
      )}
    </section>
  );
};

export default Filter;