import React, { useState,useEffect } from "react";
import { postCategory } from "../../utils/dummyData";
import { modules } from "../../utils/dummyData";
import { formats } from "../../utils/dummyData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { editPost, fetchPost, fetchSinglePost} from "../../store/thunk/postThunk/postThunks";
import ImageUplaod from "../util/ImageUplaod";
import toast from "react-hot-toast";


const initalFormdata = {
  title:"",
  description: "",
  category: "All",
  thumbnail: "",
};

const EditPost = () => {
  const [formdata, setformdata] = useState(initalFormdata)
  const [imageFile, setimageFile] = useState('')
  const [uploadImg, setuploadImg] = useState("")
  const [isloading, setisloading] = useState(false);
  const {user, loading} = useAuth()
  const navigate = useNavigate()
  
  const dispatch = useDispatch() 
  const {id} = useParams()

useEffect(() => {
  dispatch(fetchSinglePost(id)).then((data) => {
    if(data.payload.success){
      setformdata({
        title: data.payload.data.title,
        description: data.payload.data.description,
        category: data.payload.data.category,
      });
       setuploadImg(data.payload.data.thumbnail);
    }
  })
}, [id])

  const handelPostEdit = (e) => {
    e.preventDefault();
    
    if (!uploadImg) {
      toast.error("Please upload an image before submitting the form.");
      return;
    }

     const uploadFormdata = { ...formdata, thumbnail: uploadImg };
     dispatch(editPost({formdata:uploadFormdata,token:user?.token,id}))
     .then((data) => {
       if(data.payload.success) {
        console.log(data.payload.success);
         dispatch(fetchPost())
         toast.success("Changes Saved")
         navigate("/home")
       }
     })
  }
  

  const handelChange = (e) => {
     setformdata({...formdata,[e.target.name]: e.target.value})
  }

  const setDescription = (value) => {
   setformdata({ ...formdata, description: value });
  }

  useEffect(() => {
     if(!user && !loading){
       navigate("/login")
     }
  }, [user,loading])
  
  return (
    <section className="create-post bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h2>
        <form className="space-y-6" onSubmit={handelPostEdit}>
          <div>
            <div className="mt-2">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Thumbnail
              </label>
              <ImageUplaod
                imageFile={imageFile}
                setisloading={setisloading}
                setimageFile={setimageFile}
                setuploadImg={setuploadImg}
                showInput={false}
                imageType="thumbnail"
              />
            </div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter post title"
              value={formdata.title}
              onChange={handelChange}
              autoFocus
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formdata.category}
              onChange={handelChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {postCategory.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Description
            </label>
            <ReactQuill
              id="description"
              modules={modules}
              formats={formats}
              value={formdata.description}
              onChange={setDescription}
              className="h-40"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full mt-14 sm:mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
