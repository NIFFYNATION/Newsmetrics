import React from 'react';
import { Helmet } from "react-helmet-async";
import PostForm from '../components/PostForm';

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create New Post - News Metrics</title>
        <meta name="description" content="Create a new post for News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-center font-bold mb-8">Create New Post</h1>
        <PostForm />
      </div>
    </>
  );
};

export default CreatePost;