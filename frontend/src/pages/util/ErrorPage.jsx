import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 sm:px-6">
      <div className="text-center max-w-lg w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/home"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
