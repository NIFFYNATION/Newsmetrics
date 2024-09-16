import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [matchError, setMatchError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);

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

    if (!formData.fullName.trim()) {
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

    if (formData.password !== formData.confirmPassword) {
      setMatchError("Passwords do not match.");
      isValid = false;
    } else {
      setMatchError(null); // Clear error if previously set for password confirmation
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Form is invalid, display errors and prevent submission
      return;
    }

    //     const url = "http://your-api-endpoint/register"; // Replace with your API endpoint
    //     const options = {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formData),
    //     };

    //     try {
    //       const response = await fetch(url, options);
    //       if (!response.ok) {
    //         throw new Error(`Registration
    //  failed with status: ${response.status}`);
    //       }

    //       const data = await response.json();
    //       console.log("Registration successful:", data);
    //       setSubmitMessage("Registration successful!");
    //       setTimeout(() => {
    //         setSubmitMessage(null);
    //       }, 3000);
    //     } catch (error) {
    //       console.error("Registration error:", error);
    //       setMatchError("Registration failed. Please try again."); // Or display more specific error messages
    //     }
    //   };

    // Form is valid, log data and display success message
    console.log("Form data:", formData);
    setSubmitMessage("Registration successful!");
    setTimeout(() => {
      setSubmitMessage(null);
    }, 3000);
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
                Enter your full name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="fullName"
                  value={formData.fullName}
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
              <label
                htmlFor="Phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  required
                  placeholder="+234"
                  autoComplete="phoneNumber"
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
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
