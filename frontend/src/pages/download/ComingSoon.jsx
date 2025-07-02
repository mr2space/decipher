import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/Footer/Footer";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We’re working hard to launch something amazing. Stay tuned!
        </p>
        <motion.div
          className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full mx-auto animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default ComingSoon;
