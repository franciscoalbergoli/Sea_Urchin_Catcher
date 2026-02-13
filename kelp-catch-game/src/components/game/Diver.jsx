import React from 'react';
import { motion } from 'framer-motion';

export default function Diver({ x }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: '75%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-32 h-40">
        {/* Catching bag/net - larger and more visible */}
        <motion.div 
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-16 z-10"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 70" className="w-full h-full">
            {/* Net rim */}
            <ellipse cx="50" cy="8" rx="45" ry="8" fill="#666" stroke="#333" strokeWidth="2" />
            {/* Net bag mesh */}
            <path
              d="M5 8 Q10 45 20 60 L80 60 Q90 45 95 8"
              fill="rgba(100, 100, 100, 0.4)"
              stroke="#555"
              strokeWidth="2"
            />
            {/* Net mesh pattern */}
            {[...Array(8)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={12 + i * 10}
                y1="8"
                x2={20 + i * 8}
                y2="60"
                stroke="#444"
                strokeWidth="1.5"
                opacity="0.6"
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <path
                key={`h${i}`}
                d={`M${8 + i * 3} ${12 + i * 10} Q50 ${18 + i * 10} ${92 - i * 3} ${12 + i * 10}`}
                fill="none"
                stroke="#444"
                strokeWidth="1.5"
                opacity="0.6"
              />
            ))}
            {/* Handle/pole */}
            <rect x="46" y="60" width="8" height="25" fill="#654321" stroke="#3d2812" strokeWidth="1.5" rx="2" />
            <ellipse cx="50" cy="62" rx="6" ry="3" fill="#7d5a3d" />
          </svg>
        </motion.div>

        {/* Diver body */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          {/* Head with realistic diving mask */}
          <div className="relative">
            <div className="w-14 h-16 bg-gradient-to-b from-peach-300 to-peach-400 rounded-full border border-peach-400" style={{ background: 'linear-gradient(to bottom, #fcd5b5, #f4b183)' }}>
              {/* Hair under hood */}
              <div className="absolute top-1 left-2 right-2 h-3 bg-amber-900 rounded-t-full opacity-40" />
              
              {/* Diving mask with strap */}
              <div className="absolute top-4 left-0 right-0">
                {/* Mask strap */}
                <div className="absolute top-1 left-0 right-0 h-2 bg-slate-900 rounded" />
                {/* Mask glass */}
                <div className="absolute top-0 left-2 right-2 h-7 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-lg border-3 border-slate-800" style={{ borderWidth: '3px' }}>
                  {/* Mask frame */}
                  <div className="absolute inset-0 border-2 border-slate-700 rounded-lg" />
                  {/* Nose piece */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3 bg-slate-800 rounded-t-lg" />
                  {/* Glass reflection */}
                  <div className="absolute top-1 left-1 w-6 h-3 bg-white/40 rounded-full blur-sm" />
                  <div className="absolute top-2 right-1 w-4 h-2 bg-white/30 rounded-full blur-sm" />
                </div>
              </div>

              {/* Regulator/breathing apparatus */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-4 bg-slate-700 rounded border-2 border-slate-600" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-500 rounded-full" />
            </div>

            {/* Air hose */}
            <svg className="absolute -right-4 top-8 w-12 h-16" viewBox="0 0 40 60">
              <path
                d="M5 0 Q15 15 15 30 Q15 45 25 60"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M5 0 Q15 15 15 30 Q15 45 25 60"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Wetsuit torso */}
          <div className="w-16 h-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-lg mx-auto -mt-2 relative border border-slate-700">
            {/* Wetsuit panels */}
            <div className="absolute inset-x-2 top-3 h-px bg-slate-600" />
            <div className="absolute inset-x-2 bottom-3 h-px bg-slate-600" />
            <div className="absolute top-2 bottom-2 left-1/2 w-px bg-slate-600" />
            
            {/* Zipper */}
            <div className="absolute left-1/2 top-2 bottom-2 w-1 bg-slate-600 transform -translate-x-1/2" />
            
            {/* BCD straps */}
            <div className="absolute top-6 left-0 right-0 h-2 bg-slate-700 border-t border-b border-slate-600" />
            <div className="absolute bottom-6 left-0 right-0 h-2 bg-slate-700 border-t border-b border-slate-600" />

            {/* Arms - more realistic */}
            <motion.div 
              className="absolute -left-5 top-3 w-5 h-14 bg-gradient-to-b from-slate-900 to-slate-800 rounded-full origin-top border border-slate-700"
              animate={{ rotate: [-20, -5, -20] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Forearm */}
              <div className="absolute bottom-0 left-0 w-5 h-8 bg-slate-900 rounded-full border border-slate-700" />
              {/* Hand/glove */}
              <div className="absolute -bottom-4 left-0 w-5 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #fcd5b5, #f4b183)' }} />
            </motion.div>
            
            <motion.div 
              className="absolute -right-5 top-3 w-5 h-14 bg-gradient-to-b from-slate-900 to-slate-800 rounded-full origin-top border border-slate-700"
              animate={{ rotate: [20, 5, 20] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Forearm */}
              <div className="absolute bottom-0 right-0 w-5 h-8 bg-slate-900 rounded-full border border-slate-700" />
              {/* Hand/glove */}
              <div className="absolute -bottom-4 right-0 w-5 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #fcd5b5, #f4b183)' }} />
            </motion.div>
          </div>

          {/* Legs */}
          <div className="flex justify-center gap-1 -mt-1">
            <div className="w-5 h-12 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg border border-slate-700" />
            <div className="w-5 h-12 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg border border-slate-700" />
          </div>

          {/* Diving fins */}
          <motion.div 
            className="flex justify-center gap-2 -mt-1"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="relative">
              <div className="w-7 h-12 bg-gradient-to-b from-blue-600 to-blue-800 rounded-b-2xl transform -rotate-15 border-2 border-blue-900" />
              <div className="absolute inset-x-1 top-2 bottom-2 border-l-2 border-r-2 border-blue-700 opacity-50" />
            </div>
            <div className="relative">
              <div className="w-7 h-12 bg-gradient-to-b from-blue-600 to-blue-800 rounded-b-2xl transform rotate-15 border-2 border-blue-900" />
              <div className="absolute inset-x-1 top-2 bottom-2 border-l-2 border-r-2 border-blue-700 opacity-50" />
            </div>
          </motion.div>
        </div>

        {/* Air bubbles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/70 rounded-full shadow-lg"
            style={{ left: `${45 + (i % 2) * 15}%` }}
            initial={{ y: 30, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: [-30, -70],
              x: [(i % 2) * 10 - 5, (i % 2) * -10 + 5],
              opacity: [0.7, 0],
              scale: [0.5, 1.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}