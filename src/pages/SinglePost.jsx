import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SinglePostArticle from "../components/SinglePostArticle";
import Comments from "../components/Comments";
import { samplePosts } from "../utils/sampleposts";
import React, { Suspense, lazy } from 'react';

const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchedPost = samplePosts.find(p => p.id === parseInt(id));
    setPost(fetchedPost);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - News Metrics</title>
        <meta name="description" content={post.description} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SinglePostArticle {...post} comments={post.comments || []} />
        <div className="mt-12">
          <Suspense fallback={<div>Loading related posts...</div>}>
            <LazyRandomPostsGrid />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default SinglePost;