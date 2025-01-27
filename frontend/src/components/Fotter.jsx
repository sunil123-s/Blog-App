import React from "react";
import { Link } from "react-router-dom";

const Fotter = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <ul className="flex flex-wrap justify-center gap-4 md:space-x-4 md:gap-0">
        <li>
          <Link to="/posts/categories/Agriculture" className="hover:underline">
            Agriculture
          </Link>
        </li>
        <li>
          <Link to="/posts/categories/Business" className="hover:underline">
            Business
          </Link>
        </li>
        <li>
          <Link to="/posts/categories/Education" className="hover:underline">
            Education
          </Link>
        </li>
        <li>
          <Link
            to="/posts/categories/Entertainment"
            className="hover:underline"
          >
            Entertainment
          </Link>
        </li>
        {/* <li>
          <Link
            to="/posts/categories/Uncategorized"
            className="hover:underline"
          >
          </Link>
        </li> */}
        <li>
          <Link to="/posts/categories/Wildlife" className="hover:underline">
            Wildlife
          </Link>
        </li>
      </ul>

      {/* Copyright Section */}
      <div className="text-center mt-4">
        <small>&copy; 2025 All Rights Reserved</small>
      </div>
    </div>
  );
};

export default Fotter;
