import React from 'react';
import { motion } from 'framer-motion';

export default function KelpIndicator({ score }) {
  const maxHeight = 200;
  const minHeight = 30;
  const kelpHeight = Math.min(maxHeight, minHeight + score * 3);
  const frondCount = Math.min(12, Math.floor(score / 3) + 2);
  
  return (
    <div className="flex flex-col items-center bg-white/10 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-slate-700/50">
      <span className="text-white/80 dark:text-white/90 text-xs font-medium mb-1">KELP</span>
      <div className="relative w-24 flex justify-center" style={{ height: maxHeight + 30 }}>
        {/* Score number */}
        <motion.span 
          key={score}
          initial={{ scale: 1.5, color: '#fef08a' }}
          animate={{ scale: 1, color: '#ffffff' }}
          className="absolute -top-2 text-3xl font-bold text-white z-10 drop-shadow-lg"
        >
          {score}
        </motion.span>
        
        {/* Giant kelp structure */}
        <div className="absolute bottom-0 flex justify-center items-end">
          {/* Main stipe (stem) - thicker at bottom */}
          <motion.div
            className="relative"
            style={{ 
              width: 0,
              height: kelpHeight,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderImage: 'linear-gradient(to top, #166534, #15803d, #22c55e) 1',
              borderImageSlice: 1,
            }}
            animate={{ 
              height: kelpHeight,
            }}
            transition={{ 
              height: { type: "spring", stiffness: 100 },
            }}
          >
            {/* Main central stipe */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-gradient-to-t from-green-800 via-green-700 to-green-600 rounded-t-full"
              style={{ width: 8, height: kelpHeight }}
            >
              {/* Stipe texture ridges */}
              {[...Array(Math.floor(kelpHeight / 15))].map((_, i) => (
                <div
                  key={`ridge-${i}`}
                  className="absolute left-0 right-0 h-px bg-green-900/40"
                  style={{ bottom: `${i * 15}px` }}
                />
              ))}
            </div>

            {/* Giant kelp fronds (blades) - more leaves */}
            {[...Array(frondCount)].map((_, i) => {
              const isLeft = i % 2 === 0;
              const yPos = (i + 1) * (kelpHeight / (frondCount + 1));
              const frondLength = 30 + (i % 3) * 10;
              const frondWidth = 12 + (i % 2) * 4;
              
              return (
                <div key={i}>
                  {/* Pneumatocyst (gas bladder) at base of frond */}
                  <motion.div
                    className="absolute z-10"
                    style={{
                      bottom: yPos,
                      [isLeft ? 'right' : 'left']: '4px',
                      width: 8,
                      height: 8,
                      background: 'radial-gradient(circle, #84cc16, #65a30d)',
                      borderRadius: '50%',
                      border: '1px solid #4d7c0f',
                    }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2 + (i % 3) * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                  
                  {/* Frond blade - elongated and wavy like real giant kelp */}
                  <motion.div
                    className="absolute"
                    style={{
                      bottom: yPos,
                      [isLeft ? 'right' : 'left']: '8px',
                      width: frondWidth,
                      height: frondLength,
                      transformOrigin: isLeft ? 'right center' : 'left center',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ 
                      scaleY: 1,
                    }}
                    transition={{
                      scaleY: { delay: i * 0.15, type: "spring" },
                    }}
                  >
                    <svg 
                      viewBox="0 0 30 100" 
                      className="w-full h-full"
                      style={{
                        transformOrigin: isLeft ? 'right center' : 'left center',
                      }}
                    >
                      <motion.path
                        d={isLeft 
                          ? "M28 0 Q20 15 22 30 Q18 45 20 60 Q16 75 18 85 Q15 95 10 100 L15 100 Q25 90 24 75 Q28 60 26 45 Q30 30 28 15 Q32 5 28 0"
                          : "M2 0 Q10 15 8 30 Q12 45 10 60 Q14 75 12 85 Q15 95 20 100 L15 100 Q5 90 6 75 Q2 60 4 45 Q0 30 2 15 Q-2 5 2 0"
                        }
                        fill="url(#kelpGradient)"
                        stroke="#15803d"
                        strokeWidth="0.5"
                      />
                      {/* Midrib (central vein) */}
                      <motion.path
                        d={isLeft
                          ? "M28 0 Q22 25 20 50 Q18 75 10 100"
                          : "M2 0 Q8 25 10 50 Q12 75 20 100"
                        }
                        fill="none"
                        stroke="#166534"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      {/* Secondary smaller leaves */}
                      {[...Array(3)].map((_, leafIdx) => (
                        <motion.path
                          key={leafIdx}
                          d={isLeft
                            ? `M${26 - leafIdx * 2} ${15 + leafIdx * 25} Q${20 - leafIdx} ${20 + leafIdx * 25} ${18 - leafIdx} ${28 + leafIdx * 25}`
                            : `M${4 + leafIdx * 2} ${15 + leafIdx * 25} Q${10 + leafIdx} ${20 + leafIdx * 25} ${12 + leafIdx} ${28 + leafIdx * 25}`
                          }
                          fill="#16a34a"
                          opacity="0.7"
                          animate={{
                            rotate: isLeft ? [0, 10, 0] : [0, -10, 0],
                          }}
                          transition={{
                            duration: 2 + leafIdx * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: leafIdx * 0.2
                          }}
                        />
                      ))}
                      <defs>
                        <linearGradient id="kelpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="50%" stopColor="#16a34a" />
                          <stop offset="100%" stopColor="#15803d" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Frond animation - gentle swaying */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        rotate: isLeft ? [-8, 8, -8] : [8, -8, 8],
                      }}
                      transition={{
                        duration: 3 + (i % 3) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
            
            {/* Apical meristem (growing tip) */}
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, #86efac, #4ade80, #22c55e)',
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)'
              }}
              animate={{ 
                scale: [1, 1.15, 1],
                boxShadow: [
                  '0 0 8px rgba(74, 222, 128, 0.5)',
                  '0 0 15px rgba(74, 222, 128, 0.7)',
                  '0 0 8px rgba(74, 222, 128, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        {/* Holdfast (root-like structure) at bottom */}
        <div className="absolute bottom-0 w-full h-6">
          <svg viewBox="0 0 100 30" className="w-full h-full">
            {/* Root tendrils */}
            {[...Array(7)].map((_, i) => (
              <path
                key={i}
                d={`M${45 + (i - 3) * 3} 5 Q${45 + (i - 3) * 8} 15 ${40 + (i - 3) * 10} 30`}
                fill="none"
                stroke="#166534"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
            {/* Base structure */}
            <ellipse cx="50" cy="10" rx="18" ry="8" fill="#14532d" opacity="0.8" />
            <ellipse cx="50" cy="8" rx="15" ry="6" fill="#166534" />
          </svg>
        </div>
      </div>
    </div>
  );
}