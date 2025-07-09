
import React from 'react';
import { FiLogOut, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Chapa Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FiUser className="text-gray-600 dark:text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentUser?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentUser?.role.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <Button 
              onClick={logout} 
              variant="secondary" 
              size="small"
              className="flex items-center gap-2"
            >
              <FiLogOut />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
