import React, { useState } from 'react';
import { useComments } from '../context/CommentsContext';

const Comments = ({ postId, comments: initialComments }) => {
  const { comments, addComment } = useComments();
  const [newComment, setNewComment] = useState('');

  const postComments = comments[postId] || [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        author: 'Anonymous', // Replace with user authentication later
        date: new Date().toISOString(),
      };
      addComment(postId, comment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments ({postComments.length})</h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Write a comment..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {postComments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded">
            <p className="mb-2">{comment.content}</p>
            <p className="text-sm text-gray-600">
              By {comment.author} on {new Date(comment.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;