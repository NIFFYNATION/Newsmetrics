import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { CrimeArticle } from "../components/CrimeArticle";
import Pagination from "../components/Pagination";
import { usePostsQuery } from "../hooks/usePostsQuery";
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
  const { data: posts, isLoading, error } = usePostsQuery('Crime', 5);
  const parsedPosts = posts?.map(post => ({
    ...post,
    date: post.date ? new Date(post.date.seconds * 1000) : null
  }));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Crime News - News Metrics</title>
        <meta name="description" content="Latest crime news from News Metrics" />
        <link rel="canonical" href="https://newsmetrics.ng/crime" />
        <meta property="og:title" content="Crime News - News Metrics" />
        <meta property="og:description" content="Latest crime news from News Metrics" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://newsmetrics.ng/crime" />
        <meta property="og:image" content="https://newsmetrics.ng/crime-news-image.jpg" />
      </Helmet>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Crime News - News Metrics",
          "description": "Latest crime news from News Metrics",
          "url": "https://newsmetrics.ng/crime"
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
              {parsedPosts && parsedPosts.length > 0 ? (
                parsedPosts.map((post) => (
                  <Suspense key={post.id} fallback={<ArticleSkeletonLoader />}>
                    <CrimeArticle 
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
            <nav aria-label="Crime news pagination">
              <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={() => {}}
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
