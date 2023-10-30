import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducers from "./reducers/blogReducers";
import userReducers from "./reducers/userReducers";
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducers,
    user: userReducers,
  },
});

console.log(store.getState());
