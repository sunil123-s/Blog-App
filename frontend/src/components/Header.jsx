
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   
  const {setuser,user,logout} = useAuth()
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handelLogout = () => {
     logout()
     setuser(null)
     toast.success("logout successfully")
     navigate("/login");
  }
  
  return (
    <nav className="fixed bg-opacity-30 backdrop-blur-sm shadow-md w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="block w-12 h-12">
          <img className="block object-cover w-full h-full" src="/logo.png" alt="Logo" />
        </Link>
        <ul className="hidden md:flex space-x-6">
          {user && (
            <li>
              <Link
                to={`/profile/${user._id}`}
                className={`text-gray-700 hover:text-blue-500`}
              >
                {user?.name.toUpperCase()}
              </Link>
            </li>
          )}
          {user ? (
            <li>
              <Link to="/create" className="text-gray-700 hover:text-blue-500">
                Create Post
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="text-gray-700 hover:text-blue-500">
                Create Post
              </Link>
            </li>
          )}
          <li>
            <Link to="/authors" className="text-gray-700 hover:text-blue-500">
              Authors
            </Link>
          </li>
          <li>
            {user ? (
              <button
                className="text-gray-700 hover:text-blue-500"
                onClick={handelLogout}
              >
                logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
            )}
          </li>
        </ul>

        <button
          className="text-gray-700 hover:text-blue-500 md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu with Slide-in Animation */}
      <div
        className={`fixed top-0 left-0 h-screen w-2/3 bg-white shadow-lg p-6 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="flex flex-col space-y-4">
          {user && (
            <li>
              <Link
                to="/profile/123"
                onClick={toggleMobileMenu}
                className={`text-gray-700 hover:text-blue-500`}
              >
                {user?.data?.name.toUpperCase()}
              </Link>
            </li>
          )}
          {user ? (
            <li>
              <Link
                to="/create"
                className="text-gray-700 hover:text-blue-500"
                onClick={toggleMobileMenu}
              >
                Create Post
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500"
                onClick={toggleMobileMenu}
              >
                Create Post
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/authors"
              className="text-gray-700 hover:text-blue-500"
              onClick={toggleMobileMenu}
            >
              Authors
            </Link>
          </li>
          <li>
            {user ? (
              <button
                className="text-gray-700 hover:text-blue-500"
                onClick={handelLogout}
              >
                logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
