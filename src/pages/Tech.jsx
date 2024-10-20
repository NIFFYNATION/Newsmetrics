import React, { Suspense, lazy } from 'react';
import { Helmet } from "react-helmet-async";
import { TechArticle } from "../components/TechArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import Breadcrumb from '../components/Breadcrumb';
import { JsonLd } from 'react-schemaorg';
import ArticleSkeletonLoader from '../components/ArticleSkeletonLoader';

const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Tech = () => {
  const { posts, currentPage, totalPages, paginate, loading, error } = usePaginatedPosts("Tech", 5);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Tech News - News Metrics</title>
        <meta name="description" content="Latest technology news from News Metrics" />
        <link rel="canonical" href="https://newsmetrics.com/tech" />
      </Helmet>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Tech News - News Metrics",
          "description": "Latest technology news from News Metrics",
          "url": "https://newsmetrics.com/tech"
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Tech News</h1>
        <Breadcrumb
          items={[
            { label: 'Home', link: '/' },
            { label: 'Tech News' },
          ]}
        />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-6">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Suspense key={post.id} fallback={<ArticleSkeletonLoader />}>
                    <TechArticle 
                    {...post} 
                    comments={post.comments || []} 
                    relatedArticles={post.relatedArticles || []}
                  />
                  </Suspense>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
            <Suspense fallback={<div className="w-3/4 mx-auto h-32 bg-gray-200 rounded animate-pulse"></div>}>
              <div className="w-3/4 mx-auto">
                <LazyAdvertisement isHomePage={false} />
              </div>
            </Suspense>
            <nav aria-label="Tech news pagination">
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

export default Tech;
