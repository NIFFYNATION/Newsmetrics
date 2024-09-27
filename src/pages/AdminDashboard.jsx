import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { samplePosts } from "../utils/sampleposts";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch posts from an API
    setPosts(samplePosts);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - News Metrics</title>
        <meta name="description" content="Admin dashboard for News Metrics" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="mb-8">
          <Link to="/admin/create-post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Post
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="py-2 px-4 border-b">{post.title}</td>
                <td className="py-2 px-4 border-b">{post.category}</td>
                <td className="py-2 px-4 border-b">{post.author}</td>
                <td className="py-2 px-4 border-b">{new Date(post.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/admin/edit-post/${post.id}`} className="text-blue-500 hover:text-blue-700 mr-2">Edit</Link>
                  <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;