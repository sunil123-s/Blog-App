import React, { useState,useEffect } from "react";
import PostItem from "../../components/PostItem";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostByCategory } from "../../store/thunk/postThunk/postThunks";

const CategoryPosts = () => {
  const [categoryPost, setCategoryPost] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const { category } = useParams();

  const dispatch = useDispatch()  
   useEffect(() => {
      setisLoading(true)
      dispatch(getPostByCategory(category)).then((data) => {
        if (data.payload.success) {
          setCategoryPost(data.payload.data);
          console.log(data.payload.data);
          setisLoading(false);
        }
      });
   }, [category])
   

  return (
    <div className="p-4 min-h-screen">
      {isLoading && <h1 className="text-center text-gray-600">Loading...</h1>}
      {!isLoading && categoryPost.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-28">
          {categoryPost.map((item) => (
            <PostItem key={item?.id} item={item} />
          ))}
        </div>
      ) : (
        <h1 className="text-gray-600 mt-60 font-bold text-4xl text-center ">No Post Found</h1>
      )}
    </div>
  );
};

export default CategoryPosts;
