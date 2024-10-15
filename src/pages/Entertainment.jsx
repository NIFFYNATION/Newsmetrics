import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { EntertainmentArticle } from "../components/EntertainmentArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Entertainment = () => {
  const { currentPosts, currentPage, totalPages, paginate } = usePaginatedPosts(
    "Entertainment",
    5
  );

  return (
    <>
      <Helmet>
        <title>Entertainment News - News Metrics</title>
        <meta name="description" content="Latest entertainment news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Entertainment News</h1>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-6">
              {currentPosts.map((post) => (
                <EntertainmentArticle key={post.id} {...post} comments={post.comments || []} />
              ))}
              <div className="w-3/4 mx-auto">
                <LazyAdvertisement isHomePage={false} />
              </div>
            </div>
            <nav aria-label="Entertainment news pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </nav>
            <LazyRandomPostsGrid />
          </Suspense>
        </ErrorBoundary>
      </div>
      <ScrollUpBar />
    </>
  );
};

export default Entertainment;
