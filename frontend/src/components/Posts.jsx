import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../store/thunk/postThunk/postThunks";

const Posts = () => {
  const dispatch = useDispatch()

  const {posts = [] ,isLoading} = useSelector((state) => state.post)
  
  useEffect(() => {
    dispatch(fetchPost())
  },[dispatch])

  return (
    <div className="p-4 min-h-screen">
      {isLoading && <h1 className="text-center text-gray-600">Loading...</h1>}
      {!isLoading && posts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {posts.map((item) => (
            <PostItem key={item?.id} item={item} />
          ))}
        </div>
      ) : (
        <h1 className="text-gray-600 mt-60 font-bold text-4xl text-center">
          No Post Found
        </h1>
      )}
    </div>
  );
};

export default Posts;
