import { useQuery } from 'react-query';
import { fetchPosts } from '../services/firebase';

export const usePostsQuery = (category, limit) => {
  return useQuery(['posts', category, limit], () => fetchPosts(category, limit), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};