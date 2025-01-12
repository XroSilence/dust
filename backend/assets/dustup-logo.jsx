import React, { useState } from "react";

/** @type {import('react').FC} */
const DustupLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-8 bg-slate-900 rounded-lg">
      <div
        className="relative w-64 h-64 transition-transform duration-300 transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-full h-full transition-all duration-500 ${
            isHovered ? "drop-shadow-lg filter" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Example SVG Content - Replace with your actual SVG paths */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M8 12l4 4 4-4"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className={`
            absolute -bottom-8 left-0 right-0 text-center 
            font-bold text-lg transition-all duration-300
            ${isHovered ? "text-blue-400" : "text-white"}
          `}
        >
          DUSTUP LTD™
        </div>
      </div>
    </div>
  );
};

export default DustupLogo;
