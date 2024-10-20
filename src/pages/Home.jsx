import React, { Suspense, lazy, useMemo } from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import LatestPosts from "../components/LatestPosts";
import FeaturedArticle from "../components/FeaturedArticle";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import Advertisement from "../components/Advertisement";
// import { samplePosts } from "../utils/sampleposts";
import ScrollUpBar from "../components/ScrollUpBar";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { slugify } from '../utils/slugify';
const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const getRecommendedPosts = (posts) => {
  const sortedPosts = [...posts].sort((a, b) => b.date - a.date);
  const recentPosts = sortedPosts.slice(0, 2);
  const randomPosts = sortedPosts
    .filter((post) => !recentPosts.includes(post))
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return [...recentPosts, ...randomPosts];
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const snapshot = await getDocs(postsCollection);
        const fetchedPosts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate() || new Date(),
          };
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => b.date - a.date);
  }, [filteredPosts]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, postsPerPage, sortedPosts]);

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
        <meta
          name="keywords"
          content="news, latest news, featured articles, technology, business, entertainment, politics"
        />
        <meta
          property="og:title"
          content="News Metrics - Latest News and Featured Articles"
        />
        <meta
          property="og:description"
          content="Stay informed with News Metrics. Read the latest news, featured articles, and trending stories across various categories."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
        <main className="layout-container flex h-full grow flex-col">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <HeroSection latestPosts={sortedPosts.slice(0, 10)} />
            <div className="flex flex-col lg:flex-row gap-6">
              <section className="flex-grow lg:w-2/3" aria-label="Featured Articles">
                <LatestPosts posts={sortedPosts.slice(0, 6)} />
                <h2 className="text-[#111418] text-2xl font-bold leading-tight tracking-[-0.015em] mb-4 pb-2 border-b border-gray-200">
                  Featured Articles
                </h2>
                <ul className="space-y-6">
                  {currentPosts.map((post) => (
                    <li key={post.id}>
                      <FeaturedArticle {...post} />
                    </li>
                  ))}
                </ul>
                <nav aria-label="Pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginate}
                  />
                </nav>
              </section>
              <aside className="lg:w-1/3 space-y-6" aria-label="Sidebar">
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyAdvertisement isHomePage={true} />
                </Suspense>
                <section className="bg-gray-100 p-4 rounded-xl" aria-labelledby="recommended-heading">
                  <h2 id="recommended-heading" className="text-xl font-bold mb-4 text-indigo-700">
                    Recommended for You
                  </h2>
                  <ul className="space-y-2">
                    {getRecommendedPosts(sortedPosts).map((post) => {
                      const slug = slugify(post.title);
                      return (
                        <li key={post.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                          <Link
                           to={`/article/${slug}`}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                          >
                            {post.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
                <div className="hidden sm:block">
                  <Suspense fallback={<LoadingSpinner />}>
                    <LazyAdvertisement isHomePage={true} />
                  </Suspense>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Posts;
