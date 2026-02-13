import React from 'react';
import MobileNav from '@/components/MobileNav';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';

export default function Settings() {
  const [darkMode, setDarkMode] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleAccountDeletion = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <MobileNav />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-[calc(env(safe-area-inset-top)+3.5rem)] pb-[calc(env(safe-area-inset-bottom)+4rem)]"
      >
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Toggle dark theme</p>
              </div>
              <Button
                onClick={toggleDarkMode}
                variant="outline"
                size="icon"
                className="min-h-[44px] min-w-[44px] dark:border-slate-700"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-900/50">
            <h3 className="font-semibold text-red-900 dark:text-red-400 mb-4">⚠️ Danger Zone</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Delete Account Data</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Remove all local data and scores</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="min-h-[44px] min-w-[44px]"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-white">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="dark:text-gray-400">
                      This action cannot be undone. This will permanently delete your
                      high scores and all local data from this device.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="min-h-[44px] dark:border-slate-700 dark:text-gray-300">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleAccountDeletion}
                      className="min-h-[44px] bg-red-600 hover:bg-red-700"
                    >
                      Delete Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}