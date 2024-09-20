import React, { Suspense, lazy } from 'react';
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import TechArticle from "../components/TechArticle";
import Pagination from "../components/Pagination";
import { samplePosts } from "../utils/sampleposts";

const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

const Tech = () => {
  const [techPosts, setTechPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const filteredPosts = samplePosts.filter(post => post.category.toLowerCase() === "tech");
    setTechPosts(filteredPosts);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = techPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(techPosts.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>Tech News - News Metrics</title>
        <meta name="description" content="Technology news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Tech News</h1>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <TechArticle key={post.id} {...post} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
        <Suspense fallback={<div>Loading more stories...</div>}>
          <LazyRandomPostsGrid />
        </Suspense>
      </div>
    </>
  );
};

export default Tech;