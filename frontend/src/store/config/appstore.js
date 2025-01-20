import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../slices/authSlice/authSlices.js";
import postReducer from "../slices/postSlice/postSlices.js"

const storeapp = configureStore({
  reducer: {
    register: registerReducer,
    post:postReducer,
  },
});

export default storeapp;
