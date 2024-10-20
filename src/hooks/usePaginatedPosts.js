import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../services/firebase';

const usePaginatedPosts = (category, postsPerPage) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [category, currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsCollection = collection(db, 'posts');
      let q = query(
        postsCollection,
        where('category', '==', category),
        orderBy('date', 'desc'),
        limit(postsPerPage)
      );

      if (lastVisible && currentPage > 1) {
        q = query(q, startAfter(lastVisible));
      }

      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date()
      }));

      setPosts(prevPosts => currentPage === 1 ? fetchedPosts : [...prevPosts, ...fetchedPosts]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === postsPerPage);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber > currentPage && hasMore) {
      setCurrentPage(pageNumber);
    } else if (pageNumber < currentPage) {
      setPosts([]);
      setLastVisible(null);
      setCurrentPage(1);
    }
  };

  return { posts, currentPage, totalPages: Math.ceil(posts.length / postsPerPage), paginate, loading, error, hasMore };
};

export default usePaginatedPosts;
