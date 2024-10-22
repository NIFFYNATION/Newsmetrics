import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';

export const useFirebaseComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  const addComment = async (newComment) => {
    const docRef = await addDoc(collection(db, 'comments'), {
      ...newComment,
      postId,
      date: new Date()  // Store as a Firestore timestamp
    });
    setComments(prevComments => [{id: docRef.id, ...newComment, date: new Date()}, ...prevComments]);
  };

  const deleteComment = async (commentId) => {
    await deleteDoc(doc(db, 'comments', commentId));
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  };

  return { comments, loading, addComment, deleteComment };
};
