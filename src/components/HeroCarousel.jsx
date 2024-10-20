import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { format, isValid, formatDistanceToNow } from "date-fns";
import { slugify } from '../utils/slugify';

const HeroCarousel = ({ latestPosts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % latestPosts.length);
  }, [latestPosts.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + latestPosts.length) % latestPosts.length
    );
  }, [latestPosts.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg ">
      {/* Latest Posts Label */}
      <div className="absolute top-2 left-2 z-10 sm:top-4 sm:left-4 ">
        <span className="bg-red-600 text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-full font-bold uppercase tracking-wider shadow-lg">
          Latest Posts
        </span>
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {latestPosts.map((post) => (
          <div key={post.id} className="w-full flex-shrink-0">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                <div className="max-w-3xl mx-auto">
                  <span className="inline-block px-2 py-1 mb-2 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-blue-500 rounded-full">
                    {post.category}
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2 sm:mb-4">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-4" 
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base">
                          {post.author}
                        </p>
                        <time 
                          dateTime={isValid(new Date(post.date)) ? new Date(post.date).toISOString() : ''}
                          className="text-xs sm:text-sm opacity-75"
                        >
                          {isValid(new Date(post.date)) 
                            ? `${format(new Date(post.date), "MMM d, yyyy • h:mm a")} • ${formatDistanceToNow(new Date(post.date))} ago`
                            : "No date"}
                        </time>
                      </div>
                    </div>
                    <Link
                       to={`/article/${slugify(post.title)}`}

                      className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 text-sm sm:text-base font-semibold rounded-full hover:bg-blue-100 transition duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 sm:p-2 focus:outline-none transition duration-300"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 sm:p-2 focus:outline-none transition duration-300"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {latestPosts.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
