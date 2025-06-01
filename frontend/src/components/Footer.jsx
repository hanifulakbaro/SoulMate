import React from "react";

export function Footer() {
  return (
    <footer className="w-full p-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} SoulMate. All rights reserved.
    </footer>
  );
}
