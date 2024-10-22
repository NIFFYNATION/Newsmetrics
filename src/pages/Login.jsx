import { useState } from "react";
import { Link } from "react-router-dom";
// import { loginUser } from "../services/auth";
// import { loginUser } from "../services/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [matchError, setMatchError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;

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

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Form is invalid, display errors and prevent submission
      return;
    }

    try {
      const response = await loginUser(formData);

      // const response = await loginUser(formData);
      // if (!response.ok) {
      //       throw new Error(`Login
      //  failed with status: ${response.status}`);
      //     }
      //     console.log("Login successful:", data);
      // Handle successful login (e.g., store token, redirect)
      // setSubmitMessage("Login successful!");
      // setTimeout(() => {
      //   setSubmitMessage(null);
      //   // Handle redirection or other post-login actions here
      // }, 3000);
      console.log(response);
    } catch (error) {
      console.log(error);

      // console.error("Login error:", error);
      setMatchError("Login failed. Please check your email and password."); // Or display more specific error messages based on API response
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
            {matchError && <p style={{ color: "red" }}>{matchError}</p>}

            {submitMessage && (
              <p className="text-center text-green-500">{submitMessage}</p>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You don't have an account yet?
            <Link
              to="/register"
              className="font-semibold leading-6 text-red-600 hover:text-red-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
