import React from 'react';
import { Helmet } from "react-helmet-async";
import PostForm from '../components/PostForm';

const EditPost = () => {
  return (
    <>
      <Helmet>
        <title>Edit Post - News Metrics</title>
        <meta name="description" content="Edit an existing post on News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <PostForm isEditing={true} />
      </div>
    </>
  );
};

export default EditPost;