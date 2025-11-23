import React from 'react';
import './HeartIcon.css';

export default function HeartIcon({ filled }) {
  return (
    <svg
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'translateY(-1px)' }}
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          fill={filled ? 'currentColor' : 'none'}
          stroke={filled ? 'none' : 'currentColor'}
          transform="translate(3 3) scale(0.75)"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
        />

        <path d="M12 2V0" />
        <path d="M12 24V22" />
        <path d="M24 12H22" />
        <path d="M2 12H0" />
        <path d="M19.07 4.93L20.5 3.5" />
        <path d="M4.93 19.07L3.5 20.5" />
        <path d="M19.07 19.07L20.5 20.5" />
        <path d="M4.93 4.93L3.5 3.5" />
      </g>
    </svg>
  );
}