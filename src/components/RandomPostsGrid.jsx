import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../utils/sampleposts";

const RandomPostsGrid = () => {
  const [randomPosts, setRandomPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(4);

  useEffect(() => {
    const shuffled = [...samplePosts].sort(() => 0.5 - Math.random());
    setRandomPosts(shuffled);
  }, []);

  const loadMore = () => {
    setVisiblePosts((prevVisible) => Math.min(prevVisible + 4, randomPosts.length));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Explore More Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {randomPosts.slice(0, visiblePosts).map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-red-600">{post.title}</h3>
<p className="text-sm text-gray-600 mb-2">{post.category}</p>
<p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>
<Link
  to={`/article/${post.id}`}
  className="inline-flex items-center text-red-600 hover:text-red-800 transition duration-300"
>
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {visiblePosts < randomPosts.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300">
            Load More Stories
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomPostsGrid;