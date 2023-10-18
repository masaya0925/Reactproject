import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducers from "./reducers/blogReducers";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducers,
  },
});

console.log(store.getState());
