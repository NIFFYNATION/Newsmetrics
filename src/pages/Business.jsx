import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import {BusinessArticle} from "../components/BusinessArticle";
import Pagination from "../components/Pagination";
import usePaginatedPosts from "../hooks/usePaginatedPosts";

const LazyAdvertisement = lazy(() => import("../components/Advertisement"));
const LazyRandomPostsGrid = lazy(() => import("../components/RandomPostsGrid"));

const Business = () => {
  const { currentPosts, currentPage, totalPages, paginate } = usePaginatedPosts(
    "Business",
    5
  );

  return (
    <>
      <Helmet>
        <title>Entertainment News - News Metrics</title>
        <meta name="description" content="Business news from News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Business News</h1>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <BusinessArticle key={post.id} {...post} comments={post.comments || []} />
          ))}
          <div className="w-3/4 mx-auto">
            <Suspense
              fallback={<div aria-live="polite">Loading advertisement...</div>}
            >
              <LazyAdvertisement isHomePage={false} />
            </Suspense>
          </div>
        </div>
        <nav aria-label="Business news pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </nav>
        <Suspense
          fallback={<div aria-live="polite">Loading more stories...</div>}
        >
          <section aria-label="More stories">
            <LazyRandomPostsGrid />
          </section>
        </Suspense>
      </div>
    </>
  );
};

export default Business;
