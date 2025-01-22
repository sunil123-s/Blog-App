import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RegisterThunk } from "../../store/thunk/authThunk/authThunks";
import ImageUplaod from "../util/ImageUplaod";
import { FaEdit } from "react-icons/fa";

const Register = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar:''
  });
    const [imageFile, setimageFile] = useState('')
    const [uploadImg, setuploadImg] = useState("")
    const [isloading, setisloading] = useState(false);

  const { isLoading, error } = useSelector((state) => state.register);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormdata = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!uploadImg) {
      toast.error("Please upload an image before submitting the form.");
      return;
    }

    const registerData = { ...formdata, avatar: uploadImg };
    console.log(registerData)
    dispatch(RegisterThunk({formdata:registerData })).then((data) => {
      if (data.payload.success) {
        toast.success("User created");
        localStorage.setItem("token", JSON.stringify(data.payload.data));
        navigate("/home");
      }
    });
  };

  return (
    <div className="pt-56">
      <div className=" relative max-w-md mx-auto p-6 bg-white shadow-md rounded-lg sm:w-full sm:max-w-lg">
               <button
                 onClick={() => navigate("/home")}
                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold p-5"
               >
                 x
               </button>;
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 m-auto border-gray-200 mb-4">
            <img
              src={uploadImg ? uploadImg : "/profilelogo.png"}
              alt=""
              className="w-full h-full object-cover"
            />
              <ImageUplaod
                imageFile={imageFile}
                setisloading={setisloading}
                setimageFile={setimageFile}
                setuploadImg={setuploadImg}
                showInput={true}
                imageType="avatar"
              />
          </div>
              <label
                htmlFor="imgaeUpload"
                className="absolute top-[350px] right-[900px] bg-blue-500 p-2 rounded-full text-white cursor-pointer shadow-lg"
              >
                <FaEdit className="text-sm" />
              </label>

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formdata.name}
            onChange={handleFormdata}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formdata.email}
            onChange={handleFormdata}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formdata.password}
            onChange={handleFormdata}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formdata.confirmPassword}
            onChange={handleFormdata}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
