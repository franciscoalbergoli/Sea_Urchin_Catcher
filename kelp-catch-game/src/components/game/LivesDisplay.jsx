import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LivesDisplay({ lives }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20 dark:border-slate-700/50">
      <span className="text-white/80 dark:text-white/90 text-xs font-medium mr-1">LIVES</span>
      <div className="flex gap-1">
        <AnimatePresence>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: i < lives ? 1 : 0.5,
                opacity: i < lives ? 1 : 0.3
              }}
              exit={{ 
                scale: 0,
                rotate: 180,
                transition: { duration: 0.3 }
              }}
              className="relative"
            >
              {/* Red Handfish SVG */}
              <svg 
                viewBox="0 0 50 40" 
                className={`w-10 h-8 ${i >= lives ? 'grayscale' : ''}`}
              >
                {/* Body */}
                <ellipse
                  cx="25"
                  cy="22"
                  rx="15"
                  ry="12"
                  fill={i < lives ? "url(#handfishRed)" : "#666"}
                />
                
                {/* Spots */}
                {i < lives && (
                  <>
                    <circle cx="20" cy="20" r="2" fill="#ff6b6b" opacity="0.7" />
                    <circle cx="28" cy="18" r="1.5" fill="#ff6b6b" opacity="0.7" />
                    <circle cx="32" cy="24" r="2" fill="#ff6b6b" opacity="0.7" />
                  </>
                )}
                
                {/* Dorsal fin */}
                <path
                  d="M18 12 Q25 2 32 12"
                  fill={i < lives ? "#dc2626" : "#555"}
                  stroke={i < lives ? "#b91c1c" : "#444"}
                  strokeWidth="1"
                />
                
                {/* Tail */}
                <path
                  d="M40 22 Q50 15 48 22 Q50 29 40 22"
                  fill={i < lives ? "#dc2626" : "#555"}
                />
                
                {/* "Hand" fins */}
                <motion.path
                  d="M12 26 Q5 30 8 35 Q12 32 15 28"
                  fill={i < lives ? "#ef4444" : "#555"}
                  animate={i < lives ? { rotate: [-10, 10, -10] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ transformOrigin: '15px 26px' }}
                />
                <motion.path
                  d="M20 30 Q18 38 22 36 Q24 32 22 28"
                  fill={i < lives ? "#ef4444" : "#555"}
                  animate={i < lives ? { rotate: [5, -5, 5] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ transformOrigin: '20px 28px' }}
                />
                
                {/* Eye */}
                <circle cx="14" cy="18" r="4" fill="white" />
                <circle cx="14" cy="18" r="2" fill="#1e1b4b" />
                <circle cx="13" cy="17" r="1" fill="white" />
                
                {/* Mouth */}
                <path
                  d="M8 22 Q10 24 8 26"
                  fill="none"
                  stroke={i < lives ? "#991b1b" : "#333"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                
                <defs>
                  <linearGradient id="handfishRed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}