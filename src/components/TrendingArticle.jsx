import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ArticleStructuredData from "./ArticleStructuredData";
import axios from 'axios';

const TrendingArticle = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/trending-articles');
      setTrendingArticles(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch trending articles');
      console.error('Error fetching trending articles:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingArticles();
  }, [fetchTrendingArticles]);

  if (isLoading) {
    return <div aria-live="polite">Loading trending articles...</div>;
  }

  if (error) {
    return <div aria-live="assertive">Error: {error}</div>;
  }

  if (!Array.isArray(trendingArticles) || trendingArticles.length === 0) {
    return <div>No trending articles available at the moment.</div>;
  }

  return (
    <section aria-label="Trending Articles">
      {trendingArticles.map((article) => (
        <article key={article.id} className="trending-article">
          <ArticleStructuredData article={article} />
          <Link
            to={`/article/${article.id}`}
            className="block hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={article.image}
                  alt={`Thumbnail for ${article.title}`}
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                    {article.title}
                  </h2>
                  <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
                    {article.category}
                  </p>
                  <time 
                    dateTime={article.date}
                    className="text-[#637588] text-xs font-normal leading-normal"
                  >
                    {format(new Date(article.date), "MMM d, yyyy • h:mm a")}
                  </time>
                </div>
              </div>
              <div className="shrink-0">
                <span className="sr-only">Read more about {article.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden="true"
                >
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                </svg>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
};

export default TrendingArticle;
