import React, { Suspense, lazy } from 'react';
import { Helmet } from "react-helmet-async";
import { LocalArticle } from "../components/LocalArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import Breadcrumb from '../components/Breadcrumb';
import ArticleSkeletonLoader from '../components/ArticleSkeletonLoader';
import { JsonLd } from 'react-schemaorg';


const LazyAdvertisement = lazy(() => import('../components/Advertisement'));
const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

const Local = () => {
  const { currentPosts, currentPage, totalPages, paginate } = usePaginatedPosts("Local", 5);

  return (
    <>
      <Helmet>
        <title>Local News - News Metrics</title>
        <meta name="description" content="Local news from News Metrics" />
        <link rel="canonical" href="https://newsmetrics.com/local" />
      </Helmet>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Local News - News Metrics",
          "description": "Local news from News Metrics",
          "url": "https://newsmetrics.com/local"
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Local News</h1>
        <Breadcrumb
          items={[
            { label: 'Home', link: '/' },
            { label: 'Local News' },
          ]}
        />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-6">
                {currentPosts.map((post) => (
                <Suspense key={post.id} fallback={<ArticleSkeletonLoader />}>
                <LocalArticle 
                  {...post} 
                  comments={post.comments || []} 
                  relatedArticles={post.relatedArticles || []}
                />
              </Suspense>
              ))} 
            </div>
            <Suspense fallback={<div className="w-3/4 mx-auto h-32 bg-gray-200 rounded animate-pulse"></div>}>
              <div className="w-3/4 mx-auto">
                <LazyAdvertisement isHomePage={false} />
              </div>
            </Suspense> 
            <nav aria-label="Local news pagination">
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

export default Local;
