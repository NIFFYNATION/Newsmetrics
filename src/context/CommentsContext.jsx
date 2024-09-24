import React, { createContext, useState, useContext, useEffect } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
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
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);