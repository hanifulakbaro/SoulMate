import React, { useState } from 'react';

const Filter = ({ onChange }) => {
  // customRange state tidak lagi diperlukan jika opsi "custom" dihapus,
  // tetapi saya akan menyimpannya jika nanti Anda ingin menambah fitur lain.
  // const [customRange, setCustomRange] = useState(false); 

  const handleFilterChange = (e) => {
    const value = e.target.value;
    // setCustomRange(value === "custom"); // Baris ini tidak lagi relevan
    onChange({ type: value }); // Kirim nilai filter ke parent component
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
        {/* Opsi "Custom Range" dihapus */}
      </select>

      {/* Bagian input tanggal untuk customRange dihapus */}
      {/* {customRange && (
        <div className="mt-3 flex gap-3" style={{ marginLeft: "176px", marginTop: "-25px", marginBottom: "20px" }}>
          <input type="date" style={{ fontFamily: "Nunito", marginRight: "5px", border: "1px", borderRadius: "5px" }} />
          <input type="date" style={{ fontFamily: "Nunito", border: "1px", borderRadius: "5px" }} />
        </div>
      )} */}
    </section>
  );
};

export default Filter;