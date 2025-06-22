import React from "react";
import { useTheme } from "./ThemeContext";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const AuthNavbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          JobNesty
        </h1>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
};

export default AuthNavbar;
