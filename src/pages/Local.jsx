import React, { Suspense, lazy } from 'react';
import { Helmet } from "react-helmet-async";
import {LocalArticle} from "../components/LocalArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import ScrollUpBar from "../components/ScrollUpBar";
const LazyAdvertisement = lazy(() => import('../components/Advertisement'));
const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

const Local = () => {
  const { currentPosts, currentPage, totalPages, paginate } = usePaginatedPosts("local", 5);

  return (
    <>
      <Helmet>
        <title>Local News - News Metrics</title>
        <meta name="description" content="Local news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Local News</h1>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <LocalArticle key={post.id} {...post} comments={post.comments || []}/>
          ))}
          <div className="w-3/4 mx-auto">
            <Suspense fallback={<div>Loading advertisement...</div>}>
              <LazyAdvertisement isHomePage={false} />
            </Suspense>
          </div>
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
      <ScrollUpBar />
    </>
  );
};

export default Local;
