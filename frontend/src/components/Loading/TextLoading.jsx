import React from 'react';

const TextLoading = ({ width = 'w-80', height = 'h-8', margin = 'mt-4' }) => {
  return (
    <div className={`mage_box ${height} ${width} rounded-lg bg-gray-300 animate-pulse overflow-hidden ${margin}`}></div>
  );
};

export default TextLoading;
