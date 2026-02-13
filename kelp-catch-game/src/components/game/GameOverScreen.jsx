import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from 'lucide-react';

export default function GameOverScreen({ score, highScore, onRestart }) {
  const isNewHighScore = score >= highScore && score > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30"
    >
      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-md mx-4"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          <span className="text-red-400">Game</span>{' '}
          <span className="text-white">Over</span>
        </motion.h2>
        
        {isNewHighScore && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-4 text-amber-400"
          >
            <Trophy className="w-6 h-6" />
            <span className="text-lg font-bold">New High Score!</span>
            <Trophy className="w-6 h-6" />
          </motion.div>
        )}
        
        <div className="text-center mb-8">
          <p className="text-cyan-300 text-sm uppercase tracking-wider mb-2">Urchins Caught</p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl font-bold text-white"
          >
            {score}
          </motion.p>
        </div>
        
        {!isNewHighScore && highScore > 0 && (
          <p className="text-center text-amber-300/70 mb-6">
            Best: {highScore}
          </p>
        )}
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-lg px-8 py-6 rounded-full shadow-lg min-h-[44px] min-w-[44px]"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Play Again
          </Button>
        </motion.div>
        
        {/* Decorative urchin */}
        <motion.div
          className="absolute -bottom-4 -right-4 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 60 60" className="w-24 h-24">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12;
              const radians = (angle * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={30 + Math.cos(radians) * 12}
                  y1={30 + Math.sin(radians) * 12}
                  x2={30 + Math.cos(radians) * 28}
                  y2={30 + Math.sin(radians) * 28}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
            <circle cx="30" cy="30" r="12" fill="white" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}