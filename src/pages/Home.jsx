import React, { Suspense, lazy } from 'react';
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import LatestPosts from "../components/LatestPosts";
import FeaturedArticle from "../components/FeaturedArticle";
import Pagination from "../components/Pagination";
import Advertisement from "../components/Advertisement";
import { samplePosts } from "../utils/sampleposts";

const LazyAdvertisement = lazy(() => import('../components/Advertisement'));
const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

const getRecommendedPosts = (posts) => {
  const recentPosts = posts.slice(0, 2); // Get the 2 most recent posts
  const randomPosts = posts
    .filter((post) => !recentPosts.includes(post))
    .sort(() => 0.5 - Math.random())
    .slice(0, 2); // Get 2 random posts

  return [...recentPosts, ...randomPosts];
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
          )) ||
        (post.content &&
          post.content.some((paragraph) =>
            paragraph.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
    setFilteredPosts(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>News Metrics - Latest News and Featured Articles</title>
        <meta
          name="description"
          content="Stay informed with News Metrics. Read the latest news, featured articles, and trending stories across technology, business, entertainment, politics, and more."
        />
        <meta name="keywords" content="news, latest news, featured articles, technology, business, entertainment, politics" />
        <meta property="og:title" content="News Metrics - Latest News and Featured Articles" />
        <meta property="og:description" content="Stay informed with News Metrics. Read the latest news, featured articles, and trending stories across various categories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/path-to-your-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News Metrics - Latest News and Featured Articles" />
        <meta name="twitter:description" content="Stay informed with News Metrics. Read the latest news, featured articles, and trending stories across various categories." />
        <meta name="twitter:image" content="/path-to-your-logo.png" />
        <link rel="canonical" href={window.location.href} />
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <HeroSection latestPosts={sortedPosts} />

            <div className="flex flex-col lg:flex-row gap-6">
              <main className="flex-grow lg:w-2/3">
                <LatestPosts posts={sortedPosts.slice(0, 6)} />
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
              <aside className="lg:w-1/3 space-y-6">
                <Suspense fallback={<div>Loading advertisement...</div>}>
                  <LazyAdvertisement isHomePage={true} />
                </Suspense>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">Recommended for You</h2>
                  <ul className="space-y-2">
                    {getRecommendedPosts(sortedPosts).map((post) => (
                      <li key={post.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <Link to={`/article/${post.id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden sm:block">
                  <Suspense fallback={<div>Loading advertisement...</div>}>
                    <LazyAdvertisement isHomePage={true} />
                  </Suspense>
                </div>
              </aside>
            </div>
            <div className="w-full sm:w-3/4 mx-auto">
              <Suspense fallback={<div>Loading advertisement...</div>}>
                <LazyAdvertisement isHomePage={false} />
              </Suspense>
            </div>
            <Suspense fallback={<div>Loading more stories...</div>}>
              <LazyRandomPostsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
