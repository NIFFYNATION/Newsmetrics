import React, { createContext, useState, useContext, useEffect } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});
  const [commentCounts, setCommentCounts] = useState({});

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    const storedCommentCounts = localStorage.getItem('commentCounts');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
    if (storedCommentCounts) {
      setCommentCounts(JSON.parse(storedCommentCounts));
    }
  }, []);

  const addComment = (postId, comment) => {
    setComments(prevComments => {
      const updatedComments = {
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), comment]
      };
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      return updatedComments;
    });

    setCommentCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [postId]: (prevCounts[postId] || 0) + 1
      };
      localStorage.setItem('commentCounts', JSON.stringify(updatedCounts));
      return updatedCounts;
    });
  };

  const getCommentCount = (postId) => {
    return commentCounts[postId] || 0;
  };

  return (
    <CommentsContext.Provider value={{ comments, commentCounts, addComment, getCommentCount }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);