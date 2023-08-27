import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  loading: false,
  error: "",
  searchQuery: "",
  searchResults: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API);
  return response.data;
});

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (searchQuery) => {
    const response = await axios.get(`${API}?q=${searchQuery}`);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts = [];
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(searchPosts.pending, (state, action) => {
      state.loading = true;
      state.searchResults = [];
      state.error = "";
    });
    builder.addCase(searchPosts.fulfilled, (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
    });
    builder.addCase(searchPosts.rejected, (state, action) => {
      state.searchResults = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice;
