import React from 'react';
import MobileNav from '@/components/MobileNav';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function Stats() {
  const [highScore, setHighScore] = React.useState(() => localStorage.getItem('urchinGameHighScore') || 0);
  const [isPulling, setIsPulling] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const startY = React.useRef(0);
  const containerRef = React.useRef(null);

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling) return;
    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, Math.min(currentY - startY.current, 100));
    setPullDistance(distance);
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      setIsRefreshing(true);
      setTimeout(() => {
        setHighScore(localStorage.getItem('urchinGameHighScore') || 0);
        setIsRefreshing(false);
        setPullDistance(0);
        setIsPulling(false);
      }, 800);
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  return (
    <>
      <MobileNav />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        ref={containerRef}
        className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+4rem)] overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull to refresh indicator */}
        <motion.div 
          className="flex justify-center pt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: pullDistance > 0 ? 1 : 0,
            y: pullDistance > 0 ? Math.min(pullDistance - 20, 40) : -20
          }}
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : pullDistance * 3.6 }}
            transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0 }}
          >
            <RefreshCw className={`w-6 h-6 ${pullDistance > 60 ? 'text-emerald-600' : 'text-gray-400'}`} />
          </motion.div>
        </motion.div>

        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Statistics</h1>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">High Score</p>
                <motion.p 
                  key={highScore}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-1"
                >
                  {highScore}
                </motion.p>
              </div>
              <div className="text-5xl">🏆</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}