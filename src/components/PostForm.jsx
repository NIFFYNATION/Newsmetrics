import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, imgStorage, auth } from "../services/firebase";
import imageCompression from 'browser-image-compression';

const PostForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [post, setPost] = useState({
    title: "",
    category: "",
    author: "",
    description: "",
    content: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    date: null,
  });

  const [imageFile, setImageFile] = useState(null);

  const categories = [
    "Local",
    "Entertainment",
    "Politics",
    "Crime",
    "Business",
    "Tech",
    "Environment",
    "Lifestyle",
  ];

  useEffect(() => {
    if (isEditing && id) {
      const fetchPost = async () => {
        const postsCollectionRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollectionRef);
        const existingPost = querySnapshot.docs
          .find((doc) => doc.id === id)
          ?.data();
        if (existingPost) {
          setPost(existingPost);
        }
      };
      fetchPost();
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content) => {
    setPost({ ...post, content });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);
        setPost({ ...post, image: URL.createObjectURL(compressedFile) });
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const uploadImage = async (file, folder = 'post_images') => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      const storageRef = ref(imgStorage, `${folder}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postsCollectionRef = collection(db, "posts");
    try {
      let imageUrl = post.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const processedContent = await processContent(post.content);

      const currentUser = auth.currentUser;
      const postData = {
        title: post.title,
        category: post.category,
        author: post.author,
        authorImage: currentUser.photoURL || '',
        description: post.description,
        content: post.content,
        image: imageUrl,
        // date: serverTimestamp(),
        date: isEditing ? post.date : serverTimestamp(),
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.description,
        keywords: post.keywords.split(',').map(keyword => keyword.trim()),
      };

      if (isEditing && id) {
        const postDoc = doc(db, "posts", id);
        await updateDoc(postDoc, postData);
      } else {
        await addDoc(postsCollectionRef, postData);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };
          const compressedFile = await imageCompression(file, options);
          const imageUrl = await uploadImage(compressedFile);
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageUrl);
          quill.formatText(range.index, 1, { 
            'class': 'article-content',
            'alt': file.name 
          });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  }, []);

  const handleLink = useCallback(() => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    if (range) {
      const value = prompt('Enter the URL');
      if (value) {
        quill.format('link', value);
        quill.formatText(range.index, range.length, 'color', 'blue');
      } else {
        quill.format('link', false);
      }
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const quillRef = useRef();

  const processContent = async (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');

    for (let img of images) {
      if (img.src.startsWith('blob:') || img.src.startsWith('data:')) {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        const newSrc = await uploadImage(file);
        img.src = newSrc;
      }
    }

    return doc.body.innerHTML;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={post.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block mb-2">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2">
          Content
        </label>
        <ReactQuill
          ref={quillRef}
          value={post.content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          className="bg-white article-content"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">
          Post Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="w-full px-3 py-2 border rounded"
        />
        {post.image && (
          <img
            src={post.image}
            alt="Post preview"
            className="mt-2 max-w-full h-auto"
          />
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="metaTitle" className="block mb-2">
          Meta Title
        </label>
        <input
          type="text"
          id="metaTitle"
          name="metaTitle"
          value={post.metaTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="metaDescription" className="block mb-2">
          Meta Description
        </label>
        <textarea
          id="metaDescription"
          name="metaDescription"
          value={post.metaDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="keywords" className="block mb-2">
          Keywords (comma-separated)
        </label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          value={post.keywords}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isEditing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
