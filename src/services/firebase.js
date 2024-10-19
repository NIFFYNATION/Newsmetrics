// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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

export const getPostById = async (id) => {
  try {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
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
    console.error("Error fetching post:", error);
    throw error;
  }
};

export { db, app, analytics, auth, imgStorage };
