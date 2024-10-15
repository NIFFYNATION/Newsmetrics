import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgStorage } from "../services/firebase";
import imageCompression from 'browser-image-compression';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [matchError, setMatchError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);

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

    if (!formData.name.trim()) {
      setMatchError("Please enter your full name.");
      isValid = false;
    } else {
      setMatchError(null); // Clear error if previously set for full name
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setMatchError("Please enter a valid email address.");
      isValid = false;
    } else {
      setMatchError(null); // Clear error if previously set for email
    }

    if (!formData.password.trim()) {
      setMatchError("Please enter a password.");
      isValid = false;
    } else {
      setMatchError(null); // Clear error if previously set for password
    }

    // if (formData.password !== formData.confirmPassword) {
    //   setMatchError("Passwords do not match.");
    //   isValid = false;
    // } else {
    //   setMatchError(null); // Clear error if previously set for password confirmation
    // }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      let photoURL = '';
      if (profilePic) {
        const storageRef = ref(imgStorage, `profile_pictures/${userCredential.user.uid}`);
        await uploadBytes(storageRef, profilePic);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(userCredential.user, { 
        displayName: formData.name,
        photoURL: photoURL
      });

      console.log("Registration successful:", userCredential.user);
      setSubmitMessage("Registration successful!");
      setTimeout(() => {
        setSubmitMessage(null);
        navigate("/admin");
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error);
      setMatchError("Registration failed. " + error.message);
    }
  };

  const handleProfilePicChange = async (e) => {
    if (e.target.files[0]) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(e.target.files[0], options);
        setProfilePic(compressedFile);
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
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  placeholder="Full name"
                  id="name"
                  name="name"
                  value={formData.name}
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
            {matchError && <p style={{ color: "red" }}>{matchError}</p>}
            {submitMessage && (
              <p className="text-center text-green-500">{submitMessage}</p>
            )}
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