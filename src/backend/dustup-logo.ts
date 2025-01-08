import React, { useState } from 'react';

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
            isHovered ? 'drop-shadow-lg filter' : ''
          }`}
        >
          {/* Ground symbol lines that double as facial features */}
          <g className={`transition-all duration-300 ${
            isHovered ? 'stroke-blue-400' : 'stroke-white'
          }`}>
            <path 
              d="M6 8h12" 
              strokeWidth="2.5"
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                isHovered ? 'stroke-yellow-400' : ''
              }`}
            />
            <path 
              d="M6 12h12" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                isHovered ? 'stroke-cyan-400' : ''
              }`}
            />
            <path 
              d="M6 16h12" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                isHovered ? 'stroke-green-400' : ''
              }`}
            />
          </g>

          {/* Angular "eyes" that suggest voltage symbols */}
          <g className={`transition-all duration-300 ${
            isHovered ? 'stroke-red-400' : 'stroke-white'
          }`}>
            <path 
              d="M8 6l-2 2M16 6l2 2" 
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Determined "mouth" that's also a voltage arrow */}
          <path 
            d="M9 18l3-2l3 2" 
            className={`transition-all duration-300 ${
              isHovered ? 'stroke-purple-400' : 'stroke-white'
            }`}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Subtle background glow effect */}
          <circle
            cx="12"
            cy="12"
            r="10"
            className={`transition-all duration-500 ${
              isHovered 
                ? 'stroke-blue-500/30 stroke-2' 
                : 'stroke-transparent'
            }`}
            fill="none"
          />
        </svg>

        {/* Company name */}
        <div className={`
          absolute -bottom-8 left-0 right-0 text-center 
          font-bold text-lg transition-all duration-300
          ${isHovered ? 'text-blue-400' : 'text-white'}
        `}>
          DUSTUP LTD™
        </div>
      </div>
    </div>
  );
};

export default DustupLogo;