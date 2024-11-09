import React from 'react';

const RarityRoll: React.FC = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 animate-spin">
          <div className="h-full w-full rounded-full border-4 border-t-yellow-400 border-r-purple-400 border-b-blue-400 border-l-gray-400"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default RarityRoll;