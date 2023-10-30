import {
  AnyAction,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { UserToken } from "../utils/types";
import { login } from "../services/login";
import { setToken } from "../services/blogs";

const initialState = {
  id: "",
  username: "",
  name: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<UserToken>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const loginUser = (
  username: string,
  password: string
): ThunkAction<Promise<void>, UserToken, unknown, AnyAction> => {
  return async (dispatch) => {
    const user = await login({ username, password });
    dispatch(setUser(user));
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    setToken(user.token);
  };
};

export const getUser = (): ThunkAction<void, UserToken, unknown, AnyAction> => {
  return (dispatch) => {
    const loggedBlogJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedBlogJSON) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user: UserToken = JSON.parse(loggedBlogJSON);
      dispatch(setUser(user));
      setToken(user.token);
    }
  };
};

export const logOutUser = (): ThunkAction<
  void,
  UserToken,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setUser(initialState));
  };
};

export default userSlice.reducer;
