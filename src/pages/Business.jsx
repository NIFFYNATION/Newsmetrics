import React, { Suspense, lazy } from "react";
// import { Helmet } from "react-helmet-async";
import { BusinessArticle } from "../components/BusinessArticle";
import Pagination from "../components/Pagination";
import { usePostsQuery } from "../hooks/usePostsQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBoundary from "../components/ErrorBoundary";
import Breadcrumb from "../components/Breadcrumb";
import ArticleSkeletonLoader from "../components/ArticleSkeletonLoader";
import { JsonLd } from "react-schemaorg";

const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Business = () => {
  const { data: posts, isLoading, error } = usePostsQuery("Business", 5);

  const parsedPosts = posts?.map((post) => ({
    ...post,
    date: post.date ? new Date(post.date.seconds * 1000) : null,
  }));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <>
        <title>Business News - News Metrics</title>
        <meta
          name="description"
          content="Latest business news from News Metrics"
        />
        <link rel="canonical" href="https://newsmetrics.ng/business" />
        <meta property="og:title" content="Business News - News Metrics" />
        <meta
          property="og:description"
          content="Latest business news from News Metrics"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://newsmetrics.ng/business" />
        <meta
          property="og:image"
          content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v4/newsmetrics.ng/NewsMetrics/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F56188dc2-e3c3-4ce5-a8b1-1323953e37b9.jpg%3Ftoken%3DhOY-wLL-tV2Wb6eqlpzb3hUOqYMZbXQ3az2flBDqaSs%26height%3D800%26width%3D1200%26expires%3D33251249770/og.png"
        />
      </>
      <JsonLd
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Business News - News Metrics",
          description: "Latest business news from News Metrics",
          url: "https://newsmetrics.ng/business",
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8 ">Business News</h1>
        <Breadcrumb
          items={[{ label: "Home", link: "/" }, { label: "Business News" }]}
        />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <section aria-label="Business articles">
              <ul className="space-y-6">
                {parsedPosts && parsedPosts.length > 0 ? (
                  parsedPosts.map((post) => (
                    <li key={post.id}>
                      <Suspense fallback={<ArticleSkeletonLoader />}>
                        <BusinessArticle
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
                <Suspense
                  fallback={
                    <div className="w-3/4 mx-auto h-32 bg-gray-200 rounded animate-pulse"></div>
                  }
                >
                  <div className="w-3/4 mx-auto">
                    <LazyAdvertisement isHomePage={false} />
                  </div>
                </Suspense>
              </div>
            </section>
            <nav aria-label="Business news pagination">
              <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={() => {}}
              />
            </nav>
            <section aria-label="Random posts">
              <Suspense
                fallback={
                  <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                }
              >
                <LazyRandomPostsGrid />
              </Suspense>
            </section>
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default Business;
