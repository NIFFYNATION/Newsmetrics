import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { PoliticsArticle } from "../components/PoliticsArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import Breadcrumb from "../components/Breadcrumb";
import { JsonLd } from 'react-schemaorg';
import ArticleSkeletonLoader from '../components/ArticleSkeletonLoader';


const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Politics = () => {
  const { posts, currentPage, totalPages, paginate, loading, error } = usePaginatedPosts("Politics", 5);

  return (
    <>
      <Helmet>
        <title>Politics News - News Metrics</title>
        <meta name="description" content="Latest politics news from News Metrics" />
        <link rel="canonical" href="https://newsmetrics.com/politics" />
      </Helmet>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Politics News - News Metrics",
          "description": "Latest politics news from News Metrics",
          "url": "https://newsmetrics.com/politics"
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Politics News</h1>
        <Breadcrumb
  items={[
    { label: 'Home', link: '/' },
    { label: 'Politics News' },
  ]}
/>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-6">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Suspense key={post.id} fallback={<ArticleSkeletonLoader />}>
                    <PoliticsArticle 
                      {...post} 
                      comments={post.comments || []} 
                      relatedArticles={post.relatedArticles || []}
                    />
                  </Suspense>
                ))
              ) : (
                <p>No posts available.</p>
              )}
                <Suspense fallback={<div className="w-3/4 mx-auto h-32 bg-gray-200 rounded animate-pulse"></div>}>
                <div className="w-3/4 mx-auto">
                  <LazyAdvertisement isHomePage={false} />
                </div>
              </Suspense>
            </div>
            <nav aria-label="Politics news pagination">
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

export default Politics;
