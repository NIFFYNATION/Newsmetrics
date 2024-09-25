import React, { Suspense, lazy } from 'react';
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { EntertainmentArticle } from "../components/EntertainmentArticle";
import Pagination from "../components/Pagination";
import { samplePosts } from "../utils/sampleposts";

const LazyAdvertisement = lazy(() => import('../components/Advertisement'));
const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

const Entertainment = () => {
  const [entertainmentPosts, setEntertainmentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const filteredPosts = samplePosts.filter(post => post.category.toLowerCase() === "entertainment");
    setEntertainmentPosts(filteredPosts);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = entertainmentPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(entertainmentPosts.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>Entertainment News - News Metrics</title>
        <meta name="description" content="Entertainment news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Entertainment News</h1>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <EntertainmentArticle key={post.id} {...post} comments={post.comments || []}/>
          ))}
          <div className="w-3/4 mx-auto">
            <Suspense fallback={<div aria-live="polite">Loading advertisement...</div>}>
              <LazyAdvertisement isHomePage={false} />
            </Suspense>
          </div>
        </div>
        <nav aria-label="Entertainment news pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </nav>
        <Suspense fallback={<div aria-live="polite">Loading more stories...</div>}>
          <section aria-label="More stories">
            <LazyRandomPostsGrid />
          </section>
        </Suspense>
      </div>
    </>
  );
};

export default Entertainment;