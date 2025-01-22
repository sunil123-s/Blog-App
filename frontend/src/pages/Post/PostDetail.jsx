import React,{useEffect} from "react";
import PostAuthor from "../../components/PostAuthor";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchSinglePost } from "../../store/thunk/postThunk/postThunks";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PostDetail = () => {
    const {id} = useParams();
    const { post, isLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user,loading} = useAuth()

  // useEffect(() => {
  //    if(!user && !loading){
  //      navigate("/login")
  //    }
  // }, [user,loading])
    

   useEffect(() => {
     dispatch(fetchSinglePost(id))
   }, [dispatch,id])

     const handelDelete = async(id) => {
        dispatch(deletePost({id, token:user?.token}))
        .then((data) => {
          if(data.payload.success){
            toast.success("Post Deleted Successfully")
            navigate("/home")
          }
        })
     }     

   if(isLoading){
     return <p>Loading...</p>;
   } 
   
  return (
    <>
      {!isLoading && (
        <div className="max-w-4xl mx-auto lg:px-60 md:px-32 pt-28 px-6 rounded-lg sm:w-full sm:max-w-full mb-20 min-h-screen">
          <div className="flex items-center justify-between mb-4 flex-row">
            {!isLoading && post && (
              <PostAuthor createdAt={post.createdAt} creator={post.creator} />
            )}
            {user?._id === post?.creator ? (
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Link
                  to={`/posts/${id}/edit`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handelDelete(post?._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post?.title}</h1>
          <div className="mb-4">
            <img
              src={post?.thumbnail ? post?.thumbnail : "/profilelogo.png"}
              alt="Post"
              className="w-full mx-auto rounded-lg object-cover h-auto max-w-md"
            />
          </div>
          <div
            className="space-y-4 text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: post?.description }}
          ></div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
