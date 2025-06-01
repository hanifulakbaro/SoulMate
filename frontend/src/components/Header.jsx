import * as React from "react";
import { NavigationMenu } from "./NavigationMenu.jsx";

export function Header() {
  return (
    <header 
        className="w-full flex justify-between items-center px-10 py-6"
        style={{marginTop: "-20px"}}
        >
      <img
        src="/public/logo.png"
        alt="SoulMate Logo"
        className="h-14 w-14 object-contain"
        style={{ height: "120px", width: "120px", objectFit: "contain", marginLeft: "20px"}}
      />
      <NavigationMenu />
    </header>
  );
};
