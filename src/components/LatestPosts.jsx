import { Link } from "react-router-dom";
import { format, isValid, formatDistanceToNow } from "date-fns";
import { slugify } from '../utils/slugify';

const LatestPosts = ({ posts }) => (
  <div className="mb-12 bg-gradient-to-r from-black to-red-600 rounded-lg shadow-lg overflow-hidden border border-gray-200">
    <h2 className="text-3xl font-bold text-white p-6 border-b border-white/20">
      Latest Posts
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {posts.map((post) => {
        const slug = slugify(post.title);
        return (
          <Link key={post.id} to={`/article/${post.id}/${slug}`} className="block group">
            <div className="bg-white rounded-lg overflow-hidden h-full shadow-md transition-transform duration-300 transform group-hover:scale-105 border border-gray-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <time 
                  dateTime={post.date instanceof Date && !isNaN(post.date) ? post.date.toISOString() : ''}
                  className="text-sm text-gray-600"
                >
                  {post.date instanceof Date && !isNaN(post.date)
                    ? `${format(post.date, "MMM d, yyyy • h:mm a")} • ${formatDistanceToNow(post.date)} ago`
                    : "No date"}
                </time>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
);

export default LatestPosts;
