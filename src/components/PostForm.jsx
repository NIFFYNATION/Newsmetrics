import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { samplePosts } from "../utils/sampleposts";

const PostForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    category: '',
    author: '',
    description: '',
    content: '',
    image: '',
  });

  const categories = [
    "Local",
    "Entertainment",
    "Politics",
    "Crime",
    "Business",
    "Tech",
    "Environment",
    "Lifestyle"
  ];

  useEffect(() => {
    if (isEditing && id) {
      const existingPost = samplePosts.find(p => p.id === parseInt(id));
      if (existingPost) {
        setPost(existingPost);
      }
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend API
    console.log('Submitting post:', post);
    // Redirect to admin dashboard after submission
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">Category</label>
        <select
          id="category"
          name="category"
          value={post.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block mb-2">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2">Content</label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
          rows="10"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={post.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
         
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isEditing ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;







