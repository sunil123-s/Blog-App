import {createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const RegisterThunk = createAsyncThunk(
  "register/RegisterThunk",
  async ({ formdata }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users/register`,
        formdata
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "register/loginThunk",
  async ({ formdata }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users/login`,
        formdata
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async(_,{rejectWithValue}) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users`
      );
      return res.data
    } catch (error) {
       return rejectWithValue(error?.response?.data?.message);
    }
  }
)

export const getUser = createAsyncThunk(
  "user/getUser",
  async(id,{rejectWithValue}) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users/author/${id}`
      );
      return res.data
    } catch (error) {
       return rejectWithValue(error?.response?.data?.message);
    }
  }
) 

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async({formdata,id},{rejectWithValue}) => {
     try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/users/edit-user/${id}`,
        formdata
      );
      return res.data
     } catch (error) {
       return rejectWithValue(error?.response?.data?.message);
     }
  }
)