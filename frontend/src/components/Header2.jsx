import React from "react";
import Menu from "./Menu"; // Impor komponen Menu

export function Header2() {
  return (
    <header className="flex justify-between items-center w-full text-xl font-bold text-sky-700 whitespace-nowrap max-md:max-w-full">
      <img
        src="logo.png"
        alt="Logo"
        className="object-contain shrink-0 max-w-full aspect-[1.03] w-[126px]"
        style={{ marginLeft: "15px", marginTop: "-15px" }}
      />
      
      {/* Navigasi dengan Menu Dropdown */}
      <nav className="relative my-auto">
        <Menu />
      </nav>
    </header>
  );
}
