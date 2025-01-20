import { createSlice } from "@reduxjs/toolkit";
import { fetchPost, fetchSinglePost } from "../../thunk/postThunk/postThunks";

const initialState = {
    posts :[],
    post:null,
    isLoading:false,
    error:null
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchPost.pending,(state) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(fetchPost.fulfilled,(state,action) => {
            state.isLoading = false;
            state.posts = action.payload.data
        })
        .addCase(fetchPost.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    
        .addCase(fetchSinglePost.pending,(state) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(fetchSinglePost.fulfilled,(state,action) => {
            state.isLoading = false;
            state.post = action.payload.data
        })
        .addCase(fetchSinglePost.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default postSlice.reducer;