import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:80/auth/logout", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
      }

      // Clear frontend stored tokens or user data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Close dropdown
      setIsOpen(false);

      // Redirect and force a refresh
      navigate("/");
      window.location.reload();    
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="relative flex justify-center" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-1 -ml-4 text-black bg-transparent border border-black rounded-full flex justify-center items-center cursor-pointer group hover:bg-black hover:text-white transition-all"
      >
        Profile
      </button>

      {/* Dropdown Menu */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0, translateX: "-50%", translateY: "-10px" }}
        animate={isOpen ? { opacity: 1, scaleY: 1, translateX: "-50%", translateY: "0px" } : { opacity: 0, scaleY: 0, translateX: "-50%", translateY: "-10px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute left-1/2 top-full mt-2 w-40 bg-white shadow-lg rounded-md origin-top ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Dropdown Items */}
        <ul className="flex flex-col gap-2 p-2 text-gray-800">
          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
              About
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              Logout
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ProfileButton;
