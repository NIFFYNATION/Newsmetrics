import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { CrimeArticle } from "../components/CrimeArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import Breadcrumb from "../components/Breadcrumb";
import ArticleSkeletonLoader from '../components/ArticleSkeletonLoader';
import { JsonLd } from 'react-schemaorg';
const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Crime = () => {
  const { currentPosts, currentPage, totalPages, paginate } = usePaginatedPosts(
    "Crime",
    5
  );

  return (
    <>
      <Helmet>
        <title>Crime News - News Metrics</title>
        <meta name="description" content="Latest crime news from News Metrics" />
        <link rel="canonical" href="https://newsmetrics.com/crime" />
      </Helmet>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Crime News - News Metrics",
          "description": "Latest crime news from News Metrics",
          "url": "https://newsmetrics.com/crime"
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Crime News</h1>
        <Breadcrumb
  items={[
    { label: 'Home', link: '/' },
    { label: 'Crime News' },
  ]}
/>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-6">
              {currentPosts.map((post) => (
                <Suspense key={post.id} fallback={<ArticleSkeletonLoader />}>
                <CrimeArticle 
                  {...post} 
                  comments={post.comments || []} 
                  relatedArticles={post.relatedArticles || []}
                />
              </Suspense>
              ))}
              <Suspense fallback={<div className="w-3/4 mx-auto h-32 bg-gray-200 rounded animate-pulse"></div>}>
                <div className="w-3/4 mx-auto">
                  <LazyAdvertisement isHomePage={false} />
                </div>
              </Suspense>
            </div>
            <nav aria-label="Crime news pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </nav>
            <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse"></div>}>
              <LazyRandomPostsGrid />
            </Suspense>
          </Suspense>
        </ErrorBoundary>
      </main>
      <ScrollUpBar />
    </>
  );
};

export default Crime;
