import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { format } from "date-fns";

// Sample post data with Picsum photo links for posts and author profiles
const samplePosts = [
  {
    id: 1,
    image: "https://picsum.photos/seed/post1/800/600",
    category: "Technology",
    title: "The Future of AI",
    author: "John Doe",
    authorImage: "https://picsum.photos/seed/author1/100/100",
    description:
      "Artificial Intelligence is rapidly evolving. This article explores the potential impacts and advancements we can expect in the coming years.",
    date: "2023-05-20T10:30:00Z",
    tags: ["AI", "Technology", "Future"],
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/post2/800/600",
    category: "Health",
    title: "The Benefits of Meditation",
    author: "Jane Smith",
    authorImage: "https://picsum.photos/seed/author2/100/100",
    description:
      "Discover how daily meditation can improve your mental health, reduce stress, and increase overall well-being.",
    date: "2023-05-21T14:45:00Z",
    tags: ["Meditation", "Health", "Wellness"],
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/post3/800/600",
    category: "Environment",
    title: "Climate Change: A Global Crisis",
    author: "Emily Brown",
    authorImage: "https://picsum.photos/seed/author3/100/100",
    description:
      "An in-depth look at the current state of climate change, its impacts, and what we can do to mitigate its effects.",
    date: "2023-05-22T09:15:00Z",
    tags: ["Climate Change", "Environment", "Sustainability"],
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/post4/800/600",
    category: "Business",
    title: "The Rise of Remote Work",
    author: "Michael Johnson",
    authorImage: "https://picsum.photos/seed/author4/100/100",
    description:
      "How the pandemic has accelerated the shift towards remote work and its implications for the future of business.",
    date: "2023-05-23T16:20:00Z",
    tags: ["Remote Work", "Business", "Future of Work"],
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/post5/800/600",
    category: "Lifestyle",
    title: "Exploring World Cuisines",
    author: "Sarah Lee",
    authorImage: "https://picsum.photos/seed/author5/100/100",
    description:
      "A culinary journey through different cultures, exploring unique flavors and cooking techniques from around the globe.",
    date: "2023-05-24T12:00:00Z",
    tags: ["Food", "Travel", "Culture"],
  },
];

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  // Mock data for search results
  const allArticles = useMemo(
    () => [
      {
        id: 1,
        title: "The 2022 NFL Draft: Who's Going Where?",
        category: "Sports",
      },
      {
        id: 2,
        title: "Why the Metaverse is the Future",
        category: "Technology",
      },
      {
        id: 3,
        title: "How to Make the Perfect Margarita",
        category: "Food & Drink",
      },
      {
        id: 4,
        title: "The Top 5 Must-See Movies of 2022",
        category: "Entertainment",
      },
      {
        id: 5,
        title: "The Future of Work: What's Next?",
        category: "Business",
      },
      // Add more articles as needed
    ],
    []
  );

  const searchResults = useMemo(() => {
    if (searchQuery.length === 0) return [];
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allArticles]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById("search-input").focus(), 0);
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="border-b border-solid border-b-[#e5e7e9] px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-8 sm:size-10">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em] sm:text-[1.7rem]">
              News
              <span className="text-red-600">Metrics</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Subscribe</span>
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f0f2f4] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
              </svg>
            </button>
            <div className="relative" ref={searchRef}>
              <button
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f0f2f4] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                onClick={handleSearchClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <input
                    id="search-input"
                    type="text"
                    className="w-full px-4 py-2 text-gray-800 focus:outline-none"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchResults.length > 0 && (
                    <ul className="max-h-60 overflow-y-auto">
                      {searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Link to={`/article/${result.id}`} className="block">
                            <p className="text-sm font-medium text-gray-900">
                              {result.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {result.category}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
          <button
            className="md:hidden text-[#111418]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full ">
          <div className="p-4 border-b border-gray-200">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="#"
                className="block text-[#111418] text-sm font-medium leading-normal"
              >
                Top Stories
              </Link>
              <Link
                to="#"
                className="block text-[#111418] text-sm font-medium leading-normal"
              >
                Local
              </Link>
              <Link
                to="#"
                className="block text-[#111418] text-sm font-medium leading-normal"
              >
                Politics
              </Link>
              <Link
                to="#"
                className="block text-[#111418] text-sm font-medium leading-normal"
              >
                Crime
              </Link>
              <Link
                to="#"
                className="block text-[#111418] text-sm font-medium leading-normal"
              >
                Business
              </Link>
              <Link
                to="#"
                className="block text-[#111418] text-sm font-medium leading-normal"
              >
                Tech
              </Link>
            </div>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex justify-center items-center cursor-pointer overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Subscribe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <nav className="hidden md:flex flex-1 justify-center items-center gap-6 mt-4 mb-6 pb-4 border-b border-solid border-b-[#e5e7e9]">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="#"
            className="text-[#111418] text-lg font-medium leading-normal"
          >
            Top Stories
          </Link>
          <Link
            to="#"
            className="text-[#111418] text-lg font-medium leading-normal"
          >
            Local
          </Link>
          <Link
            to="#"
            className="text-[#111418] text-lg font-medium leading-normal"
          >
            Politics
          </Link>
          <Link
            to="#"
            className="text-[#111418] text-lg font-medium leading-normal"
          >
            Crime
          </Link>
          <Link
            to="#"
            className="text-[#111418] text-lg font-medium leading-normal"
          >
            Business
          </Link>
          <Link
            to="#"
            className="text-[#111418] text-lg font-medium leading-normal"
          >
            Tech
          </Link>
        </div>
      </nav>
    </>
  );
};

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
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base">
                          {post.author}
                        </p>
                        <p className="text-xs sm:text-sm opacity-75">
                          {format(new Date(post.date), "MMM d, yyyy • h:mm a")}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/article/${post.id}`}
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

const FeaturedArticle = ({
  id,
  image,
  category,
  title,
  author,
  description,
  date,
}) => (
  <Link
    to={`/article/${id}`}
    className="block hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
  >
    <div className="p-4 @container">
      <div className="flex flex-col items-stretch justify-start rounded-xl sm:flex-row sm:items-start">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl sm:w-1/2 lg:w-2/5"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div className="flex w-full grow flex-col items-stretch justify-center gap-2 py-4 sm:px-4">
          <p className="text-[#637588] text-sm font-normal leading-normal">
            {category} • {format(new Date(date), "MMMM d, yyyy • h:mm a")}
          </p>
          <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] sm:text-xl lg:text-2xl">
            {title}
          </h3>
          <p className="text-[#637588] text-base font-normal leading-normal">
            {description}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-[#637588] text-base font-normal leading-normal">
              By: {author}
            </p>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal mt-2 sm:mt-0">
              <span className="truncate">Read More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const TrendingArticle = ({ id, image, title, category, date }) => (
  <Link
    to={`/article/${id}`}
    className="block hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
  >
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
            {title}
          </p>
          <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
            {category}
          </p>
          <p className="text-[#637588] text-xs font-normal leading-normal">
            {format(new Date(date), "MMM d, yyyy • h:mm a")}
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <div
          className="text-[#111418] flex size-7 items-center justify-center"
          data-icon="ArrowRight"
          data-size="24px"
          data-weight="regular"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
        </div>
      </div>
    </div>
  </Link>
);

const Footer = () => (
  <footer className="flex justify-center border-t border-gray-200">
    <div className="flex max-w-[960px] flex-1 flex-col">
      <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
        <nav className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <a
            className="text-[#637588] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            About
          </a>
          <a
            className="text-[#637588] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            Contact
          </a>
          <a
            className="text-[#637588] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-[#637588] text-base font-normal leading-normal min-w-40"
            href="#"
          >
            Terms of Service
          </a>
        </nav>
        <p className="text-[#637588] text-base font-normal leading-normal">
          © {new Date().getFullYear()} News Wave
        </p>
      </div>
    </div>
  </footer>
);

const LatestPosts = ({ posts }) => (
  <div className="mb-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg overflow-hidden border border-gray-200">
    <h2 className="text-3xl font-bold text-white p-6 border-b border-white/20">
      Latest Posts
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {posts.map((post) => (
        <Link key={post.id} to={`/article/${post.id}`} className="block group">
          <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform group-hover:scale-105 border border-gray-200">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded-md transition duration-300 ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const results = samplePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags &&
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const Advertisement = () => (
    <div className="bg-gray-100 p-4 rounded-lg mt-32">
      <h2 className="text-lg font-bold mb-2">Advertisement</h2>
      <div className="bg-gray-300 h-60 flex items-center justify-center text-gray-600">
        Ad Space
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>News Metrics - Latest News and Featured Articles</title>
        <meta
          name="description"
          content="Stay informed with News Wave. Read the latest news, featured articles, and trending stories across technology, food & drink, entertainment, and more."
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          as="style"
          onLoad="this.rel='stylesheet'"
          href="https://fonts.googleapis.com/css2?display=swap&family=Newsreader%3Awght%40400%3B500%3B700%3B800&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900"
        />
        <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
      </Helmet>

      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <Header onSearch={handleSearch} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <HeroCarousel latestPosts={sortedPosts.slice(0, 5)} />

            <div className="flex flex-col lg:flex-row gap-6 py-6 border-t border-gray-200 mt-6">
              <main className="flex-grow lg:border-r lg:border-gray-200 lg:pr-6">
                <LatestPosts posts={sortedPosts.slice(0, 3)} />
                <h2 className="text-[#111418] text-2xl font-bold leading-tight tracking-[-0.015em] mb-4 pb-2 border-b border-gray-200">
                  Featured Articles
                </h2>
                <div className="space-y-6">
                  {currentPosts.map((post) => (
                    <FeaturedArticle key={post.id} {...post} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={paginate}
                />
              </main>
              <aside className="w-full lg:w-80 shrink-0">
                <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em] mb-4 pb-2 border-b border-gray-200">
                  Trending Now
                </h2>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                  {sortedPosts.slice(0, 5).map((post) => (
                    <TrendingArticle key={post.id} {...post} />
                  ))}
                </div>
                <Advertisement />
              </aside>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Posts;
