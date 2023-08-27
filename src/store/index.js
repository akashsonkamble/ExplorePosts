import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./post-slice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export default store;
