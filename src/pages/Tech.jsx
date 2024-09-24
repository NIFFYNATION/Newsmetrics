import React, { Suspense, lazy } from 'react';
import { Helmet } from "react-helmet-async";
import TechArticle from "../components/TechArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";

const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

const Tech = () => {
  const { currentPosts, currentPage, totalPages, paginate } = usePaginatedPosts("tech", 5);

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
            <TechArticle key={post.id} {...post} comments={post.comments || []}/>
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