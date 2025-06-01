import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Tombol Menu */}
      <button className="text-[18px] font-bold text-[#00509D] bg-transparent border-none cursor-pointer">
        Menu
      </button>

      {/* Dropdown Menu dengan Routing */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-56"
        style={{borderRadius: "7px", background: "white", transform: "translateX(-100px)", width: "168px"}}>
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to="/input" style={{color: "#00509D"}}>Tell your story</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to="/graph" style={{color: "#00509D"}}>Mood Tracker</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <Link to="/history" style={{color: "#00509D"}}>History</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
