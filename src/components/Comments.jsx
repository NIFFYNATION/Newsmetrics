import React, { useState } from 'react';
import { useFirebaseComments } from '../hooks/useFirebaseComments';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import { format } from 'date-fns';

const Comments = ({ postId }) => {
  const { comments, loading, addComment } = useFirebaseComments(postId);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        content: newComment,
        author: 'User', // Replace with user authentication later
      };
      addComment(comment);
      setNewComment('');
      setCurrentPage(1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-8 pb-8">
      <h2 className="text-2xl px-4 font-bold mb-4">Comments ({comments.length})</h2>
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
          className="mt-2 px-4 mx-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {currentComments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded">
            <p className="mb-2">{comment.content}</p>
            <p className="text-sm text-gray-600">
              By {comment.author} on {comment.date instanceof Date 
                ? format(comment.date, "MMMM d, yyyy • h:mm a")
                : comment.date && comment.date.toDate 
                  ? format(comment.date.toDate(), "MMMM d, yyyy • h:mm a")
                  : "Date unavailable"}
            </p>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Comments;
