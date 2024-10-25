import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SinglePostArticle from "../components/SinglePostArticle";
import React, { Suspense, lazy } from 'react';
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { getPostBySlug } from '../services/firebase';
import ArticleStructuredData from '../components/ArticleStructuredData';
import { getImageUrl } from '../utils/imageUtils';

const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (err) {
        setError("Failed to load the article. Please try again later.");
      }
    };

    fetchPost();
  }, [slug]);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // Generate a dynamic meta description
  const generateMetaDescription = (content) => {
    // Remove HTML tags and trim to 155 characters
    const plainText = content.replace(/<[^>]+>/g, '');
    return plainText.length > 155 ? plainText.substring(0, 152) + '...' : plainText;
  };

  const metaDescription = generateMetaDescription(post.content);

  return (
    <>
      <Helmet>
        <title>{post.metaTitle || post.title} - News Metrics</title>
        <meta name="description" content={post.metaDescription || metaDescription} />
        <meta property="og:title" content={`${post.metaTitle || post.title} - News Metrics`} />
        <meta property="og:description" content={post.metaDescription || metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={getImageUrl(post.image)} />
        <meta property="og:url" content={`https://newsmetrics.ng/article/${post.id}`} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta name="keywords" content={post.keywords ? post.keywords.join(', ') : ''} />
      </Helmet>
      <ArticleStructuredData article={post} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SinglePostArticle {...post} comments={post.comments || []} />
        <div className="mt-12">
          <Suspense fallback={<LoadingSpinner />}>
            <LazyRandomPostsGrid />
          </Suspense>
        </div>
      </main>
      <ScrollUpBar />
    </>
  );
}

export default SinglePost;
