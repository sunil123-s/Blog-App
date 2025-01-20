import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/thunk/authThunk/authThunks";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const { setuser } = useAuth();
  const { error, isLoading } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormdata = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handelLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ formdata })).then((data) => {
      if (data.payload.success) {
        toast.success("User created");
        localStorage.setItem("token", JSON.stringify(data.payload.data));
        navigate("/home");
      }
    });
  };

  return (
    <div className="pt-56">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg sm:w-full sm:max-w-lg ">
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handelLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formdata.email}
              onChange={handleFormdata}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formdata.password}
              onChange={handleFormdata}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {isLoading ? "login..." : "login"}
            </button>
          </form>
          <h1 className="text-center mt-4 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
