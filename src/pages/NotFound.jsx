import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | News Metrics</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Go back to homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;
