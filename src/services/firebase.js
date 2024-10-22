// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { orderBy, limit } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBma-dm-g7-ciBBJVjTSTKbHSWNSrd5T_A",
  authDomain: "newsmetrics-3173e.firebaseapp.com",
  projectId: "newsmetrics-3173e",
  storageBucket: "newsmetrics-3173e.appspot.com",
  messagingSenderId: "565730784856",
  appId: "1:565730784856:web:fe2af5a7e29163da23fc2d",
  measurementId: "G-9W6S8HBQBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const imgStorage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const getPostBySlug = async (slug) => {
  try {
    const postsCollectionRef = collection(db, "posts");
    const q = query(postsCollectionRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const postData = docSnap.data();
      return {
        id: docSnap.id,
        ...postData,
        metaTitle: postData.metaTitle || postData.title,
        metaDescription: postData.metaDescription || postData.description,
        keywords: postData.keywords || []
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw error;
  }
};

export const fetchPosts = async (category, postLimit) => {
  const postsRef = collection(db, 'posts');
  const q = query(
    postsRef,
    where('category', '==', category),
    orderBy('date', 'desc'),
    limit(postLimit)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { db, app, analytics, auth, imgStorage };
