import { useState, useEffect } from 'react';
import { samplePosts } from "../utils/sampleposts";

const usePaginatedPosts = (category, postsPerPage) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filteredPosts = samplePosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    setPosts(filteredPosts);
  }, [category]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return { currentPosts, currentPage, totalPages, paginate };
};

export default usePaginatedPosts;
