"use client";
import * as React from "react";
import { Link } from "react-router-dom";

export function NavigationMenu() {
  return (
    <nav className="flex gap-6 max-sm:hidden">
      {/* <Link
        to="/"
        className="text-xl font-bold text-[#00509D] cursor-pointer"
        style={{ marginRight: "35px", fontWeight: "1000", fontSize: "18px" }}
      >
        Menu
      </Link> */}
      <Link
        to="/login"
        className="text-xl font-bold text-[#00509D] cursor-pointer"
        style={{ marginRight: "35px", fontWeight: "1000", fontSize: "18px" }}
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="text-xl font-bold text-[#00509D] cursor-pointer"
        style={{ marginRight: "20px", fontWeight: "1000", fontSize: "18px" }}
      >
        Sign Up
      </Link>
    </nav>
  );
}
