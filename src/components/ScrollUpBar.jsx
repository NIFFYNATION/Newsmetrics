import React, { useState, useEffect } from 'react';

const ScrollUpBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDistance = documentHeight - windowHeight;
      const percentage = (scrollTop / scrollDistance) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-2 bg-gray-200 cursor-pointer"
      onClick={handleScrollToTop}
    >
      <div 
        className="h-full bg-red-600 transition-all duration-300"
        style={{ width: `${scrollPercentage}%` }}
      />
      {scrollPercentage > 20 && (
        <button 
          className="absolute right-4 bottom-4 bg-red-600 text-white p-2 rounded-full shadow-lg transition-opacity duration-300"
          onClick={handleScrollToTop}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollUpBar;