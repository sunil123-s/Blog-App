import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ formdata, token }, { rejectWithValue }) => {

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/create`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (_,{ rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/allpost`
      );
      return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "post/fetchSinglePost",
  async(id,{rejectWithValue}) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/getPost/${id}`
      );
      return res.data
    } catch (error) {
       return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getAuthorPost = createAsyncThunk(
  "post/getAuthorPost",
  async(id,{rejectWithValue}) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/authors/${id}`
      );
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)

export const getPostByCategory = createAsyncThunk(
  "post/getPostByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/category/${category}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const editPost = createAsyncThunk(
  "post/editPost",
  async({formdata,token,id},{rejectWithValue}) => {
    console.log(id)
    
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/edit-post/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res.data",res.data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async({id,token},{rejectWithValue}) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data
    } catch (error) {
      console.log(error.response.data.message)
       return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)
