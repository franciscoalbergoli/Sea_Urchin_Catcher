import React from 'react';
import { motion } from 'framer-motion';

export default function SeaUrchin({ urchin }) {
  const spineCount = 16;
  
  return (
    <motion.div
      className="absolute w-12 h-12"
      style={{
        left: `${urchin.x}%`,
        top: `${urchin.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        rotate: urchin.rotation 
      }}
      exit={{ 
        scale: 1.5, 
        opacity: 0,
        transition: { duration: 0.2 }
      }}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-lg">
        {/* Spines */}
        {[...Array(spineCount)].map((_, i) => {
          const angle = (i * 360) / spineCount;
          const radians = (angle * Math.PI) / 180;
          const x1 = 30 + Math.cos(radians) * 12;
          const y1 = 30 + Math.sin(radians) * 12;
          const x2 = 30 + Math.cos(radians) * 28;
          const y2 = 30 + Math.sin(radians) * 28;
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1e1b4b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
        
        {/* Body */}
        <circle
          cx="30"
          cy="30"
          r="12"
          fill="url(#urchinGradient)"
          stroke="#312e81"
          strokeWidth="1"
        />
        
        {/* Texture dots */}
        <circle cx="26" cy="27" r="2" fill="#4c1d95" opacity="0.6" />
        <circle cx="34" cy="27" r="2" fill="#4c1d95" opacity="0.6" />
        <circle cx="30" cy="34" r="2" fill="#4c1d95" opacity="0.6" />
        
        <defs>
          <radialGradient id="urchinGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#5b21b6" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}