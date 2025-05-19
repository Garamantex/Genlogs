import React from 'react';

export const MapPlaceholder: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex items-center justify-center h-[700px] w-full border border-gray-200 dark:border-gray-700">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl w-full h-full object-contain bg-white dark:bg-gray-900"
      >
        <rect width="600" height="700" rx="32" fill="currentColor" className="text-gray-100 dark:text-gray-900" />
        <text x="50%" y="50%" textAnchor="middle" fill="currentColor" fontSize="36" fontWeight="bold" dy=".3em" className="text-gray-400 dark:text-gray-500">
          Map Placeholder
        </text>
      </svg>
    </div>
  );
}; 