import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
};

export default LoadingSpinner;