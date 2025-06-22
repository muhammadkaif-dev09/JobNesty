import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flash, setFlash] = useState("");
  const navigate = useNavigate();

  // Toggle dropdown
  const toggleMenu = () => setIsOpen(!isOpen);

  // Logout function
  const logoutUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setFlash("Logout Successful!");
        setTimeout(() => {
          setFlash("");
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setFlash("❌ Logout failed");
      setTimeout(() => setFlash(""), 2000);
    }
  };

  const { darkMode, setDarkMode } = useTheme(); // ✅ Theme toggle
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-white">
          JobNesty
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/home"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Profile
          </NavLink>
          <NavLink
            to="/admin"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Admin
          </NavLink>
          <button
            onClick={logoutUser}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Logout
          </button>

          {/* 🌗 Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            title="Toggle Theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {/* 🌗 Toggle in mobile too */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 dark:text-gray-200"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <NavLink
            to="/home"
            onClick={toggleMenu}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            onClick={toggleMenu}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Profile
          </NavLink>
          <NavLink
            to="/admin"
            onClick={toggleMenu}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Admin
          </NavLink>
          <button
            onClick={() => {
              logoutUser();
              toggleMenu();
            }}
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
