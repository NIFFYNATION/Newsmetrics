import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="fixed top-0 left-0 right-0 bg-white z-50">
      <header className="border-b border-solid border-b-[#e5e7e9] px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center gap-4 text-[#111418]">
              <div className="size-8 sm:size-10">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="12" fill="#111418" />
                  <path
                    d="M14 34V14L24 28L34 14V34"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 34H34"
                    stroke="#FF4136"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="24" r="16" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx="24" cy="24" r="3" fill="#FF4136" />
                </svg>
              </div>

              <h1 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em] sm:text-[1.7rem]">
                News
                <span className="text-red-600">Metrics</span>
              </h1>
            </div>
          </Link>
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
              {[
                { to: "/", text: "Home" },
                { to: "/local", text: "Local" },
                { to: "/entertainment", text: "Entertainment" },
                { to: "/politics", text: "Politics" },
                { to: "/crime", text: "Crime" },
                { to: "/business", text: "Business" },
                { to: "/tech", text: "Tech" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-[#111418] text-lg font-medium leading-normal hover:border-b-2 hover:border-red-600 pb-1 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex justify-center items-center cursor-pointer overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]" onClick={() => setIsMenuOpen(false)}>
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

      <nav className="hidden md:flex flex-1 justify-center items-center gap-6 py-4 border-b border-solid border-b-[#e5e7e9]">
        <div className="flex items-center gap-4 sm:gap-6">
          {[
            { to: "/", text: "Home" },
            { to: "/local", text: "Local" },
            { to: "/entertainment", text: "Entertainment" },
            { to: "/politics", text: "Politics" },
            { to: "/crime", text: "Crime" },
            { to: "/business", text: "Business" },
            { to: "/tech", text: "Tech" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[#111418] text-lg font-medium leading-normal hover:border-b-2 hover:border-red-600 pb-1 transition-all duration-200"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;