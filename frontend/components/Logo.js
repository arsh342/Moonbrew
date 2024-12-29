import React from 'react';

export default function Logo({ className = "h-10 w-10" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coffee Cup Base */}
      <path
        d="M20 70 Q20 80 30 85 L70 85 Q80 80 80 70 L80 40 L20 40 Z"
        fill="#047857"
        stroke="#065f46"
        strokeWidth="2"
      />
      
      {/* Cup Handle */}
      <path
        d="M80 50 Q90 50 90 60 Q90 70 80 70"
        fill="none"
        stroke="#065f46"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Steam Lines */}
      <g stroke="#065f46" strokeWidth="2" strokeLinecap="round">
        <path d="M40 20 Q45 15 40 10" className="animate-steam-1"/>
        <path d="M50 25 Q55 20 50 15" className="animate-steam-2"/>
        <path d="M60 20 Q65 15 60 10" className="animate-steam-3"/>
      </g>
      
      {/* Moon Shape */}
      <path
        d="M35 50 Q45 60 35 70 Q25 60 35 50"
        fill="#fbbf24"
      />
      
      {/* Company Name */}
      <text
        x="50"
        y="65"
        textAnchor="middle"
        className="text-sm font-bold"
        fill="#ffffff"
      >
        MB
      </text>
    </svg>
  );
} 