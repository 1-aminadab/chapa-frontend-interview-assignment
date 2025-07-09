import React, { useState } from "react";
import { FiLogOut, FiUser, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../common/Button";
import chapaLogo from "@/assets/images/chapa-logo.png";

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Title */}
          <div className="flex items-center">
            <img src={chapaLogo} alt="Chapa Dashboard" className="w-20 w-auto" />
          </div>

          {/* User info: always visible, even on mobile */}
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg md:hidden">
            <FiUser className="text-gray-600 dark:text-gray-400" />
            <div className="flex flex-col min-w-[120px]">
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {currentUser?.name || "User"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
                {currentUser?.role.replace("_", " ") || "Role"}
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FiUser className="text-gray-600 dark:text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                  {currentUser?.name || "User"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentUser?.role.replace("_", " ") || "Role"}
                </span>
              </div>
            </div>

            <Button
              onClick={logout}
              variant="secondary"
              size="small"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <FiLogOut />
              Logout
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold"
          >
            {isDark ? (
              <>
                <FiSun size={20} /> Light Mode
              </>
            ) : (
              <>
                <FiMoon size={20} /> Dark Mode
              </>
            )}
          </button>

          <Button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            variant="secondary"
            size="small"
            className="w-full flex items-center justify-center gap-2 py-3 font-semibold"
          >
            <FiLogOut />
            Logout
          </Button>
        </nav>
      )}
    </header>
  );
};
