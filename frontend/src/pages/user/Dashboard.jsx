import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, getAuthorPost } from "../../store/thunk/postThunk/postThunks";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [isLoading, setisLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setisLoading(true); // Set loading to true when fetching starts
    dispatch(getAuthorPost(id)).then((data) => {
      if (data.payload) {
        setPosts(data.payload.data);
      }
      setisLoading(false); // Set loading to false after fetching completes
    });
  }, [dispatch, id]);

  const handleDelete = async (id) => {
    dispatch(deletePost(id)).then((data) => {
      if (data.payload.success) {
        toast.success("Post Deleted Successfully");
        navigate("/home");
      }
    });
  };

  return (
    <section className="dashboard pt-28 bg-gray-100 min-h-screen px-20">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="w-full h-40 mb-4 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.thumbnail ? item.thumbnail : "/profilelogo.png"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-lg font-semibold text-gray-800 mb-4">
                {item.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto space-y-2 sm:space-y-0 sm:space-x-2">
                <Link
                  to={`/posts/${item._id}`}
                  className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-slate-700"
                >
                  View
                </Link>
                <div className="flex flex-wrap space-x-2">
                  <Link
                    to={`/posts/${item._id}/edit`}
                    className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-gray-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 mt-60 font-bold text-4xl text-center">
          <p>No posts available. Start creating new posts!</p>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
