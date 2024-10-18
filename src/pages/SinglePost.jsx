import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SinglePostArticle from "../components/SinglePostArticle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import React, { Suspense, lazy } from 'react';
import ScrollUpBar from "../components/ScrollUpBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { slugify } from '../utils/slugify';



const LazyRandomPostsGrid = lazy(() => import('../components/RandomPostsGrid'));

function SinglePost() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          const correctSlug = slugify(postData.title);
          
          if (slug !== correctSlug) {
            navigate(`/article/${id}/${correctSlug}`, { replace: true });
            return;
          }

          setPost({
            id: postDoc.id,
            ...postData,
            date: postData.date ? postData.date.toDate() : new Date()
          });
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load the post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - News Metrics</title>
        <meta name="description" content={post.description} />
      </Helmet>
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
