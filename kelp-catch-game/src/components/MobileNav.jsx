import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings, ArrowLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';

const scrollPositions = {};

export default function MobileNav() {
  const location = useLocation();
  const isHome = location.pathname === createPageUrl('Game') || location.pathname === '/';

  React.useEffect(() => {
    const currentPath = location.pathname;
    
    // Restore scroll position
    if (scrollPositions[currentPath] !== undefined) {
      window.scrollTo(0, scrollPositions[currentPath]);
    }

    // Save scroll position on unmount
    return () => {
      scrollPositions[currentPath] = window.scrollY;
    };
  }, [location.pathname]);

  const navItems = [
    { icon: Home, label: 'Home', path: 'Game' },
    { icon: BarChart3, label: 'Stats', path: 'Stats' },
    { icon: Settings, label: 'Settings', path: 'Settings' },
  ];

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-4 h-14">
          {isHome ? (
            <h1 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">🌊 Urchin Catcher</h1>
          ) : (
            <Link 
              to={createPageUrl('Game')}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 min-h-[44px] min-w-[44px] -ml-2 px-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === createPageUrl(item.path) || 
                           (location.pathname === '/' && item.path === 'Game');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={createPageUrl(item.path)}
                className={`flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] px-4 ${
                  isActive 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}