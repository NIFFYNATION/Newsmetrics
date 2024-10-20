import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgStorage } from "../services/firebase";
import imageCompression from 'browser-image-compression';
import { useAuth } from '../context/index';

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [matchError, setMatchError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Reset password match error if password changes
    if (name === "password" || name === "confirmPassword") {
      setMatchError(
        formData.password !== value && name === "confirmPassword"
          ? "Passwords do not match."
          : null
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.username.trim()) {
      setError("Please enter your full name.");
      isValid = false;
    } else if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      isValid = false;
    } else if (!formData.password.trim()) {
      setError("Please enter a password.");
      isValid = false;
    } else {
      setError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      if (formData.profilePicture) {
        const storageRef = ref(imgStorage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, formData.profilePicture);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(user, {
          displayName: formData.username,
          photoURL: photoURL,
        });
      } else {
        await updateProfile(user, {
          displayName: formData.username,
        });
      }

      // Log in the user after successful registration
      await loginUser(formData.email, formData.password);

      // Redirect to admin page
      navigate("/admin");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    }
  };

  const handleProfilePicChange = async (e) => {
    if (e.target.files[0]) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp' // Convert to WebP format
        };
        const compressedFile = await imageCompression(e.target.files[0], options);
        setFormData(prevData => ({ ...prevData, profilePicture: compressedFile }));
      } catch (error) {
        console.error("Error compressing profile picture:", error);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  placeholder="Full name"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Password"
                  maxLength={12}
                  minLength={6}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Confirm Password"
                  maxLength={12}
                  minLength={6}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium leading-6 text-gray-900">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You have account already?
            <Link
              to="/adminlogin"
              className="font-semibold leading-6 text-red-600 hover:text-red-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
