import React, { Suspense, lazy } from 'react';
import { Helmet } from "react-helmet-async";
import { TechArticle } from "../components/TechArticle";
import Pagination from "../components/Pagination";
import { usePostsQuery } from '../hooks/usePostsQuery';
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import Breadcrumb from '../components/Breadcrumb';
import { JsonLd } from 'react-schemaorg';
import ArticleSkeletonLoader from '../components/ArticleSkeletonLoader';

const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Tech = () => {
  const { data: posts, isLoading, error } = usePostsQuery('Tech', 5);
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
        <title>Tech News - News Metrics</title>
        <meta name="description" content="Latest technology news from News Metrics" />
        <link rel="canonical" href="https://newsmetrics.ng/tech" />
        <meta property="og:title" content="Tech News - News Metrics" />
        <meta property="og:description" content="Latest technology news from News Metrics" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://newsmetrics.ng/tech" />
        <meta
          property="og:image"
          content="https://newsmetrics.ng/favicon.svg"
        />
      </Helmet>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Tech News - News Metrics",
          "description": "Latest technology news from News Metrics",
          "url": "https://newsmetrics.ng/tech"
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
            <section aria-label="Tech articles">
              <ul className="space-y-6">
                {parsedPosts && parsedPosts.length > 0 ? (
                  parsedPosts.map((post) => (
                    <li key={post.id}>
                      <Suspense fallback={<ArticleSkeletonLoader />}>
                        <TechArticle 
                          {...post} 
                          comments={post.comments || []} 
                          relatedArticles={post.relatedArticles || []}
                        />
                      </Suspense>
                    </li>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </ul>
              <div className="w-3/4 mx-auto my-6">
                <Suspense fallback={<div className="w-3/4 mx-auto h-32 bg-gray-200 rounded animate-pulse"></div>}>
                  <div className="w-3/4 mx-auto">
                    <LazyAdvertisement isHomePage={false} />
                  </div>
                </Suspense>
              </div>
            </section>
            <nav aria-label="Tech news pagination">
              <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={() => {}}
              />
            </nav>
            <section aria-label="Random posts">
              <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse"></div>}>
                <LazyRandomPostsGrid />
              </Suspense>
            </section>
          </Suspense>
        </ErrorBoundary>
      </main>
      <ScrollUpBar />
    </>
  );
};

export default Tech;
