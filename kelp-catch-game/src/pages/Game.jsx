import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from 'lucide-react';
import Diver from '@/components/game/Diver';
import SeaUrchin from '@/components/game/SeaUrchin';
import KelpIndicator from '@/components/game/KelpIndicator';
import LivesDisplay from '@/components/game/LivesDisplay';
import GameOverScreen from '@/components/game/GameOverScreen';

export default function Game() {
  const [gameState, setGameState] = useState('idle'); // idle, playing, gameOver
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [diverX, setDiverX] = useState(50);
  const [urchins, setUrchins] = useState([]);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('urchinGameHighScore');
    return saved ? parseInt(saved) : 0;
  });
  
  const gameAreaRef = useRef(null);
  const urchinIdRef = useRef(0);
  const gameLoopRef = useRef(null);
  const spawnIntervalRef = useRef(null);

  const DIVER_WIDTH = 120;
  const CATCH_ZONE_TOP = 75; // percentage from top
  const URCHIN_SIZE = 50;

  const handleMouseMove = useCallback((e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setDiverX(Math.max(5, Math.min(95, x)));
  }, [gameState]);

  const handleTouchMove = useCallback((e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setDiverX(Math.max(5, Math.min(95, x)));
  }, [gameState]);

  const handleTouchStart = useCallback((e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setDiverX(Math.max(5, Math.min(95, x)));
  }, [gameState]);

  const spawnUrchin = useCallback(() => {
    const newUrchin = {
      id: urchinIdRef.current++,
      x: Math.random() * 80 + 10,
      y: -10,
      speed: 0.8 + Math.random() * 0.4 + (score * 0.025),
      rotation: Math.random() * 360,
    };
    setUrchins(prev => [...prev, newUrchin]);
  }, [score]);

  const checkCollision = useCallback((urchin) => {
    const diverLeft = diverX - (DIVER_WIDTH / 2) / (gameAreaRef.current?.clientWidth || 400) * 100;
    const diverRight = diverX + (DIVER_WIDTH / 2) / (gameAreaRef.current?.clientWidth || 400) * 100;
    
    return (
      urchin.y >= CATCH_ZONE_TOP - 5 &&
      urchin.y <= CATCH_ZONE_TOP + 10 &&
      urchin.x >= diverLeft - 5 &&
      urchin.x <= diverRight + 5
    );
  }, [diverX]);

  const gameLoop = useCallback(() => {
    setUrchins(prev => {
      const newUrchins = [];
      let lostLife = false;
      let caughtCount = 0;

      prev.forEach(urchin => {
        const newY = urchin.y + urchin.speed;
        
        if (checkCollision({ ...urchin, y: newY })) {
          caughtCount++;
        } else if (newY > 100) {
          lostLife = true;
        } else {
          newUrchins.push({ ...urchin, y: newY, rotation: urchin.rotation + 2 });
        }
      });

      if (caughtCount > 0) {
        setScore(s => s + caughtCount);
      }

      if (lostLife) {
        setLives(l => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setGameState('gameOver');
          }
          return newLives;
        });
      }

      return newUrchins;
    });
  }, [checkCollision]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 16);
      spawnIntervalRef.current = setInterval(spawnUrchin, Math.max(250, 600 - score * 10));
      
      return () => {
        clearInterval(gameLoopRef.current);
        clearInterval(spawnIntervalRef.current);
      };
    }
  }, [gameState, gameLoop, spawnUrchin, score]);

  useEffect(() => {
    if (gameState === 'gameOver' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('urchinGameHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setUrchins([]);
    setDiverX(50);
    urchinIdRef.current = 0;
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-cyan-500 to-blue-900 overflow-hidden select-none">
      {/* Tasmanian underwater background */}
      <div 
        ref={gameAreaRef}
        data-no-select
        className="relative w-full h-screen overflow-hidden touch-none cursor-none game-canvas"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(56, 189, 248, 0.3) 0%, 
              rgba(14, 116, 144, 0.6) 30%, 
              rgba(12, 74, 110, 0.9) 70%, 
              rgba(7, 39, 61, 1) 100%
            )
          `,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none',
        }}
      >
        {/* Underwater light rays */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bg-gradient-to-b from-white/40 to-transparent"
              style={{
                left: `${15 + i * 18}%`,
                width: '8%',
                height: '60%',
                transform: `rotate(${-10 + i * 5}deg)`,
                transformOrigin: 'top center'
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Background giant kelp forest */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4 pointer-events-none">
          {[...Array(window.innerWidth < 768 ? 5 : 8)].map((_, i) => {
            const kelpHeight = 300 + Math.random() * 250;
            const frondCount = 10 + Math.floor(Math.random() * 8);
            const opacity = 0.15 + (i % 3) * 0.08;
            
            return (
              <motion.div
                key={i}
                className="absolute bottom-0"
                style={{
                  left: `${5 + i * 12}%`,
                  height: kelpHeight,
                  opacity: opacity,
                }}
                animate={{
                  skewX: [-4, 4, -4],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Main stipe - realistic brown color */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 rounded-t-full shadow-lg" style={{ 
                  height: '100%',
                  background: 'linear-gradient(to top, #3f2f1f, #5d4a3a, #6b5444)'
                }}>
                  {/* Subtle ridges */}
                  {[...Array(Math.floor(kelpHeight / 30))].map((_, k) => (
                    <div
                      key={k}
                      className="absolute left-0 right-0 h-px bg-black/20"
                      style={{ bottom: `${k * 30}px` }}
                    />
                  ))}
                </div>
                
                {/* Fronds with gas bladders */}
                {[...Array(frondCount)].map((_, j) => {
                  const isLeft = j % 2 === 0;
                  const yPos = `${(j + 1.5) * (90 / (frondCount + 1))}%`;
                  const frondWidth = 18 + (j % 3) * 8;
                  const frondHeight = 40 + (j % 4) * 15;
                  
                  return (
                    <div key={j} className="absolute" style={{ bottom: yPos, [isLeft ? 'right' : 'left']: '3px' }}>
                      {/* Gas bladder (pneumatocyst) - realistic golden-brown */}
                      <motion.div
                        className="absolute z-10 rounded-full shadow-md"
                        style={{
                          [isLeft ? 'right' : 'left']: '-2px',
                          top: '-2px',
                          width: 8,
                          height: 8,
                          background: 'radial-gradient(circle at 35% 35%, #d4a574, #b8915f, #8b6f47)',
                          border: '1px solid rgba(107, 84, 68, 0.5)',
                        }}
                        animate={{
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 2.5 + (j % 3) * 0.5,
                          repeat: Infinity,
                          delay: j * 0.15
                        }}
                      />
                      
                      {/* Frond blade */}
                      <motion.div
                        style={{
                          width: frondWidth,
                          height: frondHeight,
                          transformOrigin: isLeft ? 'right center' : 'left center',
                        }}
                        animate={{
                          rotate: isLeft ? [-15, 12, -15] : [15, -12, 15],
                        }}
                        transition={{
                          duration: 5 + (j % 3) * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: j * 0.15
                        }}
                      >
                        <svg viewBox="0 0 40 80" className="w-full h-full drop-shadow-md">
                          {/* Realistic blade - olive/brown tones */}
                          <path
                            d={isLeft 
                              ? "M38 0 Q32 12 30 25 Q28 40 26 55 Q24 68 20 80 L22 80 Q28 65 30 50 Q32 35 34 20 Q36 8 38 0"
                              : "M2 0 Q8 12 10 25 Q12 40 14 55 Q16 68 20 80 L18 80 Q12 65 10 50 Q8 35 6 20 Q4 8 2 0"
                            }
                            fill="url(#bgKelpGradient)"
                            stroke="rgba(75, 65, 50, 0.6)"
                            strokeWidth="0.5"
                            opacity="0.85"
                          />
                          {/* Midrib */}
                          <path
                            d={isLeft
                              ? "M38 0 Q30 25 26 50 Q24 65 20 80"
                              : "M2 0 Q10 25 14 50 Q16 65 20 80"
                            }
                            fill="none"
                            stroke="rgba(75, 65, 50, 0.5)"
                            strokeWidth="1"
                            opacity="0.6"
                          />
                          <defs>
                            <linearGradient id="bgKelpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#6b7c59" />
                              <stop offset="50%" stopColor="#5a6b4a" />
                              <stop offset="100%" stopColor="#4a5a3a" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </motion.div>
                    </div>
                  );
                })}
                
                {/* Holdfast - root structure */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <svg viewBox="0 0 60 25" className="w-12 h-6">
                    {/* Root tendrils spreading out */}
                    {[...Array(9)].map((_, r) => (
                      <path
                        key={r}
                        d={`M30 5 Q${28 + (r - 4) * 3} 12 ${25 + (r - 4) * 5} 25`}
                        fill="none"
                        stroke="#14532d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    ))}
                    <ellipse cx="30" cy="8" rx="12" ry="6" fill="#4a5a3a" opacity="0.9" />
                    <ellipse cx="30" cy="6" rx="10" ry="4" fill="#3a4a2a" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rocky bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-800 to-transparent" />

        {/* UI Elements */}
        <div className="absolute top-0 left-0 right-0 pt-[env(safe-area-inset-top)] px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] z-20">
          <div className="flex justify-between items-start p-2 sm:p-4">
            <LivesDisplay lives={lives} />
            <KelpIndicator score={score} />
          </div>
        </div>

        {/* Urchins */}
        <AnimatePresence>
          {urchins.map(urchin => (
            <SeaUrchin key={urchin.id} urchin={urchin} />
          ))}
        </AnimatePresence>

        {/* Diver */}
        {gameState === 'playing' && (
          <Diver x={diverX} />
        )}

        {/* Start Screen */}
        {gameState === 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30"
          >
            <motion.h1 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 text-center drop-shadow-lg px-4"
              style={{ fontFamily: 'system-ui' }}
            >
              Urchin Catcher
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-cyan-200 text-base sm:text-lg md:text-xl mb-8 text-center px-4 max-w-md"
            >
              {window.innerWidth < 768 ? 'Touch to move the diver and catch urchins!' : 'Catch the sea urchins to grow your kelp forest!'}
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Button 
                onClick={startGame}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xl px-8 py-6 rounded-full shadow-lg min-h-[44px] min-w-[44px]"
              >
                <Play className="mr-2 h-6 w-6" />
                Start Game
              </Button>
            </motion.div>
            {highScore > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-amber-300 text-lg"
              >
                🏆 High Score: {highScore}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <GameOverScreen 
            score={score} 
            highScore={highScore} 
            onRestart={startGame} 
          />
        )}
      </div>
    </div>
  );
}