import { Link } from "react-router-dom";
import { format } from "date-fns";

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
export default LatestPosts;
