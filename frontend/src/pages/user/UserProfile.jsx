import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ImageUplaod from "../util/ImageUplaod";
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../../store/thunk/authThunk/authThunks";
import toast from "react-hot-toast";

const initalFormdata = {
  name: "",
  currentPassword: "",
  newPassword: "",
  newConfirmPassword: "",
};

const UserProfile = () => {
  const [formdata, setformdata] = useState(initalFormdata);
  const [isLoading, setisLoading] = useState(false);
  const [imageFile, setimageFile] = useState("");
  const [uploadImg, setuploadImg] = useState("");
  const [userLoading, setuserLoading] = useState(false)

  const { user, loading,setuser } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getUser(id)).then((data) => {
      if (data.payload.success) {
        setformdata({
          name: data.payload.data.name,
        });
        setuploadImg(data.payload.data.avatar);
        setauthor(data.payload.data.name);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handelUserChange = (e) => {
    setuserLoading(true)
    e.preventDefault(); 
    const updateProfile = { ...formdata, avatar: uploadImg };

    dispatch(updateUser({ formdata: updateProfile, id })).then((data) => {
      if (data.payload.success) {
        const updateUser = data.payload.data;
        setuser(updateUser)
        localStorage.setItem("token", JSON.stringify(updateUser))
        toast.success("Profile Updated");
        setuserLoading(false)
        navigate("/home");
      }
    });
  };
   
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-28">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 sm:max-w-md sm:p-4">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-gray-200 mb-4">
            <img
              src={uploadImg ? uploadImg : "/12.png"}
              alt="Profile"
              className={`w-full h-full object-cover transition-all duration-200 ${
                isLoading ? "opacity-50 filter grayscale" : ""
              }`}
            />
            <form>
              <ImageUplaod
                imageFile={imageFile}
                setisloading={setisLoading}
                setimageFile={setimageFile}
                setuploadImg={setuploadImg}
                showInput={true}
                imageType="avatar"
              />
              <label
                htmlFor="imgaeUpload"
                className="absolute bottom-1 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer shadow-lg"
              >
                <FaEdit className="text-sm" />
              </label>
            </form>
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-2">{user?.name}</h1>
          <Link
            to={`/myposts/${user?._id}`}
            className="text-blue-500 hover:underline font-medium mb-4"
          >
            My Posts
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handelUserChange}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Current Password"
              value={formdata.currentPassword}
              name="currentPassword"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={formdata.newPassword}
              name="newPassword"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={formdata.newConfirmPassword}
              name="newConfirmPassword"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaCheck />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;