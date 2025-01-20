import React,{useState,useEffect} from "react";
import PostItem from "../../components/PostItem";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorPost } from "../../store/thunk/postThunk/postThunks";

const AuthorPosts = () => {
  const [post, setpost] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    setisLoading(true)
     dispatch(getAuthorPost(id))
     .then((data) => {
      if(data.payload.success){
        setisLoading(false)
        setpost(data.payload.data)
      }
     })
  }, [dispatch,id])
  

  return (
    <div className="p-20 min-h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : post.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-14">
          {post.map((item) => (
            <PostItem key={item?._id} item={item} />
          ))}
        </div>
      ) : (
        <h1 className="text-gray-600 mt-60 font-bold text-4xl text-center">
          No Posts Found
        </h1>
      )}
    </div>
  );
};

export default AuthorPosts;
